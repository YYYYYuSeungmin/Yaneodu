// 공개 범위 재설정 모달
function resetAccessLevel(schedule) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "block";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.id = "updateCategoryClose";
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";

    closeBtn.addEventListener("click", function () {
        modalContent.remove();
        modal.remove();
    });

    //외부를 클릭하면 모달 창 닫기
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modalContent.remove();
            modal.remove();
        }
    });
    //공개범위 재설정 타이틀
    const title = document.createElement("h1");
    title.innerText = "공개 범위 재설정";

    //공개 범위를 지정하는 라디오 버튼
    const accessLevelDiv = document.createElement("div");
    accessLevelDiv.classList.add("radioContainer");

    const accessLevelPublic = document.createElement("input");
    accessLevelPublic.type = "radio";
    accessLevelPublic.name = "accessLevel";
    accessLevelPublic.value = "전체 공개";

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

    let accessLevel = schedule.visibility;

    switch (accessLevel) {
        case 1:
            accessLevelPublic.checked = true;
            break;
        case 2:
            accessLevelFollow.checked = true;
            break;
        case 3:
            accessLevelPrivate.checked = true;
            break;
    }

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

    const updateBtn = document.createElement("button");
    updateBtn.id = "submit-updateCategory";
    updateBtn.classList.add("enterBtn");
    updateBtn.innerText = "완료";

    updateBtn.addEventListener("click", function () {
        $.ajax({
            url: "/schedule/resetAccessLevel",
            method: "POST",
            dataType: "json",
            data: {
                scheduleID: schedule.schedule_id,
                accessLevel: accessLevel,
            },
        })
            .done(function () {
                location.reload();
            })
            .fail(function (xhr, status, errorThrown) {
                alert("reset accesslevel Fail");
            });
    });

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(accessLevelDiv);
    modalContent.appendChild(updateBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
