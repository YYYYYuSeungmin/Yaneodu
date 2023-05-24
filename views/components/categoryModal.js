// 모달창 가져오기
const modal = document.getElementById("category-modal");

// 모달창 띄우는 버튼 가져오기
const modalBtn = document.getElementById("category-modal-btn");

// 닫기 버튼 가져오기 id=close
const closeBtn = document.getElementsByClassName("category-modal-close")[0];

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

// 등록 버튼 눌렀을 때 처리하는 함수
// const submitBtn = document.getElementById("submit-category");
// submitBtn.addEventListener("click", function () {
//     inputText.value = "";
//     modal.style.display = "none";
// });
