import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddPost } from 'src/app/actions/post.action';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  constructor( private store: Store) {
  }



  addPost(title: string , body: string) {
    this.store.dispatch(new AddPost({ title: title, body: body, points: 0}));
  }

  ngOnInit() {
  }

}
