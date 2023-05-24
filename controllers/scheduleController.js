const db = require("../models/db.js"); //DB모듈 로드

//카테고리 생성하기
exports.insertCategory = function (req, res) {
    const userId = req.session.userId;
    const categoryTitle = req.body.title;

    const sql = "INSERT INTO category(category,id) VALUES(?,?)";

    db.query(sql, [categoryTitle, userId], function (err, result) {
        if (err) {
            if (
                err.sqlMessage.includes("Duplicate") &&
                err.code === "ER_DUP_ENTRY"
            ) {
                res.send(
                    `<script>alert("이미 등록된 카테고리입니다."); location.href="/../auth";</script>`
                );
            }
        } else {
            res.send(
                `<script>alert("카테고리 등록이 완료되었습니다."); location.href="/../auth";</script>`
            );
        }
    });
};

// /getCategoryList 로의 요청
exports.getCategoryList = function (req, res) {
    const userId = req.session.userId;

    db.query(
        "SELECT * FROM CATEGORY WHERE id = ?",
        [userId],
        (error, results) => {
            if (error) {
                console.error("Error retrieving category list:", error);
                return;
            }
            // 결과 처리 로직
            console.log("Category list:", results);

            res.json(results);
        }
    );
};

// getScheduleList 요청
//
// exports.getScheduleList = function ([uId, categoryNum], req, res) {};
