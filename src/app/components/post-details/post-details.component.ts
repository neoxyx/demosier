import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  currentPost: any;
  message = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  getPost(id: any): void {
    this.postService.get(id)
      .subscribe(
        data => {
          this.currentPost = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePost(id: number, post: any): void {
    this.postService.update(id, post)
      .subscribe(
        response => {
          1
          console.log(response);
          this.message = 'The post was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deletePost(id: number): void {
    this.postService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/posts']);
        },
        error => {
          console.log(error);
        });
  }

}
