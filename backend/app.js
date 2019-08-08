const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
  const post = req.body;
  console.log(post)
  res.status(201).json({
    message: 'Added post successfully',
  })
})

app.use('/api/posts', (req,res) => {
  posts = [
    {id:'sd665645' ,title:'First Post' ,content:'testing 1'},
    {id:'frsf5455' ,title:'Second Post' ,content:'testing 2'},
    {id:'ssadc545' ,title:'Third Post' ,content:'testing 3'}
  ]
  res.status(200).json({
    message: 'fetch data success',
    posts: posts
  })
})

module.exports = app
