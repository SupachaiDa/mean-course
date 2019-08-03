import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  posts = [
    {title: 'First Title' , content: 'From first post'},
    {title: 'Second Title' , content: 'From Second post'},
    {title: 'Third Title' , content: 'From Third post'}
  ];
}
