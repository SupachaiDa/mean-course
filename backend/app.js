const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://Mark:Mark123@cluster0-q6zto.mongodb.net/mean-course?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database')
  })
  .catch((() => {
    console.log('Fail to connect to database')
  }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow all domain to access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post('/api/posts',(req,res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then( cratedPost => {
    res.status(201).json({
    message: 'Added post successfully',
    postId: cratedPost._id //ส่ง postId ให้ postService ที่จากเดิมเป็น null
  })})
})

app.get('/api/posts', (req,res) => {
  Post.find()
    .then( documents => {
    res.status(200).json({
    message: 'fetch data success',
    posts: documents
  })
    })
})

app.delete('/api/posts/:id', (req,res) => {
  Post.deleteOne({_id: req.params.id})
    .then( result => {
      console.log(result)
      res.status(200).json({message: 'Post deleted'})
    } )
})

module.exports = app
