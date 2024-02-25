import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category.';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../../../../tools/src/lib/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  cats: Category[] = [];
  sub$ = new Subject<void>();
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    
    this.apiService.getAllCategories().pipe(
      takeUntil(this.sub$)
    ).subscribe(res=>
      this.cats = res.filter(c=> c.title != 'Uncategorized'))
  };
 
    
  topHeader = [
    {
      title:'რეკლამა',
      link:'#main',
    },
    {
      title:'კონტაქტი',
      link:'#main',
    },
  ];
  
  
  
}
