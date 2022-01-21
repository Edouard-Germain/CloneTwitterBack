const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tweet: { type: Schema.Types.ObjectId, ref: "Tweet"},
}, {
  timestamps: true
})

CommentSchema.post("save", async function(doc) {
  await model("Tweet").updateOne(
    { _id: doc.tweet },
    { $push: { comments: doc._id }}
  )
})

const Comment = model('Comment', CommentSchema)

module.exports = Comment