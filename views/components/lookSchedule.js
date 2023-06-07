// 둘러보기 페이지에 일정 그리는 함수
async function drawLookScheduleList() {
    //일정들이 들어갈 최상위 컨테이너
    const mainScreen = document.getElementById("mainScreen");

    //mainScreen안에 내용들이 붙여질 공간
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("CategoryList");
    contentDiv.classList.add("contentDiv");

    //mainSCreen 안에 타이틀 영역을 정함
    const mainTitleDiv = document.createElement("div");
    mainTitleDiv.classList.add("mainTitle");
    //타이틀
    const mainTitle = document.createElement("h1");
    let today = new Date();

    const timezoneOffset = today.getTimezoneOffset() * 60000; // 분을 밀리초로 변환
    today = new Date(today.getTime() - timezoneOffset); // UTC 시간으로 변환

    today = today.toISOString().slice(0, 10);

    mainTitle.innerText = `${today}일의 일정들`;

    mainTitleDiv.appendChild(mainTitle);

    //메인스크린을 TitleDiv와 contentDiv 두개의 영역으로 나눔
    mainScreen.appendChild(mainTitleDiv);
    mainScreen.appendChild(contentDiv);

    try {
        // 맞팔중인 리스트 가져오기
        const multualFollowList = await getMutualFollowList();
        const multualFollowListLength = Object.keys(multualFollowList).length;

        // 팔로워 수 만큼 반복
        for (let i = 0; i < multualFollowListLength; i++) {
            // 한 사람의 전체 일정이 들어가는 컨테이너
            const categoryItem = document.createElement("div");
            categoryItem.classList.add("CategoryItem");

            contentDiv.appendChild(categoryItem);

            // 누구의 일정인지 보여주는 부분
            const profileDiv = document.createElement("div");
            profileDiv.classList.add("schedule-owner-div");

            const profileIcon = document.createElement("button");
            profileIcon.classList.add("schedule-owner-icon");
            profileIcon.classList.add("follower");

            const profileName = document.createElement("h1");
            profileName.innerText = multualFollowList[i].nickname;
            profileDiv.appendChild(profileIcon);
            profileDiv.appendChild(profileName);

            categoryItem.appendChild(profileDiv);

            // 팔로워 마다 카테고리 리스트를 받아와야 함
            const followedUserCategoryList = await getFollowedCategories(
                multualFollowList[i].id
            );
            const followedUserCategoryListLength = Object.keys(
                followedUserCategoryList
            ).length;

            if (followedUserCategoryListLength === 0) {
                categoryItem.remove();
                continue;
            }

            // 팔로워 한명의 카테고리 리스트 만큼 반복
            for (let j = 0; j < followedUserCategoryListLength; j++) {
                // 하나의 카테고리 영역
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("categoryTitleDiv");

                //카테고리 영역을 contentList에 삽입
                categoryItem.appendChild(categoryDiv);

                //카테고리 타이틀 영역
                const categoryTitleDiv = document.createElement("div");
                categoryTitleDiv.classList.add("categoryTitleDiv");

                //카테고리 이름 h1
                const categoryTitle = document.createElement("p");
                categoryTitle.classList.add("title");
                categoryTitle.innerText = followedUserCategoryList[j].category;

                categoryTitleDiv.appendChild(categoryTitle);
                categoryDiv.appendChild(categoryTitleDiv);

                // 하나의 카테고리에 일정 리스트가 들어가는 영역
                const scheduleDiv = document.createElement("div");
                scheduleDiv.classList.add("scheduleListDiv");

                categoryItem.appendChild(scheduleDiv);

                // 스케줄 리스트를 불러와야 함 맞팔 대상이라 accessLevel을 2로 설정
                const scheduleList = await getScheduleList(
                    followedUserCategoryList[j].category_id,
                    2
                );

                const scheduleListLength = Object.keys(scheduleList).length;

                if (scheduleListLength === 0) {
                    categoryDiv.remove();
                    continue;
                }

                // 스케줄을 그리기
                for (let k = 0; k < scheduleListLength; k++) {
                    const scheduleBox = document.createElement("div");
                    scheduleBox.classList.add("scheduleBox");

                    //체크박스 및 일정 명이 들어갈 영역
                    let boxDiv = document.createElement("div");
                    boxDiv.classList.add("left-align");
                    boxDiv.classList.add("boxDiv");

                    //체크박스 만들기
                    let checkBox = document.createElement("input");
                    checkBox.type = "checkbox";
                    checkBox.classList.add("checkBox");
                    checkBox.checked = true;
                    checkBox.disabled = true;

                    //일정 이름을 가진 p태그
                    let schedule = document.createElement("p");
                    schedule.innerText = scheduleList[k].schedule;

                    boxDiv.appendChild(checkBox);
                    boxDiv.appendChild(schedule);

                    scheduleBox.appendChild(boxDiv);

                    scheduleDiv.appendChild(scheduleBox);
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }

    // 맞팔이 아닌 일반 유저 ID리스트
    const publicScheduleOwnerList = await getNonMutualFollowList();
    const publicScheduleOwnerListLength = Object.keys(
        publicScheduleOwnerList
    ).length;

    //유저 ID리스트 수만큼 반복
    for (let i = 0; i < publicScheduleOwnerListLength; i++) {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("CategoryItem");

        contentDiv.appendChild(categoryItem);

        // 누구의 일정인지 보여주는 부분
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("schedule-owner-div");

        const profileIcon = document.createElement("button");
        profileIcon.classList.add("schedule-owner-icon");

        const profileName = document.createElement("h1");

        const userNick = publicScheduleOwnerList[i].nickname;

        profileName.innerText = userNick;
        profileDiv.appendChild(profileIcon);
        profileDiv.appendChild(profileName);

        categoryItem.appendChild(profileDiv);

        // 카테고리 리스트 불러오기
        const publicUserCategoryList = await getFollowedCategories(
            publicScheduleOwnerList[i].id
        );
        const publicUserCategoryListLength = Object.keys(
            publicUserCategoryList
        ).length;

        if (publicScheduleOwnerListLength === 0) {
            categoryItem.remove();
        }

        // 한명의 카테고리 리스트 만큼 반복
        for (let j = 0; j < publicUserCategoryListLength; j++) {
            // 하나의 카테고리 영역
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("categoryTitleDiv");

            //카테고리 영역을 contentList에 삽입
            categoryItem.appendChild(categoryDiv);

            //카테고리 타이틀 영역
            const categoryTitleDiv = document.createElement("div");
            categoryTitleDiv.classList.add("categoryTitleDiv");

            //카테고리 이름 h1
            const categoryTitle = document.createElement("p");
            categoryTitle.classList.add("title");
            categoryTitle.innerText = publicUserCategoryList[j].category;

            categoryTitleDiv.appendChild(categoryTitle);
            categoryDiv.appendChild(categoryTitleDiv);

            // 하나의 카테고리에 일정 리스트가 들어가는 영역
            const scheduleDiv = document.createElement("div");
            scheduleDiv.classList.add("scheduleListDiv");

            categoryItem.appendChild(scheduleDiv);

            const scheduleList = await getScheduleList(
                publicUserCategoryList[j].category_id,
                1
            );

            //만약 카테고리에 아무 일정이 없다면 해당 카테고리를 제거한다.
            const scheduleListLength = Object.keys(scheduleList).length;

            if (scheduleListLength === 0) {
                categoryDiv.remove();
                continue;
            }

            // 스케줄을 그리기
            for (let k = 0; k < scheduleListLength; k++) {
                const scheduleBox = document.createElement("div");
                scheduleBox.classList.add("scheduleBox");

                //체크박스 및 일정 명이 들어갈 영역
                let boxDiv = document.createElement("div");
                boxDiv.classList.add("left-align");
                boxDiv.classList.add("boxDiv");

                //체크박스 만들기
                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.classList.add("checkBox");
                checkBox.checked = true;
                checkBox.disabled = true;

                //일정 이름을 가진 p태그
                let schedule = document.createElement("p");
                schedule.innerText = scheduleList[k].schedule;

                boxDiv.appendChild(checkBox);
                boxDiv.appendChild(schedule);

                scheduleBox.appendChild(boxDiv);

                scheduleDiv.appendChild(scheduleBox);
            }
        }
    }
}

// 맞팔이 아닌 모든 상대ID 가져오기
async function getNonMutualFollowList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/lookSchedule/getNonMutualFollowList",
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

// 유저의 서로 팔로우중인 리스트 가져오기
async function getMutualFollowList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/lookSchedule/getMutualFollowList",
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

// 맞팔중인 유저의 아이디로 해당 유저의 카테고리 리스트 가져오기
async function getFollowedCategories(followedUserID) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/lookSchedule/getFollowedCategories",
            method: "POST",
            dataType: "json",
            data: { followedUserID: followedUserID },
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}

// 카테고리 id를 가지고 해당 카테고리의 일정 가져오기 (level을 넘겨주어 맞팔상태인지 아닌지 판별)
async function getScheduleList(categoryID, level) {
    // console.log("getSchedule >> " + categoryID + ", 레벨 : " + level);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/lookSchedule/getScheduleList",
            method: "POST",
            dataType: "json",
            data: { categoryID: categoryID, level: level },
        })
            .done(function (data) {
                // if (data.length) {
                //     console.log("resolve date >> " + data[0].schedule);
                // }

                resolve(data);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}
