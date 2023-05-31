const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const path = require("path");

//DB 객체 받아오기
const db = require("../models/db.js");

//bodyparser를 사용하기 위함
router.use(express.json()); //json 형태로 파싱
router.use(express.urlencoded({ extended: false })); //파싱 옵션 지정 true면 qs false면 내장 querystring

//login으로 접속
router.get("/login", (req, res) => {
    if (!req.session.is_logined) {
        return res.sendFile(path.join(__dirname, "/../views/login.html"));
    } else {
        const userName = req.session.userId;
        res.render("main", { userName });
    }
});

//로그인 시도
router.post("/login", function (req, res) {
    const inputId = req.body.id;
    const inputPw = req.body.pw;

    //아이디 검사
    db.query(
        "SELECT * FROM ACCOUNT WHERE ID = ? AND PW = ?",
        [inputId, inputPw],
        (err, result) => {
            if (result.length > 0) {
                req.session.userId = inputId;
                req.session.is_logined = true;
                req.session.save(function () {
                    res.render("main", { userName: inputId });
                });
            } else {
                console.log("로그인 실패");
                console.log(err);
                return;
            }
        }
    );
});

//메인화면 이동
router.get("/main", (req, res) => {
    const user = req.session.user;

    return res.render("main", { user });
});

//회원가입 페이지 이동
router.get("/registerCall", (req, res) => {
    return res.sendFile(path.join(__dirname, "/../views/register.html"));
});

//회원가입 요청
router.post("/registerAuth", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const email = req.body.email;
    const nickname = req.body.nickname;

    const sql = "INSERT INTO account VALUES(?,?,?,?,?)";
    db.query(sql, [id, pw, name, email, nickname], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
    res.send(
        "<script>alert('회원가입 성공');location.href='/../auth/login';</script>"
    );
});

//로그아웃 요청
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("ysm");

    res.redirect("/auth/login");
});

module.exports = router;
