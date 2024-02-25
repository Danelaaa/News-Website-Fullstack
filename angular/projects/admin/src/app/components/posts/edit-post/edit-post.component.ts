import { Component, OnInit } from '@angular/core';
import {Subscription, catchError, throwError} from "rxjs";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import { Post } from '../../../../../../models/post.interface';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../../../models/category.';
import { ApiService } from '../../../../../../tools/src/lib/api.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit{
  post!: Post;
  imgUrl: string = '';
  altText: string = '';
  mainImagePath: string = '';
  categories: Category[] = [];
  uploadProgress: number = 0;
  showProgress: boolean = false;


  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const slug = param.get('slug');
      if (slug) {
        this.apiService.getPostBySlug(slug).subscribe((post) => {
          this.post = post;
          this.mainImagePath = post.mainImageUrl ? post.mainImageUrl : this.imgUrl;
        });
      }
    });
    this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  previewImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const upload$ = this.apiService.uploadFile(formData);

      upload$.pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total ?? 1)));

        } else if (event instanceof HttpResponse) {
          console.log('File uploaded successfully:', event.body);
          this.mainImagePath = event.body.filePath;
        }
       
      });
    }
  }

  updatePost() {
    if (!this.post) return;
    this.post.mainImageUrl = this.mainImagePath;
    this.apiService.updatePost(this.post.slug, this.post).subscribe(
      (res) => {
        if (res.title) {
          this.message.add({
            severity: 'info',
            summary: 'Successful',
            detail: 'Post updated',
            life: 1500
          });
  
          // If the update is successful, update the main image path
          this.mainImagePath = this.post.mainImageUrl ? this.post.mainImageUrl : this.imgUrl;
        }
      },
      (err: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: 'Failure',
          detail: err.statusText,
          life: 1500
        });
      }
    );
  }
  

}
