import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Post } from '../../../../../models/post.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-last-news',
  templateUrl: './last-news.component.html',
  styleUrls: ['./last-news.component.scss']
})
export class LastNewsComponent implements OnInit, OnDestroy {
  private URL = 'http://localhost:5000';
  posts: Post[] = [];
  sub$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
        takeUntil(this.sub$)
    ).subscribe(params => {
        const catTitle = params.get('title');

        if (this.router.url == `/post/category/${catTitle}`) {
            this.apiService.getAllPosts().pipe(
                map(posts => posts.filter(p => p.category.title == catTitle)),
                takeUntil(this.sub$)
            ).subscribe(posts => {
                // Sort the posts by createdOn date in descending order
                this.posts = posts.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()).slice(0, 5);
            });
        } else {
            this.apiService.getAllPosts().pipe(
                takeUntil(this.sub$)
            ).subscribe(res => {
                // Sort the posts by createdOn date in descending order
                this.posts = res.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()).slice(0, 5);
            });
        }
    });
}



  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }
  getFormattedDate(createdOn: Date | string): string {
    if (typeof createdOn === 'string') {
        return this.getMinutesAgo(createdOn);
    } else {
        return this.getMinutesAgo(createdOn.toDateString());
    }
}

  getMinutesAgo(createdOn: string): string {
    const createdDate = new Date(createdOn);
    const now = new Date();
    const diff = Math.round((now.getTime() - createdDate.getTime()) / (1000 * 60)); // Difference in minutes
    return `${diff} minutes ago`;
  }
}
