const passport = require("passport");
const localStrategy = require("./localStrategy");
// const kakaoStrategy = require("./kakaoStrategy"); 
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }) 
      .then(async (user) => { done(null, user);})
      .catch((err) => done(err));
  });

  localStrategy();
  // kakaoStrategy();

};