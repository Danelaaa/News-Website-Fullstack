import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category.';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit,OnDestroy{
  cats: Category[] = [];
  sub$ = new Subject<void>();
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    
    this.apiService.getAllCategories().pipe(
      takeUntil(this.sub$)
    ).subscribe(res=>
      this.cats = res.filter(c=> c.title != 'Uncategorized'))
  };

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete()
  }
}
