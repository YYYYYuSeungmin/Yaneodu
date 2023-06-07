window.onload = function () {
    const addBtn = document.getElementById("addFollowBtn");
    addBtn.addEventListener("click", function (req, res) {
        createAddFollowModal();
    });
};

function createAddFollowModal() {
    const addFollowModal = document.createElement("div");
    addFollowModal.classList.add("modal");
    addFollowModal.style.display = "block";

    //모달 컨텐트 영역
    const addFollowModalContent = document.createElement("div");
    addFollowModalContent.classList.add("modal-content");
    addFollowModalContent.classList.add("update-schedule");

    //모달창 닫기 버튼
    const closeBtn = document.createElement("span");
    closeBtn.id = "updateCategoryClose";
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", function () {
        addFollowModalContent.remove();
        addFollowModal.remove();
    });

    addFollowModalContent.appendChild(closeBtn);
    // 컨텐트영역 바깥 클릭시 창 닫기
    window.addEventListener("click", function (event) {
        if (event.target == addFollowModal) {
            addFollowModalContent.remove();
            addFollowModal.remove();
        }
    });

    const title = document.createElement("h1");
    title.innerText = "팔로우 추가";

    addFollowModalContent.appendChild(title);

    const inputNewFollowee = document.createElement("input");
    inputNewFollowee.type = "text";
    inputNewFollowee.id = "inputNewFollowee";
    inputNewFollowee.placeholder = "추가로 등록할 ID 입력";
    inputNewFollowee.classList.add("inputTitle");
    inputNewFollowee.required = true;

    const addBtn = document.createElement("button");
    addBtn.classList.add("enterBtn");
    addBtn.innerText = "추가";
    addBtn.addEventListener("click", function (req, res) {
        addFollow(inputNewFollowee.value);
    });

    addFollowModalContent.appendChild(inputNewFollowee);
    addFollowModalContent.appendChild(addBtn);

    addFollowModal.appendChild(addFollowModalContent);

    document.body.appendChild(addFollowModal);
}

function addFollow(followee_id) {
    $.ajax({
        url: "/follow/addFollow",
        method: "POST",
        dataType: "json",
        data: { followee_id: followee_id },
    })
        .done(function (data) {
            location.reload();
        })
        .fail(function (error) {
            reject(error);
        });
}
