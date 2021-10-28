import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    message: String
});
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    points: { type: Number, required: true },
    comments: [commentSchema],
    category: { type: String, required: false }
});
export const PostModel = mongoose.model('post', postSchema);
//# sourceMappingURL=post.schema.js.map