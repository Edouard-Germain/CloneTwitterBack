const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose")
const User = require("../models/User")


// Local Strategy 

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
        // if (!user) {
        //   return done(null, false, { message: "Unknown email" });
        // }
        // if (!user.authenticate(password)) {
        //   return done(null, false, { message: "Invalid password" });
        // }

        if (!user) {
          return done(null, false, { message: "Invalid password" })
        } // on met pas de else parce que le return nous fait sortir de la fonction
      
        return done(null, user)
      }
      
    )
  );

// lors de l'authentification
// sérialise l'instance utilisateur avec les informations transmises 
// et la stocke dans la session via un cookie
passport.serializeUser((user, done) => {
    done(null, user._id)
})

// à chaque demande ultérieure de désérialisation de l'instance, 
// fournit l'identifiant de cookie unique en tant que «justificatif d'identité»
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
  
module.exports = passport