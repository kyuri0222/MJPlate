const express = require("express");
const router = express.Router();
const { User, User_Restr, Restr } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { getUser } = require("./common");
const { Op } = require("sequelize");
const { response } = require("express");

// GET homepage
router.get("/", async (req, res, next) => {
  let bookmark = null;
  let non_bookmark = null;
  if (res.locals.state != "beforeLogin") {
    bookmark = await User_Restr.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
          where: { id: req.user.id },
        },
        {
          model: Restr,
        }
      ],
    });
    const bookmark_restr = bookmark.map((value) => {
      return value.Restr.id;
    });
    non_bookmark = await Restr.findAll({
      where: {
        id: { [Op.notIn]: bookmark_restr },
      }
    });
  }
  res.render("index", {
    title: "Home",
    restr_before: bookmark,
    restr_cur: non_bookmark,
  });
});

// GET mypage
router.get("/mypage", isLoggedIn, (req, res, next) => {
  const current_user = getUser(req.user);
  const user_ID = current_user.user_ID;

  res.render("mypage", { title: "Mypage", current_user });
});

// GET mypageupdate
router.get("/updateMypage", isLoggedIn, (req, res, next) => {
  const current_user = getUser(req.user);
  res.render("updateMypage", {
    title: "Mypage",
    current_user,
  });
});

// 마이페이지- 자신의 정보(이름, 생일, 전화번호)를 데이터베이스에 저장 및 수정할 수 있다.
// POST mypage
router.post("/updateMypage", isLoggedIn, async (req, res, next) => {
  const { user_name, user_birth, user_phoneNum, user_PW} = req.body;

  const del = user_PW.replace(/(\s*)/g, "");
  console.log("===============================");
  console.log(user_PW);
  console.log(del);
  console.log(!user_PW);
  console.log(!del);
  console.log("-------------------------------");
  try {
    const afterUser = await User.update(
      {
        user_name,
        user_birth,
        user_phoneNum,
      },
      { where: { id: req.user.id } }
    );
    res.redirect("/mypage");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원가입 시 중복 확인 기능을 추가하여 이미 등록된 아이디로 회원가입 할 경우 에러 메시지를 출력하고
// 중복되지 않은 아이디일 경우 회원가입이 가능하다.
// POST checkId
router.post("/checkId", async (req, res, next) => {
  const { inputId } = req.body;
  if (inputId) {
    const exUser = await User.findOne({ where: { user_ID: inputId } });

    if (exUser) {
      return res.send("사용 중인 아이디입니다.");
    } else {
      return res.send("사용할 수 있는 아이디입니다.");
    }
  } else {
    return res.send("아이디를 입력하세요");
  }
});

// 맛집리스트 - 즐겨찾기 추가
router.post("/bookmarkRestr", async (req, res, next) => {
  const { non_restr_name, non_restr_type, non_restr_locate, non_restr_desc } = req.body;
  const bookmarkRestr = await Restr.findOne({
    attributes: ["id"],
    where: { restr_name: non_restr_name },
  });
  const result = await User_Restr.create({
    User_id: req.user.id,
    Restr_id: bookmarkRestr.id,
  });
  res.end();
});

// 맛집리스트 - 즐겨찾기 취소
router.post("/cxlmarkRestr", async (req, res, next) => {
  const { restr_name, restr_type, _restr_locate, restr_desc } = req.body;
  console.log(restr_name,restr_type,_restr_locate,restr_desc);
  const bookmark = await User_Restr.findOne({
    include: [
      {
        model: User,
        attributes: ["id"],
        where: { id: req.user.id },
      },
      {
        model: Restr,
        where: { restr_name },
      },
    ],
  });
  await User_Restr.destroy({
    where: { id: bookmark.id },
  });
  res.send("내 즐겨찾기에서 삭제하시겠습니까?");
});


// 페이지
router.get("/myList", isLoggedIn, async (req, res, next) => {
  let partPageNum = req.query.partPage;
  let partOffset = 0;

  if (partPageNum > 1) {
    partOffset = 5 * (partPageNum - 1);
  }

  let bookmark = await User_Restr.findAll({
    include: [
      {
        model: User,
        attributes: ["id"],
        where: { id: req.user.id },
      },
      {
        model: Restr,
      },
    ],
    offset: partOffset,
    limit: 5,
    order: [[Restr, "restr_name", "DESC"]],
  });

  let nonPageNum = req.query.nonPage;
  let nonOffset = 0;

  if (nonPageNum > 1) {
    nonOffset = 5 * (nonPageNum - 1);
  }
  const bookmark_restr = bookmark.map((value) => {
    return value.Restr.id;
  });

  non_bookmark = await Restr.findAll({
    where: {
      id: { [Op.notIn]: bookmark_restr },
    },
    offset: nonOffset,
    limit: 5,
    order: [["restr_name", "desc"]],
  });
  res.send([bookmark, non_bookmark]);
});

module.exports = router;
