const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

//auth 메인으로 접속
router.get("/", authController.isOwner);

//login으로 접속
router.get("/login", authController.getLogin);

//로그인 시도
router.post("/login_process", authController.postLogin);

//메인화면 이동
router.get("/main", authController.getMain);

//회원가입 페이지 이동
router.get("/register", authController.getRegister);

//회원가입 요청
router.post("/register_process", authController.postRegister_process);

//로그아웃 요청
router.get("/logout", authController.getLogout);

module.exports = router;
