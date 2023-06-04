window.onload = function () {
    buildCalendar();
}; // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(
        nowMonth.getMonth() + 1
    ); // 월 숫자 갱신

    // 이전 출력결과가 남아있는 경우 초기화
    while (tbody_Calendar.rows.length > 0) {
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

    // 이번달 1일의 요일만큼 (전 달에 속한 칸들밀기위함)
    for (let j = 0; j < firstDate.getDay(); j++) {
        let nowColumn = nowRow.insertCell(); // 열 추가
    }

    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복
    for (
        let nowDay = firstDate;
        nowDay <= lastDate;
        nowDay.setDate(nowDay.getDate() + 1)
    ) {
        let nowColumn = nowRow.insertCell(); // 새 열을 추가하고
        nowColumn.innerText = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력

        //일요일과 토요일 class추가
        if (nowDay.getDay() == 0) {
            nowColumn.classList.add("sunday");
        } else if (nowDay.getDay() == 6) {
            nowColumn.classList.add("saturday");
            nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가 (달력의 한 주는 일 ~ 토)
        }

        // 지난날인 경우 pastDay class추가
        if (nowDay < today) {
            nowColumn.classList.add("pastDay");
            nowColumn.onclick = function () {
                choiceDate(this);
            };
        } else if (
            nowDay.getFullYear() == today.getFullYear() &&
            nowDay.getMonth() == today.getMonth() &&
            nowDay.getDate() == today.getDate()
        ) {
            // 오늘인 경우
            nowColumn.className = "today";
            nowColumn.onclick = function () {
                choiceDate(this);
            };
            choiceDate(nowColumn);
        } else {
            // 미래인 경우
            nowColumn.classList.add("futureDay");
            nowColumn.onclick = function () {
                choiceDate(this);
            };
        }
        let selectDay = {
            year: nowMonth.getFullYear(),
            month: nowMonth.getMonth() + 1,
            day: nowColumn.innerText,
        };
    }
}

// 날짜 선택
function choiceDate(nowColumn) {
    let selectDay = {
        year: nowMonth.getFullYear(),
        month: nowMonth.getMonth() + 1,
        day: nowColumn.innerText,
    };

    if (document.getElementsByClassName("choiceDay")[0]) {
        // 기존에 선택한 날짜가 있으면
        document
            .getElementsByClassName("choiceDay")[0]
            .classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
    }
    nowColumn.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가

    showSelectDate(selectDay); //schedule 오늘의 일정 에 날짜 변경

    //기존에 생성한 categoryList 삭제해야함
    let categoryItems = document.querySelectorAll(".CategoryItem");
    if (categoryItems) {
        categoryItems.forEach((item) => {
            item.remove();
        });
    }

    getCategoryList(selectDay);
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(
        nowMonth.getFullYear(),
        nowMonth.getMonth() - 1,
        nowMonth.getDate()
    ); // 현재 달을 1 감소
    buildCalendar(); // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(
        nowMonth.getFullYear(),
        nowMonth.getMonth() + 1,
        nowMonth.getDate()
    ); // 현재 달을 1 증가
    buildCalendar(); // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙여주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

function showSelectDate(selectDay) {
    // 선택한 날짜에 해당하는 스케줄을 가져옵니다.
    const todayScheduleText = document.getElementById("today-schedule-title");
    todayScheduleText.innerHTML = "";

    // 선택한 날짜에 스케줄이 있으면 스케줄을 표시합니다.
    if (selectDay) {
        let text = "";
        text =
            userNick +
            "님의 " +
            selectDay.year +
            "년 " +
            selectDay.month +
            "월 " +
            selectDay.day +
            "일 일정!";

        todayScheduleText.innerText = text;

        //스케줄리스트 불러오기를 여기서 해야할듯?
    }
}
