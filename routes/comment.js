const express = require('express')
const app = express()
const Comment = require ("../models/Comment")
const Tweet = require("../models/Tweet")

app.post('/', async(req,res)=>{
    try {
      const comment = await new Comment ({... req.body})
      comment.save((err,comment)=>{
        if(comment){
          res.json(comment)
          console.log(comment)
          return
        }
        res.status(500).json({error:err})
      })
    } catch (error){
      console.log(err)
      res.status(500).json({error : err})
    }
  })
  app.delete('/:id', async(req,res)=>{
    const {id} = req.params
    try {
      await Comment.deleteOne({_id : id}).exec()
      res.status(200).json({ sucess : "Comment deleted"})
    } catch (err) {
      res.status(500).json({error : err})
    }
  })
module.exports = app
