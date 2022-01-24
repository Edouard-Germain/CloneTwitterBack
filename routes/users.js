const express = require("express")
const app = express()
const passport = require("../config/passport")
const multer = require("multer")
const fs = require("fs")

const User = require("../models/User")
const { hasAutorization } = require("../middlewares/auth")

const upload = multer({ dest: 'public' })


// Récupérer tous les users 

app.get('/', async (req, res) => {
  
  try {
    const users = await User.find({}).exec()
    res.json(users)

  } catch (err) {
    res.status(500).json({ error: err })
  }
})


// Récupérer un user 

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOne({ _id : id })
    .populate({ path : 'user', model : 'user'})
    .exec()
    res.json(user)

  } catch (err) {
    res.status(500).json({ error: err })
  }
})


// Modifier un user

app.put('/:id',hasAutorization, async (req, res) => {
  const { id } = req.params
  
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

app.post('/:id/upload', upload.single('pictureUrl'), async (req, res) => {
  const { id } = req.params
  const pictureName = `${req.file.originalname}`
  fs.renameSync(req.file.path, `${req.file.destination}/${pictureName}`)
  const pictureUrl = `http://localhost:5000/${pictureName}`
  
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