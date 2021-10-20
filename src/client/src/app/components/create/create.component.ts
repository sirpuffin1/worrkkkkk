import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { AddPost } from 'src/app/actions/post.action';

interface Category {
  value: string
  viewValue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedValue!: string;

  categories: Category[] = [
    {value: 'Spider-man', viewValue: 'Spider-man'},
    {value: 'Crime', viewValue: 'Crime'},
    {value: 'Coding', viewValue: 'Coding'}
  ]
   value = ''
   formValue = ''
   urlValue = ''
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  ])


  constructor( private store: Store) {
  }



  addPost(title: string , body: string, category: string) {
    this.store.dispatch(new AddPost({ title: title, body: body, points: 0, comments: [], category: category}));

  }

  ngOnInit() {
  }

}

