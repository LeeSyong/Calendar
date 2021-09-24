// html 요소들을 변수에 할당
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

const table = document.querySelector('table');
const td = document.getElementsByTagName('td');

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');





// 날짜 관련 전역 변수들
const today = new Date();
const todayArray = today.toDateString().split(' ');

const currYear = today.getFullYear();
let currMonth = today.getMonth();

let currMonth_firstDay = new Date(currYear, currMonth, 1).getDay();
let currMonth_lastDate = new Date(currYear, currMonth + 1, 0).getDate();





// 오늘의 현재 요일, 날짜, 월, 연도 표기
day.innerHTML = todayArray[0];
date.innerHTML = todayArray[2];
month.innerHTML = todayArray[1];
year.innerHTML = todayArray[3];





// 현재 월의 마지막 날짜까지 달력에 표기하기
for (let i = 0; i < currMonth_lastDate; i++) {
  td[i + currMonth_firstDay].innerHTML = i + 1;
}

// 특정 날짜를 클릭 했을때, 상단의 요일 & 날짜 반영하기
// 특정 날짜를 클릭 했을때, 날짜(숫자) 색깔 바꾸기
for (let i = 0; i < td.length; i++) {
  td[i].addEventListener('click', function clickDate (event) {
    if (td[i].innerHTML === '') {
      this.removeEventListener('click', clickDate);
    } else {
      // 상단의 요일 & 날짜 반영하기
      date.innerHTML = td[i].innerHTML;
      day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];

      // 날짜(숫자) 색깔 바꾸기
      for (let i = 0; i < td.length; i++) {
        td[i].classList.remove('clicked');
      }
      event.target.classList.add('clicked');
      }
    }
  );
}





// 📌 우측 화살표를 클릭 했을때, 상단의 월 & 연도 변경 / 날짜(숫자) 기입

next.addEventListener('click', function () {
  // 필요한 테이블이 5줄이든 6줄이든, 공통 전제
  currMonth = currMonth + 1;
  currMonth_firstDay = new Date(currYear, currMonth, 1).getDay();
  currMonth_lastDate = new Date(currYear, currMonth + 1, 0).getDate();

  // 새로 테이블 만듦 (if... 5줄 / else... 6줄)
  if (currMonth_firstDay + currMonth_lastDate <= td.length) { // 5줄로 커버된다면...
    // 기존 테이블 지운 후
    table.innerHTML = '';
    // fetch API 이용해
    fetch('table_5').then(function(response){
      response.text().then(function(text){
        // 새로 5줄 테이블 만들고
        table.innerHTML = text;
        // 날짜(숫자) 기입
        for (let i = 0; i < currMonth_lastDate; i++) {
          td[i + currMonth_firstDay].innerHTML = i + 1;
        }
        // 특정 날짜(td) 클릭 했을때, 상단의 요일 & 날짜 반영하기 + 날짜(숫자) 색깔 바꾸기
        for (let i = 0; i < td.length; i++) {
          td[i].addEventListener('click', function clickDate (event) {
            if (td[i].innerHTML === '') {
              // td 클릭 했을 때, 안에 날짜(숫자) 없으면 아무런 변화도 일어나지 않도록
              this.removeEventListener('click', clickDate);
            } else {
              // 상단의 요일 & 날짜 반영하기
              date.innerHTML = td[i].innerHTML;
              day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];
              // 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].classList.remove('clicked');
              }
              event.target.classList.add('clicked');
              }
            }
          );
        }
      })
    });
  } else { // 6줄이 필요하다면...
    // 기존 테이블 지운 후
    table.innerHTML = '';
    // fetch API 이용해
    fetch('table_6').then(function(response){
      response.text().then(function(text){
        // 새로 6줄 테이블 만들고
        table.innerHTML = text;
        // 날짜(숫자) 기입
        for (let i = 0; i < currMonth_lastDate; i++) {
          td[i + currMonth_firstDay].innerHTML = i + 1;
        }
        // 특정 날짜(td) 클릭 했을때, 상단의 요일 & 날짜 반영하기 + 날짜(숫자) 색깔 바꾸기
        for (let i = 0; i < td.length; i++) {
          td[i].addEventListener('click', function clickDate (event) {
            if (td[i].innerHTML === '') {
              // td 클릭 했을 때, 안에 날짜(숫자) 없으면 아무런 변화도 일어나지 않도록
              this.removeEventListener('click', clickDate);
            } else {
              // 상단의 요일 & 날짜 반영하기
              date.innerHTML = td[i].innerHTML;
              day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];
              // 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].classList.remove('clicked');
              }
              event.target.classList.add('clicked');
              }
            }
          );
        }
      })
    });
  }

  // 상단의 월 & 연도 변경
  month.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[1];
  year.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[3];
});





// 📌 좌측 화살표를 클릭 했을때, 상단의 월 & 연도 변경 / 날짜(숫자) 기입

prev.addEventListener('click', function () {
  // 필요한 테이블이 5줄이든 6줄이든, 공통 전제
  currMonth = currMonth - 1;
  currMonth_firstDay = new Date(currYear, currMonth, 1).getDay();
  currMonth_lastDate = new Date(currYear, currMonth + 1, 0).getDate();

  // 새로 테이블 만듦 (if... 5줄 / else... 6줄)
  if (currMonth_firstDay + currMonth_lastDate <= td.length) { // 5줄로 커버된다면...
    // 기존 테이블 지운 후
    table.innerHTML = '';
    // fetch API 이용해
    fetch('table_5').then(function(response){
      response.text().then(function(text){
        // 새로 5줄 테이블 만들고
        table.innerHTML = text;
        // 날짜(숫자) 기입
        for (let i = 0; i < currMonth_lastDate; i++) {
          td[i + currMonth_firstDay].innerHTML = i + 1;
        }
        // 특정 날짜(td) 클릭 했을때, 상단의 요일 & 날짜 반영하기 + 날짜(숫자) 색깔 바꾸기
        for (let i = 0; i < td.length; i++) {
          td[i].addEventListener('click', function clickDate (event) {
            if (td[i].innerHTML === '') {
              // td 클릭 했을 때, 안에 날짜(숫자) 없으면 아무런 변화도 일어나지 않도록
              this.removeEventListener('click', clickDate);
            } else {
              // 상단의 요일 & 날짜 반영하기
              date.innerHTML = td[i].innerHTML;
              day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];
              // 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].classList.remove('clicked');
              }
              event.target.classList.add('clicked');
              }
            }
          );
        }
      })
    });
  } else { // 6줄이 필요하다면...
    // 기존 테이블 지운 후
    table.innerHTML = '';
    // fetch API 이용해
    fetch('table_6').then(function(response){
      response.text().then(function(text){
        // 새로 6줄 테이블 만들고
        table.innerHTML = text;
        // 날짜(숫자) 기입
        for (let i = 0; i < currMonth_lastDate; i++) {
          td[i + currMonth_firstDay].innerHTML = i + 1;
        }
        // 특정 날짜(td) 클릭 했을때, 상단의 요일 & 날짜 반영하기 + 날짜(숫자) 색깔 바꾸기
        for (let i = 0; i < td.length; i++) {
          td[i].addEventListener('click', function clickDate (event) {
            if (td[i].innerHTML === '') {
              // td 클릭 했을 때, 안에 날짜(숫자) 없으면 아무런 변화도 일어나지 않도록
              this.removeEventListener('click', clickDate);
            } else {
              // 상단의 요일 & 날짜 반영하기
              date.innerHTML = td[i].innerHTML;
              day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];
              // 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].classList.remove('clicked');
              }
              event.target.classList.add('clicked');
              }
            }
          );
        }
      })
    });
  }

  // 상단의 월 & 연도 변경
  month.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[1];
  year.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[3];
});
