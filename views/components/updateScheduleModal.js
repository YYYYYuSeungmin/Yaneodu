//각 일정별로 수정 삭제 기한설정
function createUpdateScheduleModal(schedule) {
    //모달 검은 영역 최상위 container
    const updateScheduleModal = document.createElement("div");
    updateScheduleModal.classList.add("modal");
    updateScheduleModal.style.display = "block";

    //모달 컨텐트 영역
    const updateScheduleModalContent = document.createElement("div");
    updateScheduleModalContent.classList.add("modal-content");
    updateScheduleModalContent.classList.add("update-schedule");

    //모달창 닫기 버튼
    const updateScheduleClose = document.createElement("span");
    updateScheduleClose.id = "updateCategoryClose";
    updateScheduleClose.classList.add("close");
    updateScheduleClose.innerText = "x";
    updateScheduleClose.addEventListener("click", function () {
        updateScheduleModalContent.remove();
        updateScheduleModal.remove();
    });

    // 컨텐트영역 바깥 클릭시 창 닫기
    window.addEventListener("click", function (event) {
        if (event.target == updateScheduleModal) {
            updateScheduleModalContent.remove();
            updateScheduleModal.remove();
        }
    });

    // 수정하기 버튼 생성
    const updateScheduleModifyBtn = document.createElement("button");
    updateScheduleModifyBtn.innerText = "내용 변경하기";
    updateScheduleModifyBtn.classList.add("editBtn");
    updateScheduleModifyBtn.addEventListener("click", function (req, res) {
        updateScheduleModalContent.remove();
        updateScheduleModal.remove();

        createInputModifyScheduleModal(schedule);
    });

    // 삭제하기 버튼 생성
    const updateScheduleDeleteBtn = document.createElement("button");
    updateScheduleDeleteBtn.innerText = "삭제하기";
    updateScheduleDeleteBtn.classList.add("deleteBtn");
    updateScheduleDeleteBtn.addEventListener("click", function () {
        deleteSchedule(schedule);

        updateScheduleModalContent.remove();
        updateScheduleModal.remove();
    });

    // 반복 기간 설정 버튼
    const setRepeatBtn = document.createElement("button");
    setRepeatBtn.innerText = "반복 기간 설정하기";
    setRepeatBtn.classList.add("editBtn");

    updateScheduleModalContent.appendChild(updateScheduleModifyBtn);
    updateScheduleModalContent.appendChild(updateScheduleDeleteBtn);
    updateScheduleModalContent.appendChild(setRepeatBtn);

    updateScheduleModal.appendChild(updateScheduleModalContent);

    document.body.appendChild(updateScheduleModal);
}

//수정 내용 입력 모달
function createInputModifyScheduleModal(schedule) {
    const modifyModal = document.createElement("div");
    modifyModal.classList.add("modal");
    modifyModal.style.display = "block";

    const modifyModalContent = document.createElement("div");
    modifyModalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.id = "updateCategoryClose";
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";

    closeBtn.addEventListener("click", function () {
        modifyModalContent.remove();
        modifyModal.remove();
    });

    //외부를 클릭하면 모달 창 닫기
    modifyModal.addEventListener("click", function (event) {
        if (event.target === modifyModal) {
            modifyModalContent.remove();
            modifyModal.remove();
        }
    });

    const headTitle = document.createElement("h1");
    headTitle.innerText = "일정 변경하기";

    const inputNewTitle = document.createElement("input");
    inputNewTitle.type = "text";
    inputNewTitle.id = "inputNewTitle";
    inputNewTitle.placeholder = schedule.schedule;
    inputNewTitle.classList.add("inputTitle");
    inputNewTitle.required = true;

    const updateBtn = document.createElement("button");
    updateBtn.id = "submit-updateCategory";
    updateBtn.classList.add("enterBtn");
    updateBtn.innerText = "완료";

    updateBtn.addEventListener("click", function (req, res) {
        updateSchedule(schedule.schedule_id, inputNewTitle.value);
    });

    modifyModalContent.appendChild(closeBtn);
    modifyModalContent.appendChild(headTitle);
    modifyModalContent.appendChild(inputNewTitle);
    modifyModalContent.appendChild(updateBtn);

    modifyModal.appendChild(modifyModalContent);

    document.body.appendChild(modifyModal);
}

function updateSchedule(scheduleID, content) {
    $.ajax({
        url: "/schedule/updateSchedule",
        method: "POST",
        dataType: "json",
        data: { scheduleID: scheduleID, newContent: content },
    })
        .done(function () {
            location.reload();
        })
        .fail(function (xhr, status, errorThrown) {
            alert("update Schedule Fail");
        });
}

function deleteSchedule(schedule) {
    console.log("Call delete ");
    $.ajax({
        url: "/schedule/deleteSchedule",
        method: "POST",
        dataType: "json",
        data: { scheduleID: schedule.schedule_id },
    })
        .done(function () {
            location.reload();
        })
        .fail(function (xhr, status, errorThrown) {
            alert("delete Schedule Fail");
        });
}
