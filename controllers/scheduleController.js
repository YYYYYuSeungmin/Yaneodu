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
            // console.log("Category list:", results);

            res.json(results);
        }
    );
};

// /getScheduleList
exports.getScheduleList = function (req, res) {
    const categoryID = req.body.categoryID;

    db.query(
        "SELECT * FROM SCHEDULE WHERE category_id = ?",
        [categoryID],
        (error, results) => {
            if (error) {
                console.error("Error retrieving schedule list: ", error);
                return;
            }

            res.json(results);
        }
    );
};

// deleteCategory
exports.deleteCategory = function (req, res) {
    const categoryID = req.body.categoryID;
    const userID = req.body.userID;

    db.query(
        "DELETE FROM category WHERE category_id = ? and id = ?",
        [categoryID, userID],
        (error, results) => {
            if (error) {
                console.error("Error retrieving schedule list: ", error);
                return;
            }
            res.json({ message: "Delete Category success" });
        }
    );
};

// updateCategory
exports.updateCategory = function (req, res) {
    const categoryID = req.body.categoryID;
    const newTitle = req.body.updateTitle;

    db.query(
        "UPDATE category SET category = ? WHERE category_id = ?",
        [newTitle, categoryID],
        (error, results) => {
            if (error) {
                console.error("Error retrieving schedule list: ", error);
                return;
            }
            res.json({ message: "Update Success" });
        }
    );
};

// insertSchedule
exports.insertSchedule = function (req, res) {
    const categoryID = req.body.categoryID;
    const schedule = req.body.scheduleContent;
    const visibility = req.body.accessLevel; //공개범위 설정 1 = 전체공개 2 = 팔로우공개 3 = 나만보기
    //초기 설정은 무한반복
    const startDate = new Date(1990, 0, 1);
    const endDate = new Date(3000, 0, 1);

    console.log("TESTING : " + categoryID + schedule + visibility);

    db.query(
        "INSERT INTO schedule(schedule, start_date, end_date, category_id, visibility) VALUES(?,?,?,?,?)",
        [schedule, startDate, endDate, categoryID, visibility],
        (error, results) => {
            if (error) {
                console.error("schedule insert error!!");
                return;
            }

            res.json({ message: "INSERT schedule SUCCESS" });
        }
    );
};

// deleteSchedule
exports.deleteSchedule = function (req, res) {
    const scheduleID = req.body.scheduleID;

    db.query(
        "DELETE FROM schedule WHERE schedule_id = ?",
        [scheduleID],
        (error, results) => {
            if (error) {
                console.error("schedule delete error!!");
                return;
            }

            res.json({ message: "DELETE schedule SUCCESS" });
        }
    );
};

// updateSchedule
exports.updateSchedule = function (req, res) {
    const scheduleID = req.body.scheduleID;
    const newContent = req.body.newContent;
    console.log(scheduleID, newContent);
    db.query(
        "UPDATE schedule SET schedule = ? WHERE schedule_id = ?",
        [newContent, scheduleID],
        (error, results) => {
            if (error) {
                console.error("schedule update error!!" + ", " + error);
                return;
            }

            res.json({ message: "UPDATE schedule SUCCESS" });
        }
    );
};
