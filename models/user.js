const db = require("./db.js");

//생성자
const User = function(user){
    this.id = user.id;
    this.pw = user.pw;
};

//User 튜플 추가
User.create = (newUser, result) => {
    db.query("INSERT INTO account SET ?", newUser, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }

        console.log("Created New User: ", {id:res.insertId,})
    })
}