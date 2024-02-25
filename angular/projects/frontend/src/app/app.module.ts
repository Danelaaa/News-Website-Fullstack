import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HttpClient, HttpClientModule,provideHttpClient,withFetch } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { LastNewsComponent } from './components/last-news/last-news.component';
import { DatePipe } from '@angular/common';
import { HometopnewsComponent } from './components/hometopnews/hometopnews.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SinglePostComponent,
    CategoryListComponent,
    CategoryComponent,
    LastNewsComponent,
    HometopnewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
