//getCategoryList로의 AJAX 요청. GET방식으로 요청해서 데이터를 받아온다.
$.ajax({
    url: "/schedule/getCategoryList",
    method: "POST",
    dataType: "json",
})
    .done(function (data) {
        drawCategory(data);
    })
    .fail(function (xhr, status, errorThrown) {
        alert("ajax failed");
    });

function drawCategory(data) {
    const categoryList = document.getElementById("category-list"); //부모 컨테이너 가져오기
    const dataLength = Object.keys(data).length;

    for (let i = 0; i < dataLength; i++) {
        //div 새로 생성 (하나의 카테고리를 담는 컨테이너)
        let newDiv = document.createElement("div");
        //id 및 class 지정
        newDiv.id = "CategoryItem";
        newDiv.classList.add("CategoryItem");

        //카테고리 이름을 담는 컨테이너
        let titleDiv = document.createElement("div");
        titleDiv.id = "categoryTitleDiv";
        titleDiv.classList.add("categoryTitleDiv");

        //카테고리 이름 표시하는 p태그
        let Title = document.createElement("p");
        Title.innerText = data[i].category;
        titleDiv.appendChild(Title);
        newDiv.appendChild(titleDiv);

        //카테고리 속 일정리스트를 담는 컨테이너
        let scheduleListDiv = document.createElement("div");
        scheduleListDiv.id = "scheduleListDiv";
        scheduleListDiv.classList.add("scheduleListDiv");

        //일정 가져오기
        getScheduleList(data[i].category_id, function (scheduleList) {
            if (scheduleList) {
                let scheduleListLength = Object.keys(scheduleList).length;

                //각 카테고리별로 일정의 개수만큼 일정만들기
                for (let j = 0; j < scheduleListLength; j++) {
                    //체크박스, 일정이름, 일정수정 3가지 요소를 정렬할 div
                    //scheduleBox 안에 3개의 div영역이 들어감.
                    let scheduleBox = document.createElement("div");
                    scheduleBox.classList.add("scheduleBox");

                    //체크박스
                    let boxDiv = document.createElement("div");
                    boxDiv.classList.add("left-align");
                    boxDiv.classList.add("boxDiv");

                    let checkBox = document.createElement("input");
                    checkBox.type = "checkbox";
                    checkBox.classList.add("checkBox");
                    //체크박스 이벤트리스너 지정
                    checkBox.addEventListener("click", function () {
                        let flag = false;
                        let scheduleID = scheduleList[j].schedule_id;
                        if (checkBox.checked) {
                            flag = true;
                        }
                        //해당 경로로 체크여부 데이터 전송 따로 응답받지는 않음
                        $.ajax({
                            url: "/schedule/scheduleCheckBox",
                            method: "POST",
                            dataType: "json",
                            data: { scheduleID: scheduleID, check: flag },
                        });
                    });
                    boxDiv.appendChild(checkBox);
                    //일정 이름을 가진 p태그
                    let schedule = document.createElement("p");
                    schedule.innerText = scheduleList[j].schedule;

                    boxDiv.appendChild(schedule);

                    //일정 관리 버튼
                    let controllButtonDiv = document.createElement("div");
                    controllButtonDiv.classList.add("right-align");
                    controllButtonDiv.classList.add("ctrlboxDiv");

                    let scheduleControllButton =
                        document.createElement("button");
                    scheduleControllButton.innerText = "관리";
                    scheduleControllButton.classList.add("scheduleCtrlBtn");
                    controllButtonDiv.appendChild(scheduleControllButton);

                    //스케쥴박스에 체크박스, 일정이름, 일정관리 버튼을 포함하는 DIV를 넣는다
                    scheduleBox.appendChild(boxDiv);
                    scheduleBox.appendChild(controllButtonDiv);

                    scheduleListDiv.appendChild(scheduleBox);
                }
            }
        });
        //일정 붙이기
        newDiv.appendChild(scheduleListDiv);

        //카테고리에 일정 추가 혹은 카테고리 이름 변경 혹 카테고리 삭제 등 버튼을 만들어야 함
        // let;

        categoryList.appendChild(newDiv);
    }
}

function getScheduleList(categoryID, callback) {
    //getScheduleList로의 AJAX 요청. GET방식으로 요청해서 데이터를 받아온다.
    $.ajax({
        url: "/schedule/getScheduleList",
        method: "POST",
        dataType: "json",
        data: { categoryID: categoryID },
    })
        .done(function (data) {
            callback(data);
        })
        .fail(function (xhr, status, errorThrown) {
            alert("ajax failed");
        });
}
