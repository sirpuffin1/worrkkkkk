import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { map } from 'rxjs/operators'
import { Post } from "../models/post";
import { Comment } from "../models/comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api: ApiService) {}

  getPosts() {
    return this.api.get<{ data: Post[] }>('posts').pipe(map(res => res.data))
  }

  createPost(post: Post) {
    return this.api.post<{data: Post}, Post>('create-post', post).pipe(map(res => res.data))
  }

  deletePost(post: Post) {
    return this.api.delete<{data: Post}>('delete-post/' + post._id).pipe(map(res => res.data));
  }

  incrementPostPoints(post: Post) {
    return this.api.post<{data: Post}, Post>('increment-post-points', post).pipe(map(res => res.data))
  }

  decrementPostPoints(post: Post) {
    return this.api.post<{data: Post}, Post>('decrement-post-points', post).pipe(map(res => res.data))
  }

  createComment(comment: Comment) {
    return this.api.post<{data: Post}, Comment>('create-comment', comment).pipe(map(res => res.data))
  }



}
