function createRecurringScheduleModal(schedule) {
    //모달 검은 영역 최상위 container
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "block";

    //모달 컨텐트 영역
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.classList.add("recurring-schedule");

    const titleDiv = document.createElement("div");

    //모달창 닫기 버튼
    const close = document.createElement("span");
    close.id = "updateCategoryClose";
    close.classList.add("close");
    close.innerText = "x";
    close.addEventListener("click", function () {
        modalContent.remove();
        modal.remove();
    });
    titleDiv.appendChild(close);

    // 컨텐트영역 바깥 클릭시 창 닫기
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modalContent.remove();
            modal.remove();
        }
    });

    const title = document.createElement("h1");
    title.innerText = "일정 기간 지정하기";

    titleDiv.appendChild(title);

    //modal 컨텐트영역
    const contentDiv = document.createElement("div");

    //날짜 선택 select가 들어갈 table 생성
    const tableDiv = document.createElement("div");
    const table = document.createElement("table");

    const firstRow = document.createElement("tr");

    const startDayTitle = document.createElement("td");
    startDayTitle.setAttribute("colspan", 3);
    startDayTitle.innerText = "시작 날짜";

    const endDayTitle = document.createElement("td");
    endDayTitle.setAttribute("colspan", 3);
    endDayTitle.innerText = "끝 날짜";

    firstRow.appendChild(startDayTitle);
    firstRow.appendChild(endDayTitle);

    //SelectBox가 들어가는 두번째 Row
    const secondRow = document.createElement("tr");

    //시작 날짜를 정하는 SelectBox 가져오기
    const [startYearSelect, startMonthSelect, startDaySelect] =
        getDaySelectBox();
    const startYearCell = document.createElement("td");
    startYearCell.appendChild(startYearSelect);

    const startMonthCell = document.createElement("td");
    startMonthCell.appendChild(startMonthSelect);

    const startDayCell = document.createElement("td");
    startDayCell.appendChild(startDaySelect);

    secondRow.appendChild(startYearCell);
    secondRow.appendChild(startMonthCell);
    secondRow.appendChild(startDayCell);

    //끝 날짜를 지정하는 SelectBox 가져오기
    const [endYearSelect, endMonthSelect, endDaySelect] = getDaySelectBox();

    const endYearCell = document.createElement("td");
    endYearCell.appendChild(endYearSelect);

    const endMonthCell = document.createElement("td");
    endMonthCell.appendChild(endMonthSelect);

    const endDayCell = document.createElement("td");
    endDayCell.appendChild(endDaySelect);

    secondRow.appendChild(endYearCell);
    secondRow.appendChild(endMonthCell);
    secondRow.appendChild(endDayCell);

    //만든 요소들을 테이블에 추가하기
    table.appendChild(firstRow);
    table.appendChild(secondRow);

    //테이블 DIV에 테이블 추가
    tableDiv.appendChild(table);

    //컨텐츠 영역에 테이블영역 추가
    contentDiv.appendChild(tableDiv);

    const enterBtn = document.createElement("button");
    enterBtn.innerText = "완료";
    enterBtn.classList.add("enterBtn");
    enterBtn.classList.add("rightBtn");
    contentDiv.appendChild(enterBtn);

    modalContent.appendChild(titleDiv);
    modalContent.appendChild(contentDiv);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function getDaySelectBox() {
    // 현재 날짜 정보 가져오기
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // 년도 콤보박스 생성
    const yearSelect = document.createElement("select");
    for (let year = 1950; year <= 2100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === currentYear) {
            option.selected = true; // 현재 년도 선택되도록 설정
        }
        yearSelect.appendChild(option);
    }

    // 월 콤보박스 생성
    const monthSelect = document.createElement("select");
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        if (month === currentMonth) {
            option.selected = true; // 현재 월 선택되도록 설정
        }
        monthSelect.appendChild(option);
    }

    // 일 콤보박스 생성
    const daySelect = document.createElement("select");
    function updateDayOptions() {
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);
        const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

        daySelect.innerHTML = ""; // 일 콤보박스 초기화

        for (let day = 1; day <= lastDay; day++) {
            const option = document.createElement("option");
            option.value = day;
            option.textContent = day;
            if (
                day === currentDay &&
                selectedMonth === currentMonth &&
                selectedYear === currentYear
            ) {
                option.selected = true; // 현재 일 선택되도록 설정
            }
            daySelect.appendChild(option);
        }
    }
    updateDayOptions();

    // 년도, 월 변경 시 일 콤보박스 업데이트
    yearSelect.addEventListener("change", updateDayOptions);
    monthSelect.addEventListener("change", updateDayOptions);

    return [yearSelect, monthSelect, daySelect];
}
