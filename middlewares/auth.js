const User = require("../models/User")

// Vérifier si user déjà connecté 

const hasAutorization = async (req, res, next) => {
  const user = await User.findOne({ _id : req.params.id }).exec()

  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "You need to login" })
  }
  console.log(req.params.id)
  console.log(user.id)
  
  // try {
  //   const userLogged = await User.findOne({ 
  //     _id: req.user.id 
  //   }).exec()
  //   if (userLogged._id === req.params.id) {
  //     next()
  //   } else {
  //     res.status(401).json({ error: "You need to be logged" })
  //   }
  // } catch (err) {
  //   console.log(err)
  //   res.status(500).json({ error: "Server Error" })
  // }
}
 

module.exports = {
  hasAutorization,
}