import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../../models/post.interface';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit{
 // @ts-ignore
post: Observable<Post>;
  constructor(private route: ActivatedRoute,
              private apiService: ApiService){

              }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const slug = params.get('slug');
        this.post = this.apiService.getPostBySlug(slug);
      })
  }
}
