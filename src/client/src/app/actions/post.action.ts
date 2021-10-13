import { Post } from "../models/post";

export class GetPosts {
  static readonly type="[Post] Get Posts"
}

export class AddPost {
  static readonly type = '[Post] Add Post'

  constructor(public payload: Post) {}
}

export class RemovePost {
  static readonly type = '[Post] Remove Post'

  constructor(public payload: Post) {}
}

export class IncrementPostPoint {
  static readonly type = '[Post] Increment Post Point'

  constructor(public payload: Post) {}
}
export class DecrementPostPoint {
  static readonly type = '[Post] Decrement Post Point'

  constructor(public payload: Post) {}
}
