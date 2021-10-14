import  mongoose  from 'mongoose'
import type { Post } from '../../client/src/app/models/post'

const commentSchema = new mongoose.Schema({
    message: String
})
const postSchema = new mongoose.Schema<Post>({
  title: {type: String, required: true},
  body: {type: String, required: true},
  points: {type: Number, required: true},
  comments: [commentSchema]
})



export const PostModel = mongoose.model<Post>('post', postSchema)
