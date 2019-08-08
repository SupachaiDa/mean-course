import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'}) // provide it in root level

export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor( private http: HttpClient) {}

    getPost() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
          .subscribe((postsData) => {
            this.posts = postsData.posts;
            this.postUpdated.next([...this.posts]);
          });
    }

    postUpdatedListener() {
     return  this.postUpdated.asObservable(); // make posts can listen from outside
    }

    addpost(title: string , content: string) {
        const post: Post = { id: null , title: title , content: content}
        this.http.post<{ message: string }>('http://localhost:3000/api/posts' , post)
          .subscribe((responData) => {
            console.log(responData.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]); // emit posts
          });
    }
}
