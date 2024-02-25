import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../../../models/post.interface';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { Category } from '../../../../../models/category.';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{
  posts: Post[] = [];
  cats: Category[] = [];
  sub$ = new Subject<void>();
  
  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.sub$)
    ).subscribe(params=>{
      const catTitle = params.get('title');

      if(this.router.url == `/post/category/${catTitle}`){
        this.apiService.getAllPosts().pipe(
          map(posts => posts.filter(p=> p.category.title == catTitle)),
          takeUntil(this.sub$)
        ).subscribe(posts => this.posts = posts);
      }else{
        this.apiService.getAllPosts().pipe(
          takeUntil(this.sub$)
        ).subscribe(res=>this.posts = res)
      }
    })

    
  };
  isCategoryRoute(): boolean {
    return this.router.url.includes('/post/category/');
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete()
  }


  
 

}
