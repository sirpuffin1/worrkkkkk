import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Post } from '../models/post';
import { AddComment, AddPost, DecrementPostPoint, GetPosts, IncrementPostPoint, RemovePost } from '../actions/post.action';
import { Injectable } from '@angular/core';
import { PostService } from '../services/post.service';
import { filter, tap } from 'rxjs/operators';
import { state } from '@angular/animations';


export class PostStateModel {
  posts!: Post[];


}

@State<PostStateModel>({
  name: 'Posts',
  defaults: {
    posts: [],


  },
})
@Injectable()
export class PostState {
  constructor(private postService: PostService){}

  @Selector()
  static getPostsList(state: PostStateModel) {
    return state.posts;
  }

  @Action(GetPosts)
  getPosts({ getState, setState }: StateContext<PostStateModel>) {
    return this.postService.getPosts().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        posts: result,
      })
    }))
  }

  @Action(AddPost)
  add(
    { getState, patchState }: StateContext<PostStateModel>,
    { payload }: AddPost
  ) {
    return this.postService.createPost(payload).pipe(tap((result) => {
    const state = getState();
    patchState({
      posts: [...state.posts, result]
      })
    }));
  }

  @Action(RemovePost)
  remove(
    {getState, setState }: StateContext<PostStateModel>,
    { payload }: RemovePost
  ) {
    return this.postService.deletePost(payload).pipe(tap(() => {
      const state = getState();
    const filteredArray = state.posts.filter(item => item._id != payload._id);
    setState({
      ...state,
      posts: filteredArray,
    })
    }))

  }

 @Action(IncrementPostPoint)
 Increment(
  {getState, setState }: StateContext<PostStateModel>,
  { payload }: IncrementPostPoint
) {
  setState({
    posts: getState().posts.map((a) => a._id != payload._id? a : {...payload, points: payload.points})
  })
  return this.postService.incrementPostPoints(payload).pipe(tap((result) => {
  setState({
    posts: getState().posts.map((a) => a._id != payload._id? a : result)
  })}))
}

@Action(DecrementPostPoint)
Decrement(
  {getState, setState }: StateContext<PostStateModel>,
  { payload }: DecrementPostPoint
) {
  return this.postService.decrementPostPoints(payload).pipe(tap((result) => {
    setState({
      posts: getState().posts.map((a) => a._id != payload._id? a : result)
    })}))
  }

  @Action(AddComment)
  Add(
    {getState, patchState }: StateContext<PostStateModel>,
    { payload }: AddComment
  ) {
    return this.postService.createPost(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        posts: [...state.posts, result]
        })
    }))
  }

}

// setState({
//   posts: getState().posts.filter((a) => a._id != _id)
// })
