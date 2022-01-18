const User = require("../models/User")

// Vérifier si user déjà connecté 

const hasAutorization = (req, res, next) => {
  console.log(req.user)
  if (req.user) {
    console.log("if")
    next()
  } else {
    console.log("else")
    res.status(401).json({ error: "You need to login" })
  }
}
 

module.exports = {
  hasAutorization,
}