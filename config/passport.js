const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User")


// Local Strategy 

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Unknown email" });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        });
      }
    )
  );

// lors de l'authentification
// sérialise l'instance utilisateur avec les informations transmises 
// et la stocke dans la session via un cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// à chaque demande ultérieure de désérialisation de l'instance, 
// fournit l'identifiant de cookie unique en tant que «justificatif d'identité»
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
  
module.exports = passport