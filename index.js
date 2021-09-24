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
function insertDate () {
  for (let i = 0; i < currMonth_lastDate; i++) {
    td[i + currMonth_firstDay].innerHTML = i + 1;
  }
}

insertDate();


// 특정 날짜 클릭 시
function clickDate () {
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener('click', function clickDate (event) {
      if (td[i].innerHTML === '') {
        this.removeEventListener('click', clickDate);
      } else {
        date.innerHTML = td[i].innerHTML;
        day.innerHTML = new Date(currYear, currMonth, td[i].innerHTML).toDateString().split(' ')[0];

        for (let i = 0; i < td.length; i++) {
          td[i].classList.remove('clicked');
        }
        event.target.classList.add('clicked');
        }
      }
    );
  }
}

clickDate();


// fetch API
function fetchPage (fileName) {
  fetch(fileName).then(function(response){
    response.text().then(function(text){
      table.innerHTML = text;
      insertDate();
      clickDate();
    })
  });
}


// 좌우 화살표 클릭 시
function clickBtn (type, num) {
  type.addEventListener('click', function () {
    currMonth = currMonth + num;
    currMonth_firstDay = new Date(currYear, currMonth, 1).getDay();
    currMonth_lastDate = new Date(currYear, currMonth + 1, 0).getDate();

    if (currMonth_firstDay + currMonth_lastDate <= td.length) {
      table.innerHTML = '';
      fetchPage('table_5');
    } else {
      table.innerHTML = '';
      fetchPage('table_6')
    }

    month.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[1];
    year.innerHTML = new Date(currYear, currMonth).toDateString().split(' ')[3];
  });
}

clickBtn(next, 1);
clickBtn(prev, -1);
