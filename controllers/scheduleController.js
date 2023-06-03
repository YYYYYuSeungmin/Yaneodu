const { ajaxPrefilter } = require("jquery");
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

    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    console.log("date >>> " + year + month + day);
    // 날짜 정보를 기반으로 Date 객체 생성
    let parseDate = formattedDate(year, month - 1, day);

    db.query(
        "SELECT * FROM SCHEDULE WHERE category_id = ? AND start_date <= ? AND ? <= end_date",
        [categoryID, parseDate, parseDate],
        (error, results) => {
            if (error) {
                console.error("Error retrieving schedule list: ", error);
                return;
            }
            console.log("parseDate >> " + parseDate);
            console.log(results);
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

// scheduleCheckBox
exports.scheduleCheckBox = function (req, res) {
    const scheduleID = req.body.scheduleID;
    const check = req.body.check;

    console.log("checkBox Test :" + scheduleID + check);
    db.query(
        "UPDATE schedule SET is_completed = ? WHERE schedule_id = ?",
        [check, scheduleID],
        (error, results) => {
            if (error) {
                console.error("schedule checkBox error!!" + ", " + error);
                return;
            }

            res.json({ message: "schedule checkBox call success" });
        }
    );
};

// recurringSchedule
exports.recurringSchedule = function (req, res) {
    const scheduleID = req.body.scheduleID;

    const sYear = req.body.startYear;
    const sMonth = req.body.startMonth;
    const sDay = req.body.startDay;

    const eYear = req.body.endYear;
    const eMonth = req.body.endMonth;
    const eDay = req.body.endDay;

    const startDate = formattedDate(sYear, sMonth - 1, sDay);
    const endDate = formattedDate(eYear, eMonth - 1, eDay);

    db.query(
        "UPDATE schedule SET start_date = ?, end_date = ? where schedule_id = ?",
        [startDate, endDate, scheduleID],
        (error, results) => {
            if (error) {
                console.error("recurring schedule error!!" + ", " + error);
                return;
            }

            res.json({ message: "recurring schedule call success" });
        }
    );
};

/**
 * 현재 날짜를 입력받아서, mysql에 삽입 및 비교가 가능한 date객체를 만들어서 반환해주는 함수
 * @param {string} year 입력할 날짜
 * @param {string} month 월
 * @param {string} day 일
 * @returns "YYYY-MM-DD" 형식으로 mysql의 포맷에 맞게 만들어진 date객체 반환
 */
function formattedDate(year, month, day) {
    const newDate = new Date(
        parseInt(year),
        parseInt(month),
        parseInt(day) + 1
    );

    const mysqlFormattedDate = newDate.toISOString().slice(0, 10);

    return mysqlFormattedDate;
}

exports.resetAccessLevel = function (req, res) {
    const scheduleID = req.body.scheduleID;
    const accessLevel = req.body.accessLevel;

    db.query(
        "UPDATE schedule SET visibility = ? where schedule_id = ?",
        [accessLevel, scheduleID],
        (error, results) => {
            if (error) {
                console.error("reset accesslevel error!!" + ", " + error);
                return;
            }

            res.json({ message: "reset accesslevel call success" });
        }
    );
};
