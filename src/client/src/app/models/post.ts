import * as mongoose from 'mongoose'
import { Comment } from './comment'
export interface Post {
  _id?: {type: mongoose.Types.ObjectId}
  title: string
  body: string
  points: number
  comments: Comment[]
  category: string
}
