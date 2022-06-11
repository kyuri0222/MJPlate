const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const exUser = await User.findOne({ where: { user_ID: id } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.user_PW);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};