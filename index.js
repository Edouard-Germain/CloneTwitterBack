const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000
const dbName = "twitter"
const dbUrl = "mongodb+srv://Konexio:CloneTweet001@clonetwitter.lvm6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

