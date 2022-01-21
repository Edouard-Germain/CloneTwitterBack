const express = require('express')
const app = express()
const { body, validationResult } = require('express-validator')
const { errors } = require('passport-local-mongoose')
const User = require ("../models/User")
const Comment = require ("../models/Comment")
const Tweet = require("../models/Tweet")

app.post(
  '/', 
  body('content').isLength({max : 280}), 
  async (req, res) => {
    try {
      const comment = new Comment ({... req.body})

      const commentInsered = await comment.save()

      res.json(commentInsered)
    } catch (error){
      console.log(err)
      res.status(500).json({error : err})
    }
  }
)
  

  app.delete('/:id', async(req,res)=>{
    const {id} = req.params
    try {
      const deletedComment = await Comment.findOne({_id: id})
      await User.updateOne(
        {_id : deletedComment.User},{
          $pull: {comments: deletedComment._id}
        }).exec()
      await Comment.deleteOne({_id : id}).exec()
      res.status(200).json({ sucess : "Comment deleted"})
    } catch (err) {
      res.status(500).json({error : err})
    }
  })
module.exports = app
