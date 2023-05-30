let accessLevel = 1;
//일정 추가 모달
function createAddScheduleModal(categoryInfo) {
    //모달 검은 영역 최상위 container
    const addScheduleModal = document.createElement("div");
    addScheduleModal.classList.add("modal");
    addScheduleModal.style.display = "block";

    //모달 컨텐트 영역
    const addScheduleModalContent = document.createElement("div");
    addScheduleModalContent.classList.add("modal-content");

    //모달창 닫기 버튼
    const addScheduleClose = document.createElement("span");
    addScheduleClose.id = "updateCategoryClose";
    addScheduleClose.classList.add("close");
    addScheduleClose.innerText = "x";
    addScheduleClose.addEventListener("click", function () {
        addScheduleModalContent.remove();
        addScheduleModal.remove();
    });

    // 컨텐트영역 바깥 클릭시 창 닫기
    window.addEventListener("click", function (event) {
        if (event.target == addScheduleModal) {
            addScheduleModalContent.remove();
            addScheduleModal.remove();
        }
    });

    //일정 추가하기 타이틀
    const addScheduleTitle = document.createElement("h1");
    addScheduleTitle.innerText = "일정 추가하기";

    //공개 범위를 지정하는 라디오 버튼
    const accessLevelDiv = document.createElement("div");
    accessLevelDiv.classList.add("radioContainer");

    const accessLevelPublic = document.createElement("input");
    accessLevelPublic.type = "radio";
    accessLevelPublic.name = "accessLevel";
    accessLevelPublic.value = "전체 공개";
    accessLevelPublic.checked = true; // 기본으로 선택되도록 설정

    const accessLevelPublicLabel = document.createElement("label");
    accessLevelPublicLabel.innerText = "전체 공개";
    accessLevelPublicLabel.prepend(accessLevelPublic);

    const accessLevelFollow = document.createElement("input");
    accessLevelFollow.type = "radio";
    accessLevelFollow.name = "accessLevel";
    accessLevelFollow.value = "팔로우 공개";

    const accessLevelFollowLabel = document.createElement("label");
    accessLevelFollowLabel.innerText = "팔로우 공개";
    accessLevelFollowLabel.prepend(accessLevelFollow);

    const accessLevelPrivate = document.createElement("input");
    accessLevelPrivate.type = "radio";
    accessLevelPrivate.name = "accessLevel";
    accessLevelPrivate.value = "나만 보기";

    const accessLevelPrivateLabel = document.createElement("label");
    accessLevelPrivateLabel.innerText = "나만 보기";
    accessLevelPrivateLabel.prepend(accessLevelPrivate);

    function handleRadioChange(event) {
        const selectedValue = event.target.value;

        if (selectedValue === "전체 공개") {
            accessLevel = 1;
        } else if (selectedValue === "팔로우 공개") {
            accessLevel = 2;
        } else if (selectedValue === "나만 보기") {
            accessLevel = 3;
        }
    }

    accessLevelPublic.addEventListener("change", handleRadioChange);
    accessLevelFollow.addEventListener("change", handleRadioChange);
    accessLevelPrivate.addEventListener("change", handleRadioChange);

    accessLevelDiv.appendChild(accessLevelPublicLabel);
    accessLevelDiv.appendChild(accessLevelFollowLabel);
    accessLevelDiv.appendChild(accessLevelPrivateLabel);

    addScheduleModalContent.appendChild(addScheduleClose);
    addScheduleModalContent.appendChild(addScheduleTitle);
    addScheduleModalContent.appendChild(accessLevelDiv);

    //일정은 기본적으로 매일 반복.
    //특별한 일정만 기간을 선택하는 옵션을 부여하는것이 나아보임

    //일정 내용을 작성하는 input태그 작성
    const inputScheduleTitle = document.createElement("input");
    inputScheduleTitle.type = "text";
    inputScheduleTitle.id = "inputScheduleTitle";
    inputScheduleTitle.placeholder = "등록할 일정 입력";
    inputScheduleTitle.classList.add("inputTitle");
    inputScheduleTitle.required = true;

    addScheduleModalContent.appendChild(inputScheduleTitle);

    //등록하기 버튼 작성
    const createScheduleBtn = document.createElement("button");
    createScheduleBtn.id = "submit-createSchedule";
    createScheduleBtn.classList.add("enterBtn");
    createScheduleBtn.innerText = "완료";

    createScheduleBtn.addEventListener("click", function () {
        // let accessLevel = 0; //1 = 전체, 2 = 팔로우, 3 = 나만
        let scheduleContent = inputScheduleTitle.value;
        let categoryID = categoryInfo.category_id;

        $.ajax({
            url: "/schedule/insertSchedule",
            method: "POST",
            dataType: "json",
            data: {
                categoryID: categoryID,
                scheduleContent: scheduleContent,
                accessLevel: accessLevel,
            },
        })
            .done(function () {
                location.reload();
            })
            .fail(function (xhr, status, errorThrown) {
                alert("ajax failed");
            });
    });

    addScheduleModalContent.appendChild(createScheduleBtn);

    addScheduleModal.appendChild(addScheduleModalContent);

    document.body.appendChild(addScheduleModal);
}
