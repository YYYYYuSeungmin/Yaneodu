//각 일정별로 수정 삭제 기한설정
function createUpdateScheduleModal() {
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

    // 삭제하기 버튼 생성
    const updateScheduleDeleteBtn = document.createElement("button");
    updateScheduleDeleteBtn.innerText = "삭제하기";
    updateScheduleDeleteBtn.classList.add("deleteBtn");

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
