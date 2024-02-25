import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../../../models/post.interface';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  @ViewChild('dt1', { static: false }) dt1!: Table; // Initialize with undefined
  @ViewChild('search') search: HTMLInputElement | undefined;
  loading: boolean = true;

  constructor(private apiService: ApiService, private message: MessageService) {}

  ngOnInit(): void {
    this.apiService.getAllPosts().toPromise().then(posts => {
      this.posts = posts || [];
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    if (this.dt1) { // Check if dt1 is defined before accessing it
      this.dt1.filterGlobal(ev.target.value, 'contains');
    }
  }

  removePost(id: number) {
    this.apiService.removePost(id).subscribe(res => {
      if (res.success) {
        this.posts = this.posts.filter(p => p.id !== id);
        this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Post removed',
          life: 1500
        });
      }
    });
  }
}
