import { Component , EventEmitter , Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  @Output() /*@out ทําให้ parent component รับค่าได้ */createNewpost = new EventEmitter<Post>();

  addPost(form: NgForm) {
    if (form.invalid) {
      return; // ถ้า form invalid จะไม้ให้ submit
    }
    const post: Post = { title: form.value.title, content: form.value.content};
    this.createNewpost.emit(post);
   }
}
