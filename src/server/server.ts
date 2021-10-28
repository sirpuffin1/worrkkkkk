import express from 'express'
import cors from 'cors'
import { PostModel } from './schemas/post.schema.js'
import mongoose from 'mongoose'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
  console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to connect to DB', err))

app.use(cors());
app.use(express.json());

const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

app.get('/api/posts', function(req, res) {
  PostModel.find()
  .then(data => res.json({data}))
  .catch(err => {
    res.status(501)
    res.json({errors: err})
  })
})

app.post('/api/create-post', function(req, res){
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

app.post('/api/create-comment', function(req, res) {
    const {message} = req.body;
  PostModel.findByIdAndUpdate(req.body._id, {$push: {comments:{message}}}, {new: true}).then((data) => {
    console.log(data);
    res.json({data})
  })
})

app.post('/api/increment-post-points', function(req, res){
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

  app.post('/api/decrement-post-points', function(req, res){
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

app.delete('/api/delete-post/:id', function(req, res) {
  const _id = req.params.id;
  PostModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({data})
  })
})

app.listen(PORT, function() {
  console.log( `starting at localhost http://localhost:${PORT}`, process.env.MONGO_URI)
})

app.all("/api*", function (req, res) {
  res.sendStatus(404);
});

app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});
