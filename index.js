const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
const dbName = "twitter"
const dbUrl = "mongodb+srv://Konexio:CloneTweet001@clonetwitter.lvm6j.mongodb.net/twitter?retryWrites=true&w=majority"

const tweetsRoutes = require("./routes/tweets")
const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json())

// Configure Sessions Middleware
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

// Configure passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/tweets', tweetsRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })