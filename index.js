// 0. 테이블부터 만들고 시작

function makeTable (name) {
  fetch(name).then(function(response) {
    response.text().then(function(text) {
      const blank = document.querySelector('.blank');
      blank.innerHTML = text;

      for (let i = 0; i < currMonthLastDate; i++) {
        td[i+currMonthFirstDay].innerHTML = date_start;
        date_start++;
      }

      // 6. 특정 날짜 클릭 시, 상단에 요일 & 날짜 반영하기
      const date = document.querySelector('.date');
      const day = document.querySelector('.day');

      for (let i = 0; i < td.length; i++) {
        td[i].addEventListener('click', function changeDateAndDay () {
          // 선택한 셀에 아무 숫자도 없을 경우, 아무런 변화도 일어나지 않도록
          if (td[i].innerHTML === '') {
            this.removeEventListener('click', changeDateAndDay);
          } else {
            // 선택한 '날짜'를 상단에 표기
            date.innerHTML = td[i].innerHTML;

            // 선택한 '요일'을 상단에 표기
            let makeDate = new Date(currYear, currMonth, td[i].innerHTML);
            day.innerHTML = (makeDate.toDateString().split(' '))[0];
          }

          // 7.2. 달력의 날짜 클릭 시, 날짜(숫자) 색깔 바꾸기
            for (let j = 0; j < td.length; j++) {
              td[j].style.color = 'black';
            }
            td[i].style.color = '#ffb94f';
        });
      }
    })
  });
}

makeTable('table (5 rows)');

// 1. 오늘의 현재 [요일, 일, 월, 연도] 표기
const YMDD = new Date();
const YMDDarray = YMDD.toString().split(' ', 4);

function showYMDD (selector, index) {
  document.querySelector(selector).innerHTML = YMDDarray[index];
}

showYMDD('.day', 0);
showYMDD('.date', 2);
showYMDD('.month', 1);
showYMDD('.year', 3);



// 2. 현재 월의 1일 요일 판별하고,
// 3. 현재 월의 마지막 날짜(30, 31, 28)까지 달력에 표기하기
const currYear = YMDD.getFullYear();
let currMonth = YMDD.getMonth();

const td = document.getElementsByTagName('td');

const currMonthFirst = new Date(currYear, currMonth, 1);
const currMonthFirstDay = currMonthFirst.getDay();
let date_start = currMonthFirst.getDate();

const currMonthLast = new Date(currYear, currMonth+1, 0);
const currMonthLastDate = currMonthLast.getDate();



// 4 & 5. 우측/좌측 화살표 클릭
function clickBtn (num) {
  const td = document.getElementsByTagName('td');

  currMonth = currMonth + num;

  const currMonthFirst = new Date(currYear, currMonth, 1);
  const currMonthFirstDay = currMonthFirst.getDay();
  let date_start = currMonthFirst.getDate();

  const currMonthLast = new Date(currYear, currMonth+1, 0);
  const currMonthLastDate = currMonthLast.getDate();

  const td_length = td.length;

  // 📌📌📌 버튼 누를 때마다 테이블 가져옴
  if (currMonthLastDate > td_length - currMonthFirstDay) {
    if (currMonthFirstDay === 5) {
      // 1일이 금욜에 시작하는 달 (31이 튀어나옴)
      fetch('table (6 rows)').then(function(response) {
        response.text().then(function(text) {
          const blank = document.querySelector('.blank');
          blank.innerHTML = text;

          for (let i = 0; i < currMonthLastDate; i++) {
            td[i+currMonthFirstDay].innerHTML = date_start;
            date_start++;
          }

          // 6. 특정 날짜 클릭 시, 상단에 요일 & 날짜 반영하기
          const date = document.querySelector('.date');
          const day = document.querySelector('.day');

          function changeTop(num) {
            td[num].addEventListener('click', function changeDateAndDay () {
              // 선택한 셀에 아무 숫자도 없을 경우, 아무런 변화도 일어나지 않도록
              if (td[num].innerHTML === '') {
                this.removeEventListener('click', changeDateAndDay);
              } else {
                // 선택한 '날짜'를 상단에 표기
                date.innerHTML = td[num].innerHTML;

                // 선택한 '요일'을 상단에 표기
                let makeDate = new Date(currYear, currMonth, td[num].innerHTML);
                day.innerHTML = (makeDate.toDateString().split(' '))[0];
              }

              // 7.2. 달력의 날짜 클릭 시, 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].style.color = 'black';
                td[num].style.color = '#ffb94f';
              }
            });
          }

          for (let i = 0; i < td.length; i++) {
            changeTop(i);
          }

        })
      });
    } else if (currMonthFirstDay === 6) {
      if (currMonthLastDate === 30) {
      // 1일이 토욜에 시작, 30으로 끝나는 달 (30이 튀어나옴)
      fetch('table (6 rows)').then(function(response) {
        response.text().then(function(text) {
          const blank = document.querySelector('.blank');
          blank.innerHTML = text;

          for (let i = 0; i < currMonthLastDate; i++) {
            td[i+currMonthFirstDay].innerHTML = date_start;
            date_start++;
          }

          // 6. 특정 날짜 클릭 시, 상단에 요일 & 날짜 반영하기
          const date = document.querySelector('.date');
          const day = document.querySelector('.day');

          function changeTop(num) {
            td[num].addEventListener('click', function changeDateAndDay () {
              // 선택한 셀에 아무 숫자도 없을 경우, 아무런 변화도 일어나지 않도록
              if (td[num].innerHTML === '') {
                this.removeEventListener('click', changeDateAndDay);
              } else {
                // 선택한 '날짜'를 상단에 표기
                date.innerHTML = td[num].innerHTML;

                // 선택한 '요일'을 상단에 표기
                let makeDate = new Date(currYear, currMonth, td[num].innerHTML);
                day.innerHTML = (makeDate.toDateString().split(' '))[0];
              }

              // 7.2. 달력의 날짜 클릭 시, 날짜(숫자) 색깔 바꾸기
              for (let i = 0; i < td.length; i++) {
                td[i].style.color = 'black';
                td[num].style.color = '#ffb94f';
              }
            });
          }

          for (let i = 0; i < td.length; i++) {
            changeTop(i);
          }

        })
      });
      } else if (currMonthLastDate === 31) {
        // 1일이 토욜에 시작, 31로 끝나는 달 (30, 31이 튀어나옴)
        fetch('table (6 rows)').then(function(response) {
          response.text().then(function(text) {
            const blank = document.querySelector('.blank');
            blank.innerHTML = text;

            for (let i = 0; i < currMonthLastDate; i++) {
              td[i+currMonthFirstDay].innerHTML = date_start;
              date_start++;
            }

            // 6. 특정 날짜 클릭 시, 상단에 요일 & 날짜 반영하기
            const date = document.querySelector('.date');
            const day = document.querySelector('.day');

            function changeTop(num) {
              td[num].addEventListener('click', function changeDateAndDay () {
                // 선택한 셀에 아무 숫자도 없을 경우, 아무런 변화도 일어나지 않도록
                if (td[num].innerHTML === '') {
                  this.removeEventListener('click', changeDateAndDay);
                } else {
                  // 선택한 '날짜'를 상단에 표기
                  date.innerHTML = td[num].innerHTML;

                  // 선택한 '요일'을 상단에 표기
                  let makeDate = new Date(currYear, currMonth, td[num].innerHTML);
                  day.innerHTML = (makeDate.toDateString().split(' '))[0];
                }

                // 7.2. 달력의 날짜 클릭 시, 날짜(숫자) 색깔 바꾸기
                for (let i = 0; i < td.length; i++) {
                  td[i].style.color = 'black';
                  td[num].style.color = '#ffb94f';
                }
              });
            }

            for (let i = 0; i < td.length; i++) {
              changeTop(i);
            }

          })
        });
      }
    }
  } else {
    fetch('table (5 rows)').then(function(response) {
      response.text().then(function(text) {
        const blank = document.querySelector('.blank');
        blank.innerHTML = text;

        for (let i = 0; i < currMonthLastDate; i++) {
          td[i+currMonthFirstDay].innerHTML = date_start;
          date_start++;
        }

        // 6. 특정 날짜 클릭 시, 상단에 요일 & 날짜 반영하기
        const date = document.querySelector('.date');
        const day = document.querySelector('.day');

        function changeTop(num) {
          td[num].addEventListener('click', function changeDateAndDay () {
            // 선택한 셀에 아무 숫자도 없을 경우, 아무런 변화도 일어나지 않도록
            if (td[num].innerHTML === '') {
              this.removeEventListener('click', changeDateAndDay);
            } else {
              // 선택한 '날짜'를 상단에 표기
              date.innerHTML = td[num].innerHTML;

              // 선택한 '요일'을 상단에 표기
              let makeDate = new Date(currYear, currMonth, td[num].innerHTML);
              day.innerHTML = (makeDate.toDateString().split(' '))[0];
            }

            // 7.2. 달력의 날짜 클릭 시, 날짜(숫자) 색깔 바꾸기
            for (let i = 0; i < td.length; i++) {
              td[i].style.color = 'black';
              td[num].style.color = '#ffb94f';
            }
          });
        }

        for (let i = 0; i < td.length; i++) {
          changeTop(i);
        }

      })
    });
  }
}

const month = document.querySelector('.month');
const year = document.querySelector('.year');

// 4. 우측 화살표를 클릭 시, 다음 달의 요일 & 날짜 표기
const next = document.querySelector('.next');
next.addEventListener('click', function() {
  clickBtn(1);

  // 7.1. 우측 버튼 클릭 시, 상단의 월과 연도 변경
  // 월 변경
  makeDate = new Date(currYear, currMonth);
  month.innerHTML = (makeDate.toDateString().split(' '))[1];
  // 연도 변경
  makeDate = new Date(currYear, currMonth);
  year.innerHTML = (makeDate.toDateString().split(' '))[3];

  // 우측 버튼 클릭 시, 7.2.로 인해 바뀐 글자 색 원상복귀
  for (let i = 0; i < td.length; i++) {
    td[i].style.color = 'black';
  }
});

// 5. 좌측 화살표를 클릭 시, 이전 달의 요일 & 날짜 표기
const prev = document.querySelector('.prev');
prev.addEventListener('click', function() {
  clickBtn(-1);

  // 7.1. 좌측 버튼 클릭 시, 상단의 월과 연도 변경
  // 월 변경
  makeDate = new Date(currYear, currMonth);
  month.innerHTML = (makeDate.toDateString().split(' '))[1];
  // 연도 변경
  makeDate = new Date(currYear, currMonth);
  year.innerHTML = (makeDate.toDateString().split(' '))[3];

  // 좌측 버튼 클릭 시, 7.2.로 인해 바뀐 글자 색 원상복귀
  for (let i = 0; i < td.length; i++) {
    td[i].style.color = 'black';
  }
});
