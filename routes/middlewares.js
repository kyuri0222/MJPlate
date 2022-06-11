const { User_Restr } = require("../models");

// 회원가입, 로그인, 로그아웃 라우터
// 로그인한 사용자는 회원가입과 로그인 라우터에 접근 불가
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인이 필요합니다.");
    res
      .status(403)
      .send(
        `<script type="text/javascript">window.location="/auth/login";alert('${decodeURIComponent(
          message
        )}');</script>`
      );
  }
};

// 로그인하지 않은 사용자는 로그아웃 라우터에 접근 불가
// 로그인 중이면 req.isAuthenticated()==true, 아니면 false
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.send(
      `<script type="text/javascript">window.location="/";alert('${decodeURIComponent(
        message
      )}');</script>`
    );
  }
};

exports.getState = async (req, res, next) => {
  if (!req.user) {
    res.locals.state = "beforeLogin";
  } else {
    res.locals.state = "user";
  }
  console.log(res.locals.state);
  next();
};