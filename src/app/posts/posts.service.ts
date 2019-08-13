import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'}) // provide it in root level

export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor( private http: HttpClient) {}

    getPost() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        // convert id to _id
     /*pipe is a method that can add multiple operator */ .pipe(map((postData) => {
            return postData.posts.map((post) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content
              };
            });
          } ))
          .subscribe((transformPosts) => {
            this.posts = transformPosts;
            this.postUpdated.next([...this.posts]);
          });
    }
    postUpdatedListener() {
     return  this.postUpdated.asObservable(); // make posts can listen from outside
    }

    addpost(title: string , content: string) {
        const post: Post = { id: null , title: title , content: content}
        this.http.post<{ message: string , postId: string}>('http://localhost:3000/api/posts' , post)
          .subscribe((responseData) => {
            const id  = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postUpdated.next([...this.posts]); // emit posts
          });
    }

    deletePost(postId: string) {
      this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
          const updatedPostAfterDelete = this.posts.filter( post => post.id !== postId);
          this.posts = updatedPostAfterDelete;
          this.postUpdated.next([...this.posts]);
        });
    }
}
