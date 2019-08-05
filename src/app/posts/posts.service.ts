import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'}) // provide it in root level

export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPost() {
        return [...this.posts];
    }

    postUpdatedListener() {
     return  this.postUpdated.asObservable(); // make posts can listen from outside
    }

    addpost(title: string , content: string) {
        const post: Post = { title: title , content: content}
        this.posts.push(post);
        this.postUpdated.next([...this.posts]); // emit posts
    }
}
