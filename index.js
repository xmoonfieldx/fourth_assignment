const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Import models
const Post= require('./src/models/post')

//Define application
const app = express()

//define db
const db = mongoose.connect('mongodb://localhost:/27017/fourth_assignment-db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req, res){
  res.send({ping:'pong'})
})

//Operations: CRUD
app.post('/posts', function(req,res){
  const title = req.body.title
  const author = req.body.author
  const content = req.body.content

  const post = new Post();
  post.title = title
  post.author = author
  post.content = content
  post.save(function(error, savedPost){
    if(error){
        res.status(500).send(error: 'Unable to save post')
    }else{
      res.status(200).send(savedPost)
    }
  })
  //res.send({title:title, author:author, content:content})
});

//get list of all posts
app.get('/posts', function(req,res){
  Post.find({}, function(error, posts){
    if(error){
      res.status(422).send(error: 'Unable to fetch post')
    }else{
      res.status(200).send(posts)
    }
  })
})

app.listen(3001,function(){
  console.log('Server is running at port 3001')
})
