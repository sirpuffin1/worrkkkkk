import * as mongoose from 'mongoose'
export interface Post {
  _id?: {type: mongoose.Types.ObjectId}
  title: string
  body: string
  points: number
  comments: []
  category: string
}
