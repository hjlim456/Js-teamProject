new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  responsiveWidth: 900,
  afterResponsive: function(isResponsive){
  }
});

//통증별 최적 운동방법 찾기__ 정경일

let result;

function makeAjaxCall(type, muscle, difficulty) {
  $.ajax({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`,
      headers: { 'X-Api-Key': '2zEcKZF8xR0B88lSXJRwzQ==nRJtVdNfV0FBKzUn'},
      contentType: 'application/json',
      success: function(result) {
          console.log(result);
          updateResultOnPage(result);  
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
  });
}

// 결과 데이터를 HTML에 업데이트하는 함수
function updateResultOnPage(results) {

  myHtml='';

      const result = results[0];
      myHtml += `<div class="exec">
      <div class="linemenuview"><div class="linemenu">난이도</div><div name="difficulty">${result.difficulty}</div></div>
      <div class="linemenuview"><div class="linemenu">장비</div><div name="equipment">${result.equipment}</div></div>
      <div class="linemenuview"><div class="linemenu">방법</div><div name="instructions">${result.instructions}</div></div>
      <div class="linemenuview"><div class="linemenu">활용근육</div><div name="muscle">${result.muscle}</div></div>
      <div class="linemenuview"><div class="linemenu">운동명</div><div name="name">${result.name}</div></div>   
      <div class="linemenuview"><div class="linemenu">타입</div><div name="type">${result.type}</div></div>                                            
  </div>`;


  document.getElementById('result').innerHTML = myHtml;
  
}

document.getElementById('clickgoto').addEventListener('click', () => {
  window.location.href = "https://exec2024.netlify.app/";
});




// 운동별 칼로리 영역-미나
// 칼로리 api 불러와서 클릭이벤트
$(document).ready(function () {
  $("#exerciseSearch").click(function () {
    $.ajax({
      method: "GET",
      url:
        "https://api.api-ninjas.com/v1/caloriesburned?activity=" +
        $("#exerciseInput").val(),
      headers: { "X-Api-Key": "IaGdzq5pIoLI4XCyr1RFTA==SF87FmE9sxHucAPr" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
        resultList = result;
        caloriesRender();
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  });
});

// 칼로리 보여주는
let caloriesRender = () => {
  //랜덤 배열로 보여주기
  let randomIndex = Math.floor(Math.random() * resultList.length);
  let randomResult = resultList[randomIndex];

  // HTML 생성
  let resultHTML = "";
  if (resultList.length > 0) {
    resultHTML = `
       <div>
        <span class="counter-text">${randomResult.total_calories}</span> <span class="note-text">cal</span>
       </div>
       <div class="message-text-area">
       <span class="note-title">${randomResult.duration_minutes}</span> <span class="note-text">분 동안</span> 
       <span class="note-title">${randomResult.name}</span> <span class="note-text">으로</span>
       <span class="note-title">${randomResult.total_calories}</span>  <span class="note-text">칼로리를 소모할 수 있어요!</span>
       <div class="note-text">ooo님의 도전을 응원합니다🙌</div>
    </div>`;
  } else {
    resultHTML =
      '<div class="note-text">앗! 이 운동은 더 알아보고 있어요🙄</div>'; //검색결과 없을 때 결과값
  }

  document.getElementById("result-area").innerHTML = resultHTML;
};

// 이모지 애니메이션
let changingText = document.getElementById("changingText");
let texts = [
  "⛳",
  "🤿",
  "🎿",
  "🏓",
  "⚾",
  "🏊‍♀️",
  "🥊",
  "🎾",
  "🏀",
  "🎯",
  "🎳",
  "⛸",
  "🧘‍♀️",
  "🏈",
];
let index = 0;
function changeText() {
  changingText.textContent = texts[index];
  index = (index + 1) % texts.length;
}
setInterval(changeText, 700);
changeText();

//input 텍스트 지우기
let inputElement = document.getElementById("exerciseInput");
function clearInput() {
  inputElement.value = "";
}

//미입력시 알럿
let searchButton = document.getElementById("exerciseSearch");
searchButton.addEventListener("click", function () {
  if (inputElement.value == "") {
    alert("운동명을 입력해주세요!");
    return;
  }
});

