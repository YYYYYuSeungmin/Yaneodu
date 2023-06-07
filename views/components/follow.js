//resetAccessLevelModal.js 로드
const addFollowModalScript = document.createElement("script");
addFollowModalScript.src = "/views/components/addFollowModal.js";
document.head.appendChild(addFollowModalScript);

async function drawFollowList() {
    const container = document.getElementById("followList");

    const followList = await getFollowList();
    const followListLength = Object.keys(followList).length;

    //팔로우 중인 사람의 수 만큼 반복
    for (let i = 0; i < followListLength; i++) {
        console.log(followList[i].id + " : " + followList[i].nickname);
        //팔로우중인 사람 한 명을 넣을 컨테이너
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("followBox");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("followInfo");

        const followeeIcon = document.createElement("button");
        followeeIcon.classList.add("followeeIcon");

        const followeeNick = document.createElement("h1");
        followeeNick.innerText = followList[i].nickname;

        leftDiv.appendChild(followeeIcon);
        leftDiv.appendChild(followeeNick);

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("followDel");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("followDelBtn");
        deleteBtn.id = followList[i].id;
        deleteBtn.innerText = "삭제";
        deleteBtn.addEventListener(
            "click",
            deleteBtnClickListener(followList[i].id)
        );

        rightDiv.appendChild(deleteBtn);

        contentDiv.appendChild(leftDiv);
        contentDiv.appendChild(rightDiv);

        container.appendChild(contentDiv);
    }
}

async function getFollowList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/follow/getFollowList",
            method: "GET",
        })
            .done(function (data) {
                // console.log(data);
                resolve(data);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}

function deleteBtnClickListener(followee_id) {
    return function (event) {
        unFollow(followee_id);
    };
}

function unFollow(followee_id) {
    $.ajax({
        url: "/follow/unFollow",
        method: "POST",
        dataType: "json",
        data: { followee_id: followee_id },
    })
        .done(function (data) {
            location.reload();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Un follow Fail:", errorThrown);
        });
}
