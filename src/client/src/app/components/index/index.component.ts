import { Component,  OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DecrementPostPoint, GetPosts, IncrementPostPoint, RemovePost, AddComment } from 'src/app/actions/post.action';
import { Post } from 'src/app/models/post';
import { PostState } from 'src/app/state/user.state';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit {
  @Select(PostState.getPostsList)
  posts$?: Observable<Post[]>;

  panelOpenState = false;



  constructor(private store: Store) {


   }

   addComment(post: Post, message: string) {
     this.store.dispatch(new AddComment({_id: `${post._id}`, message}))
   }

   delPost(post: Post) {
     this.store.dispatch(new RemovePost(post))
   }

   incrementPost(post: Post) {
     this.store.dispatch(new IncrementPostPoint(post))
   }

   decrementPost(post: Post) {
     this.store.dispatch(new DecrementPostPoint(post))
   }


  ngOnInit(): void {
    this.store.dispatch(new GetPosts())
  }

}

