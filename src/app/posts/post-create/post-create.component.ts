import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  constructor(public postsService: PostsService) {}

  addPost(form: NgForm) {
    if (form.invalid) {
      return; // ถ้า form invalid จะไม้ให้ submit
    }
    this.postsService.addpost(form.value.title, form.value.content);
    form.resetForm();
   }
}
