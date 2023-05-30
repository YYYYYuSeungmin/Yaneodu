// 모달창 가져오기
const modal = document.getElementById("category-modal");

// 모달창 띄우는 버튼 가져오기
const modalBtn = document.getElementById("category-modal-btn");

// 닫기 버튼 가져오기 id=close
const closeBtn = document.getElementById("categoryClose");

// inputText
const inputText = document.getElementById("category-title");

// 모달버튼 이벤트리스너
modalBtn.addEventListener("click", function () {
    modal.style.display = "block";
});

// 닫기버튼 이벤트리스너
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// 컨텐트영역 바깥 클릭시 창 닫기
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
