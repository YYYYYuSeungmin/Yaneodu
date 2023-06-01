//schedule.js 로드
const scheduleScript = document.createElement("script");
scheduleScript.src = "/views/components/schedule.js";
document.head.appendChild(scheduleScript);
//updateScheduleModal.js 로드
const updateScheduleModalScript = document.createElement("script");
updateScheduleModalScript.src = "/views/components/updateScheduleModal.js";
document.head.appendChild(updateScheduleModalScript);

//getCategoryList로의 AJAX 요청. GET방식으로 요청해서 데이터를 받아온다.
function getCategoryList() {
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
}

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

        //카테고리 수정 버튼
        let categoryCtrlBtn = document.createElement("button");
        categoryCtrlBtn.classList.add("Btn");
        categoryCtrlBtn.classList.add("ctgBtn");
        categoryCtrlBtn.innerText = "...";
        categoryCtrlBtn.addEventListener("click", function () {
            // 수정 및 삭제 옵션을 표시하는 창을 생성
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.style.display = "block";

            const optionsModal = document.createElement("div");
            optionsModal.classList.add("modal-content");

            // 수정하기 버튼 생성
            const editButton = document.createElement("button");
            editButton.innerText = "이름 변경하기";
            editButton.classList.add("editBtn");

            // 삭제하기 버튼 생성
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "삭제하기";
            deleteButton.classList.add("deleteBtn");

            // 수정하기 버튼 클릭 시 동작할 로직
            editButton.addEventListener("click", function () {
                optionsModal.remove();
                modal.remove();

                updateCategoryTitle(data[i].category_id);
            });

            // 삭제하기 버튼 클릭 시 동작할 로직
            deleteButton.addEventListener("click", function () {
                //deleteCategory
                $.ajax({
                    url: "/schedule/deleteCategory",
                    method: "POST",
                    dataType: "json",
                    data: {
                        categoryID: data[i].category_id,
                        userID: data[i].id,
                    },
                })
                    .done(function (data) {
                        location.reload();
                    })
                    .fail(function (xhr, status, errorThrown) {
                        alert("ajax failed");
                    });
            });

            // 생성한 버튼들을 optionsModal에 추가
            optionsModal.appendChild(editButton);
            optionsModal.appendChild(deleteButton);

            modal.appendChild(optionsModal);
            // optionsModal을 body에 추가하여 표시
            document.body.appendChild(modal);

            // optionsModal 외부를 클릭하면 모달 창 닫기
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    optionsModal.remove();
                    modal.remove();
                }
            });
        });

        titleDiv.appendChild(categoryCtrlBtn);

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
                    if (scheduleList[j].is_completed) {
                        checkBox.checked = true;
                    }
                    //체크박스 이벤트리스너 지정
                    checkBox.addEventListener("click", function () {
                        let flag = 0; // 0:false, 1:true
                        let scheduleID = scheduleList[j].schedule_id;
                        if (checkBox.checked) {
                            flag = 1;
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
                    scheduleControllButton.classList.add("Btn");
                    scheduleControllButton.addEventListener(
                        "click",
                        function () {
                            createUpdateScheduleModal(scheduleList[j]);
                        }
                    );
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

        //일정 추가 버튼 만들기
        let addScheduleBtn = document.createElement("button");
        addScheduleBtn.id = "add-schedule-button";
        addScheduleBtn.classList.add("Btn");
        addScheduleBtn.classList.add("addScheduleBtn");
        addScheduleBtn.innerText = "+";

        addScheduleBtn.addEventListener("click", function () {
            createAddScheduleModal(data[i]);
        });

        newDiv.appendChild(addScheduleBtn);

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
            alert("get Schedule List Fail");
        });
}

//카테고리 이름 수정 모달
function updateCategoryTitle(categoryID) {
    const updateModal = document.createElement("div");
    updateModal.classList.add("modal");
    updateModal.style.display = "block";

    const updateModalContent = document.createElement("div");
    updateModalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.id = "updateCategoryClose";
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";

    closeBtn.addEventListener("click", function () {
        updateModalContent.remove();
        updateModal.remove();
    });

    const headTitle = document.createElement("h1");
    headTitle.innerText = "카테고리 수정";

    const inputNewTitle = document.createElement("input");
    inputNewTitle.type = "text";
    inputNewTitle.id = "inputNewTitle";
    inputNewTitle.placeholder = "수정할 카테고리 이름";
    inputNewTitle.classList.add("inputTitle");
    inputNewTitle.required = true;

    const updateBtn = document.createElement("button");
    updateBtn.id = "submit-updateCategory";
    updateBtn.classList.add("enterBtn");
    updateBtn.innerText = "완료";

    updateBtn.addEventListener("click", function (req, res) {
        $.ajax({
            url: "/schedule/updateCategory",
            method: "POST",
            dataType: "json",
            data: {
                categoryID: categoryID,
                updateTitle: inputNewTitle.value,
            },
        })
            .done(function (data) {
                location.reload();
            })
            .fail(function (xhr, status, errorThrown) {
                alert("ajax failed");
            });
    });

    updateModalContent.appendChild(closeBtn);
    updateModalContent.appendChild(headTitle);
    updateModalContent.appendChild(inputNewTitle);
    updateModalContent.appendChild(updateBtn);

    updateModal.appendChild(updateModalContent);

    document.body.appendChild(updateModal);

    //외부를 클릭하면 모달 창 닫기
    updateModal.addEventListener("click", function (event) {
        if (event.target === updateModal) {
            updateModalContent.remove();
            updateModal.remove();
        }
    });
}
