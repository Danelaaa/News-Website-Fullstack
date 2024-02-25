import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { AllPostComponent } from './components/posts/all-post/all-post.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {EditorModule} from "@tinymce/tinymce-angular";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PostsComponent,
    AllPostComponent,
    NewPostComponent,
    EditPostComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ProgressBarModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    EditorModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
