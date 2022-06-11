const express = require("express");
const router = express.Router();
const { User, User_Restr, Restr } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.use(isLoggedIn);

// 맛집 등록
router.post("/registRestr", async (req, res, next) => {
  const { name, type, locate, desc } = req.body;
  try {
    const new_restr = await Restr.create({
      restr_name: name,
      restr_type: type,
      restr_locate: locate,
      restr_desc: desc,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 유저-맛집 관리
router.get("/restrList", (req, res, next) => {
  res.render("user/restrList", {
    title: "restrList",
  });
});

// 유저-맛집 등록
router.get("/registRestr", (req, res, next) => {
  res.render("user/registRestr", {
    title: "registRestr",
  });
});

module.exports = router;