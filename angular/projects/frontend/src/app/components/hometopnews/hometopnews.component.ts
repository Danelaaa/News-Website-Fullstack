import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../../../models/post.interface';
import { Category } from '../../../../../models/category.';
import { Subject, map, takeUntil } from 'rxjs';
import { ApiService } from '../../../../../tools/src/lib/api.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hometopnews',
  templateUrl: './hometopnews.component.html',
  styleUrl: './hometopnews.component.scss'
})
export class HometopnewsComponent implements OnInit ,OnDestroy{
  posts: Post[] = [];
  cats: Category[] = [];
  sub$ = new Subject<void>();

  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe){}
    TwoPost: any[] = [];
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
            this.posts = posts.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            // Get the first post (newest post)
            this.posts = this.posts.slice(0, 1);
            // Slice the second and third posts into a separate array
            this.TwoPost = this.posts.slice(1, 3);
            console.log(this.TwoPost);
          });
        } else {
          this.apiService.getAllPosts().pipe(
            takeUntil(this.sub$)
          ).subscribe(res => {
            // Sort the posts by createdOn date in descending order
            this.posts = res.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            // Get the first post (newest post)
            this.posts = this.posts.slice(0, 1);
            
            // Slice the second and third posts into a separate array
            this.TwoPost = res.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            this.TwoPost = this.TwoPost.slice(1, 3);
            
          });
        }
      });
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

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete()
  }














  MainLastNews = [
    {
      title: 'MainLastNews',
      img:'../../../assets/download.jpg',
      link: '/news',
    },
   
    
  ];
  MainLastNewsRight = [
    {
      title: 'MainLastNews',
      img:'../../../assets/download.jpg',
      link: '/news',

    },
    {
      title: 'MainLastNews',
      img:'../../../assets/download.jpg',
      link: '/news',

    },
   
    
  ];
}
