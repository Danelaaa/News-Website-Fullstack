import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../../models/user.interface';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.interface';
import { Category } from '../../../models/category.';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = 'http://localhost:5000';
  private authState$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private user: User = {
    email: '',
    id: -1,
    firstname: '',
    lastname: '',
    profilePic: '',
    roles: '',
  };
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient,private router: Router){}


  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/post`);
  }
  
  getPostBySlug(slug: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/post/slug/${slug}`);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

  login(email:string, password:string){
    return this.http.post<any>(`${this.URL}/auth/login`,{email,password},{
      withCredentials: true
    }).pipe(
      tap((value)=>{
        if(value.success){
          this.authState$.next(true);
          this.user$.next(value.user);
        }else{
          this.authState$.next(false);
        }
      })
    );
  }
  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }
  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/auth/register`, userData, {
      withCredentials: true
    });
  }
  removePost(id: number) {
    return this.http.delete<{success: boolean, post: Post}>(`${this.URL}/post/${id}`, {withCredentials: true});
  }
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }
  uploadFile(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${this.URL}/post/upload-photo`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
  createCategory(title: string, description: string) {
    return this.http.post<Category>(`${this.URL}/category`, {title, description}, {
      withCredentials: true
    })
  }
  updateCategory(id: number, title: string, description: string) {
    return this.http.patch<Category>(`${this.URL}/category/${id}`, {title, description}, {
      withCredentials: true
    })
  }

  removeCategory(id: number) {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/category/${id}`, {
      withCredentials: true
    });
  }
  createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/post`, formData, {
      withCredentials: true
    });
  }
  updatePost(slug: string, postData: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.URL}/post/${slug}`, postData, { withCredentials: true })
      .pipe(
        catchError((error) => {
          throw error; // Handle errors appropriately
        })
      );
  }
  
}
