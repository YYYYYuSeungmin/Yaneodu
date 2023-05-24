const mysql = require("mysql");

require("dotenv").config(); //DB 아이디 비밀번호 불러오기
//DB Conn 객체 생성
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
});

//MYSQL Conn 실행
connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
