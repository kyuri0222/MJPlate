// import modules
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");

//import routers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const { getState } = require("./routes/middlewares");

dotenv.config();
const app = express();

passportConfig(); //패스포트 설정

app.set("views", "./views");
app.set("view engine", "pug");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch((err) => {
    console.error(err);
  });

// 공통 middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 요청 경로에 따라 router 실행
app.use(getState);
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

module.exports = app;
