import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(posts: Post[] | null, _args?: any): Post[] {
    return posts ? posts.sort((a: Post, b: Post)  => {
      return b.points > a.points ? 1: -1
    }) : []
  }

}
