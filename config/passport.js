const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User")


// Local Strategy 
passport.use(new LocalStrategy(User.authenticate()))

// passport.use(new LocalStrategy(
//     async (email, password, done) => {
       
//             try {
//                 // Find user with email
//                 const user = await User.findOne({ email: email }) 
//                 if (!user) {
//                     return done(null, false, 
//                         { message: 'No user by that email' });
//                 } else {
//                  // Match with the password
//                 }
                   
//             } catch (err) {
//                 console.log(err)
//                 res.status(500).json({ error: err })
//             }
//     })
// )


// lors de l'authentification
// sérialise l'instance utilisateur avec les informations transmises 
// et la stocke dans la session via un cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// à chaque demande ultérieure de désérialisation de l'instance, 
// fournit l'identifiant de cookie unique en tant que «justificatif d'identité»
passport.deserializeUser((id, done) => {
    User.findbyId(id, (err, user) => {
        done(err, user)
    })
})
  
module.exports = passport