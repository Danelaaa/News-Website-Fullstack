import { Component, OnInit } from '@angular/core';
import { Subscription, catchError, throwError } from 'rxjs';
import { Category } from '../../../../../../models/category.';
import { ApiService } from '../../../../../../tools/src/lib/api.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { fileURLToPath } from 'node:url';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent  implements OnInit{

  imgUrl: any = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
  imagePath = this.imgUrl;
  
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];

  constructor(private apiService: ApiService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  preview(event: any) {
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

  createPost(myForm: NgForm) {
     if (myForm.invalid) {
       return;
     }
     const {title, category, content} = myForm.value;
    console.log(this.mainImagePath);
     const formData = {
       title,
       categoryId: parseInt(category),
       content,
       mainImageUrl: this.mainImagePath
     }

     this.apiService.createPost({...formData}).subscribe(post => {
       this.messageService.add({
         severity:'info',
         detail: 'Post Created',
         summary: 'Done',
         life: 2000
       });
       myForm.reset();
     })
  }
}
