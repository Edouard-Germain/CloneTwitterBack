const User = require("../models/User")

// Vérifier si user déjà connecté 

const hasAutorization = async (req, res, next) => {

  try {
    const userLogged = await User.findOne({ _id: id }).exec()
    if (userLogged._id === req.user.id) {
      next()
    }
    return

  } catch (err) {
    res.status(401).json({ error: "You need to be logged" })
    res.redirect('/login')
  }
}
 

module.exports = {
  hasAutorization,
}