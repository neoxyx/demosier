import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  posts: any;
  currentPost: any;
  currentIndex = -1;
  userId = ''

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postService.getAll()
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActivePost(id: any, index: number): void {
    this.postService.get(id)
      .subscribe(
        data => {
          this.currentPost = data;
          this.currentIndex = index;
        },
        error => {
          console.log(error);
        });
  }

  searchPost(): void {
    this.postService.findByUser(this.userId)
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onListDataChange(event: any) {
    this.page = event;
    this.retrievePosts();
  }
  onListSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrievePosts();
  }
}
