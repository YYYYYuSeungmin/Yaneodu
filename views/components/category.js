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

        //테스트용 일정 3개 생성
        let p1 = document.createElement("p");
        p1.innerText = "테스트1";
        let p2 = document.createElement("p");
        p2.innerText = "테스트2";
        scheduleListDiv.appendChild(p1);
        scheduleListDiv.appendChild(p2);
        newDiv.appendChild(scheduleListDiv);

        categoryList.appendChild(newDiv);
    }
}

// // 부모 요소를 선택합니다.
// var parentElement = document.getElementById('parent');

// // 새로운 div 요소를 생성합니다.
// var newDiv = document.createElement('div');

// // div 요소에 속성이나 내용을 추가할 수 있습니다.
// newDiv.id = 'new-div';
// newDiv.textContent = '새로운 div 요소';

// // 부모 요소에 새로운 div 요소를 추가합니다.
// parentElement.appendChild(newDiv);
