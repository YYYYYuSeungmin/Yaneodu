const f = require("session-file-store");
const db = require("../models/db.js");

// getMutualFollowList
exports.getMutualFollowList = function (req, res) {
    const userID = req.session.userId;

    // console.log("userID >> " + userID);
    db.query(
        "SELECT id, nickname " +
            "FROM account " +
            "WHERE id != ? " +
            "AND id IN (" +
            "SELECT followee_id " +
            "FROM follow " +
            "WHERE follower_id = ?) " +
            "AND id IN (" +
            "SELECT follower_id " +
            "FROM follow " +
            "WHERE followee_id = ?)",
        [userID, userID, userID],
        (error, results) => {
            if (error) {
                console.error(
                    "loading mutualFollowList error!!" + ", " + error
                );
                return;
            }

            res.json(results);
        }
    );
};

// getFollowedCategories
exports.getFollowedCategories = function (req, res) {
    const followedUserID = req.body.followedUserID;

    db.query(
        "SELECT * FROM category WHERE id = ?",
        [followedUserID],
        (error, results) => {
            if (error) {
                console.error(
                    "loading followed Categories error!!" + ", " + error
                );
                return;
            }

            // console.log(results);

            res.json(results);
        }
    );
};

// getScheduleList
exports.getScheduleList = function (req, res) {
    const categoryID = req.body.categoryID;
    const accessLevel = req.body.level;

    let today = new Date();
    today = formattedDate(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    //오늘 날짜로 완료된 일정만 불러와야 함
    db.query(
        "SELECT * \
        FROM schedule as S, schedule_completed as SC \
        WHERE S.category_id = ? AND S.visibility <= ? \
        AND SC.schedule_id = S.schedule_id AND SC.date = ? AND SC.is_completed = 1",
        [categoryID, accessLevel, today],
        (error, results) => {
            if (error) {
                console.error(
                    "loading followed ScheduleList error!!" + ", " + error
                );
                return;
            }

            res.json(results);
        }
    );
};

// getNonMutualFollowList
exports.getNonMutualFollowList = function (req, res) {
    const userID = req.session.userId;

    db.query(
        `
        SELECT id, nickname
        FROM account
        WHERE id != ?
        AND (
            id NOT IN (
                SELECT followee_id
                FROM follow
                WHERE follower_id = ?
            )
            OR
            id NOT IN (
                SELECT follower_id
                FROM follow
                WHERE followee_id = ?
            )
        )`,
        [userID, userID, userID],
        (error, results) => {
            if (error) {
                console.error(
                    "get nonMutualFollowList List error!!" + ", " + error
                );
                return;
            }

            res.json(results);
        }
    );
};

// getPublicScheduleOwner()
exports.getPublicScheduleOwner = function (req, res) {
    let today = new Date(Date.now());
    today = formattedDate(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    db.query(
        "SELECT distinct(A.id), A.nickname \
        FROM schedule as S, category as C, \
        schedule_completed as SC, account as A\
        WHERE SC.is_completed = 1 AND SC.schedule_id = S.schedule_id AND S.visibility = 1 AND S.category_id = C.category_id AND C.id = A.id AND SC.date = ?",
        [today],
        (error, results) => {
            if (error) {
                console.error(
                    "get public scheduleOwner List error!!" + ", " + error
                );
                return;
            }

            res.json(results);
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
