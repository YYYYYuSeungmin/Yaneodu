const path = require("path");
const db = require("../models/db.js");

// GET /auth/login
exports.getLogin = (req, res) => {
    if (!req.session.is_logined) {
        res.sendFile(path.join(__dirname, "/../views/login.html"));
    } else {
        const userId = req.session.userId;
        const userNick = req.session.userNick;
        res.render("main", { userId: userId, userNick: userNick });
    }
};

// Post /auth/login_process
exports.postLogin = (req, res) => {
    const inputId = req.body.id;
    const inputPw = req.body.pw;

    //아이디 검사
    db.query(
        "SELECT * FROM ACCOUNT WHERE ID = ? AND PW = ?",
        [inputId, inputPw],
        (err, result) => {
            if (result.length > 0) {
                req.session.userId = inputId;
                req.session.userNick = result[0].nickname;
                req.session.is_logined = true;
                req.session.save(function () {
                    res.redirect("/main");
                });
            } else {
                res.send(
                    "<script>alert('로그인 실패');location.href='/../auth/login';</script>"
                );
            }
        }
    );
};

// GET /auth/main
exports.getMain = (req, res) => {
    const userId = req.session.userId;
    const userNick = req.session.userNick;

    res.render("main", { userId: userId, userNick: userNick });
};

// GET /auth/register
exports.getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, "/../views/register.html"));
};

// POST /auth/register_process
// 회원가입 요청
exports.postRegister_process = (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const email = req.body.email;
    const nickname = req.body.nickname;

    const sql = "INSERT INTO account VALUES(?,?,?,?,?)";
    db.query(sql, [id, pw, name, email, nickname], (err, result) => {
        if (err) {
            //중복 아이디인 경우
            if (
                err.code === "ER_DUP_ENTRY" &&
                err.sqlMessage.includes("PRIMARY")
            ) {
                res.send(
                    "<script>alert('중복된 아이디 입니다.');location.href='/auth/register';</script>"
                );
                return false;
            } else if (err.sqlMessage.includes("CH_pw")) {
                res.send(
                    "<script>alert('비밀번호는 8자이상 20자이하 이어야 하며, 알파벳, 숫자, 특수문자를 포함해야 합니다.');location.href='/auth/register';</script>"
                );
                return false;
            } else {
                console.log(err);
                throw err;
            }
        } else {
            res.send(
                "<script>alert('회원가입 성공');location.href='/auth/login';</script>"
            );
        }
    });
};

// GET /auth/logout
exports.getLogout = (req, res) => {
    req.session.destroy();
    res.clearCookie("ysm");

    res.redirect("/auth/login");
};

//로그인 여부 체크
exports.isOwner = function (req, res) {
    if (req.session.is_logined) {
        const userId = req.session.userId;
        const userNick = req.session.userNick;
        res.render("main", {
            userId: userId,
            userNick: userNick,
        });
    } else {
        res.redirect("/auth/login");
        return false;
    }
};
