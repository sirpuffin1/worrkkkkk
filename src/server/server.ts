import express from 'express'
import cors from 'cors'
import { PostModel } from './schemas/post.schema.js'
import mongoose from 'mongoose'

const app = express();
const PORT = 3501;

mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
  console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to connect to DB', err))

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
  res.json({message:'test'})
})

app.get('/posts', function(req, res) {
  PostModel.find()
  .then(data => res.json({data}))
  .catch(err => {
    res.status(501)
    res.json({errors: err})
  })
})

app.post('/create-post', function(req, res){
  const {title, body, points, comments, category} = req.body;
  const post = new PostModel({
    title,
    body,
    points,
    comments,
    category
  });
  post.save()
  .then((data) => {
    res.json({data})
  })
  .catch(err => {
    console.log(err);
    res.status(501);
    res.json({errors: err})
  })
})

app.post('/create-comment', function(req, res) {
    const {message} = req.body;
  PostModel.findByIdAndUpdate(req.body._id, {$push: {comments:{message}}}, {new: true}).then((data) => {
    console.log(data);
    res.json({data})
  })
})

app.post('/increment-post-points', function(req, res){
    const {title, body, points, comments} = req.body;
     PostModel.findByIdAndUpdate(req.body._id, {
     $inc:{ points: 1}
    }, {new: true})
    .then((data) => {
      res.json({data})
    })
    .catch(err => {
      res.status(501);
      res.json({errors: err})
    })
  })

  app.post('/decrement-post-points', function(req, res){
    const {title, body, points} = req.body;
     PostModel.findByIdAndUpdate(req.body._id, {
     $inc:{ points: -1}
    }, {new: true})
    .then((data) => {
      res.json({data})
    })
    .catch(err => {
      res.status(501);
      res.json({errors: err})
    })
  })

app.delete('/delete-post/:id', function(req, res) {
  const _id = req.params.id;
  PostModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({data})
  })
})

app.listen(PORT, function() {
  console.log( `starting at localhost http://localhost:${PORT}`)
})
