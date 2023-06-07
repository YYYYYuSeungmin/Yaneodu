const path = require("path");
const db = require("../models/db.js");

// /getCategoryList 로의 요청
// getFollowList
exports.getFollowList = function (req, res) {
    const userID = req.session.userId;

    //나 혼자라도 팔로우 하고 있는 사람 로드
    db.query(
        "SELECT id, nickname\
        FROM account\
        WHERE id != ?\
        AND id IN (\
        SELECT followee_id\
        FROM follow\
        WHERE follower_id = ?)",
        [userID, userID],
        (error, results) => {
            if (error) {
                console.error("loading FollowList error!!" + ", " + error);
                return;
            }

            // console.log(results);

            res.json(results);
        }
    );
};

// addFollow
exports.addFollow = function (req, res) {
    const followeeID = req.body.followee_id;
    const userID = req.session.userId;

    db.query(
        "INSERT INTO follow(follower_id, followee_id) VALUES(?,?)",
        [userID, followeeID],
        (error, results) => {
            if (error) {
                console.error("loading FollowList error!!" + ", " + error);
                return;
            }

            res.json(results);
        }
    );
};
