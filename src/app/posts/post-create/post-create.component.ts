import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enterData = '';
  post = 'No Post Yet !!';
   addPost() {
     this.post = this.enterData;
   }
}
