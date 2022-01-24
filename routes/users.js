const express = require("express")
const app = express()
const passport = require("../config/passport")
const multer = require("multer")


const User = require("../models/User")
const { hasAutorization } = require("../middlewares/auth")

const upload = multer({ dest: 'public' })


// Récupérer tous les users 

app.get('/', async (req, res) => {
  
  try {
    const users = await User.find({})
    .exec()
    res.json(users)

  } catch (err) {
    res.status(500).json({ error: err })
    console.log(err)
  }
})


// Récupérer un user 

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOne({ _id : id })
    // .populate({ path : 'user', model : 'user'})
    .populate({
      path : "tweets",
       model : "Tweet",
       populate : {
         path: "user",
         model : "User"
       }
    })
    .exec()
    res.json(user)
    console.log("user", user)
  } catch (err) {
    res.status(500).json({ error: err })
    console.log("err",err)
  }
})


// Modifier un user

app.put('/:id',hasAutorization, async (req, res) => {
  const { id } = req.params
  console.log('Hello world')
  try {
    const user = await User.findOneAndUpdate(
      { _id : id  },
      { ...req.body },
      { new: true }
    ).exec()

    res.json(user)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})




// Poster image profil

app.post('/:id/upload', upload.single('photo'), async (req, res) => {
  const { id } = req.params
  console.log(req.file.path)
  const pictureUrl = `${req.file.destination}/${req.file.originalname}`
  
  try {
    // Using upsert option (creates new doc if no match is found):
    if (!req.file) 
      return res.status(400).json({ error: "Error file uploading" })

    let user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { pictureUrl : pictureUrl } },
      { new: true }
    ).exec()

    res.json(user);

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err })
  }


})


module.exports = app