import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {

  post = {
    title: 'foo',
    body: 'bar',
    userId: 1
  };
  submitted = false;

  constructor(private postService: PostService) { }

  savePost(): void {
    const data = {
      title: this.post.title,
      body: this.post.body,
      userId: this.post.userId
    };

    this.postService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newPost(): void {
    this.submitted = false;
    this.post = {
      title: '',
      body: '',
      userId: 1
    };
  }
}
