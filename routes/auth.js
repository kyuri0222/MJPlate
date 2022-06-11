const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const router = express.Router();

// 회원가입
router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  const { id, password, name, birth, phoneNum } = req.body;
  try {
    const exUser = await User.findOne({ where: { user_ID: id } });
    if (exUser) {
      return res.send(
        `<script type="text/javascript">window.location="/auth/signup";alert('이미 존재하는 ID입니다.');</script>`
      );
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        user_ID: id,
        user_PW: hash,
        user_name: name,
        user_birth: birth,
        user_phoneNum: phoneNum
      });
      return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// 회원가입 화면
router.get("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    res.render("signup", { title: "Signup" });
  } catch (error) {
    console.error(error);
  }
});

// login
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    console.info('__passport.authenticate()');
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // return res.redirect(`/?loginError=${info.message}`);
      return res.send(
        `<script type="text/javascript">window.location="/auth/login";alert('${info.message}');</script>`
      );
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error("loginError");
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

//로그인 화면
router.get("/login", isNotLoggedIn, (req, res, next) => {
  try {
    res.render("login", { title: "Login" });
  } catch (error) {
    console.error(error);
  }
});

// logout
router.get("/signout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/"); 
});

// kakao site login
router.get('/kakao', passport.authenticate('kakao'));

// kakao site login후 자동 redirect
// kakao 계정 정보를 이용하여 login or 회원가입/login
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);
 
module.exports = router;
