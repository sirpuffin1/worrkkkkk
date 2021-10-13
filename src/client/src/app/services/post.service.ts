import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { map } from 'rxjs/operators'
import { Post } from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api: ApiService) {}

  getPosts() {
    return this.api.get<{ data: Post[] }>('posts').pipe(map(res => res.data))
  }

  createPost(post: Post) {
    return this.api.post<{data: Post}>('create-post', post).pipe(map(res => res.data))
  }

  deletePost(post: Post) {
    return this.api.delete<{data: Post}>('delete-post/' + post._id).pipe(map(res => res.data));
  }

  incrementPostPoints(post: Post) {
    return this.api.post<{data: Post}>('increment-post-points', post).pipe(map(res => res.data))
  }

  decrementPostPoints(post: Post) {
    return this.api.post<{data: Post}>('decrement-post-points', post).pipe(map(res => res.data))
  }

}
