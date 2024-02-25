import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category.';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { TableEditCompleteEvent } from 'primeng/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  subs: Subscription[] = [];

  constructor(private apiService: ApiService,
              private message: MessageService) {
  }

  ngOnInit(): void {

    this.subs.push(this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized')));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe()); // Corrected method name and added forEach for unsubscribing from all subscriptions
  }

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const {title, description} = form.value;

    this.apiService.createCategory(title, description).subscribe(res => {
      this.categories.push(res);
      form.reset();
    })
  }

  update(ev: TableEditCompleteEvent) {
    const rowData = ev.data;
    const index = this.categories.findIndex(cat => cat.id === rowData.id);
  
    if (index !== -1) {
      this.subs.push(this.apiService.updateCategory(rowData.id, rowData.title, rowData.description).subscribe(res => {
        this.categories[index].title = res.title;
        this.categories[index].description = res.description;
        this.message.add({
          severity: 'success',
          detail: 'Category Updated',
          life: 1000,
          summary: 'Successful'
        });
      }));
    }
  }

  remove(id: number): void {
 
      this.apiService.removeCategory(id).subscribe(res => {
        if (res.success) {
          this.message.add({
            severity: 'success',
            detail: 'Category Removed',
            life: 1000,
            summary: 'Successful'
          });
     
        } else {
          this.message.add({
            severity: 'error',
            detail: 'Failed to remove category',
            life: 1000,
            summary: 'Failure'
          });
        }
      })
    
  }
}

interface CellEventResponse {
  data: { id: number, title: string, description: string }
  field: string
  index: number
}

