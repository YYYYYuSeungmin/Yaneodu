const express = require("express");

const server = express();
const port = 3000;

const session = require("express-session");
const bodyParser = require("body-parser");
const http = require("http");
const ejs = require("ejs");
const path = require("path");

//라우터 모듈 가져오기
const auth = require("./routes/authRoutes.js");
const schedule = require("./routes/scheduleRoutes.js");
const lookSchedule = require("./routes/lookScheduleRoutes.js");
const followRoutes = require("./routes/followRoutes.js");
const FileStore = require("session-file-store")(session);

//ejs 파일 설정
server.set("view engine", "ejs");
server.set("views", "./views");

//bodyparser를 사용하기 위함
server.use(express.json()); //json 형태로 파싱
server.use(express.urlencoded({ extended: false })); //파싱 옵션 지정 true면 qs false면 내장 querystring

//세션 설정
server.use(
    session({
        secret: "ysm",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

server.use("/auth", auth);
server.use("/schedule", schedule);
server.use("/lookSchedule", lookSchedule);
server.use("/follow", followRoutes);

//정적파일 설정
server.use("/css", express.static(__dirname + "/css", { extensions: ["css"] }));
server.use("/img", express.static(__dirname + "/img", { extensions: ["img"] }));
server.use(
    "/views/components",
    express.static(__dirname + "/views/components", {
        extensions: ["js"],
    })
);

// 루트로 접속시 보낼 홈페이지
server.get(["/main", "/"], (req, res) => {
    res.redirect("/auth");
});

//서버 시작
server.listen(port, () => console.log("서버 시작"));
