new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  responsiveWidth: 900,
  afterResponsive: function(isResponsive){
  }
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
       <div class="note-text">코알누님의 도전을 응원합니다🙌</div>
    </div>`;
  } else {
    resultHTML =
      '<div class="note-text">앗! 이 운동은 더 알아보고 있어요🙄</div>'; //검색결과 없을 때 결과값
  }

  document.getElementById("result-area").innerHTML = resultHTML;
};

  //버튼 함수
  let exerciseSearchButton = document.querySelectorAll(".like-exercise-check-area button")
  exerciseSearchButton.forEach((exerciseSearchButton=>exerciseSearchButton.addEventListener("click",(event)=>getExerciseKeyButton(event))))
  
  let getExerciseKeyButton=(event)=>{
    let clickKeyword=event.target.textContent
    console.log(clickKeyword)
    inputElement.value = `${clickKeyword}`
  }

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


//recipe Area - 이수

const appId=`35ed5796`
const recipeId=`fc26eb2e099311839055d866ac9db908`
//new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=tomato&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients`)
//let url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${recipeId}`)
let url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=tomato&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`)
let recipeList=[];
let recipeContent=[];
let inputRecipe=document.getElementById("recipe-search-input")
let recipeSearchButton = document.querySelectorAll(".like-food-check-area button")
recipeSearchButton.forEach((recipeSearchButton=>recipeSearchButton.addEventListener("click",(event)=>getKeybutton(event))))

const sportSearchKey=()=>{
switch(event.key){
  case "Enter": getSearchRecipe();
}   
}

const getRecipe=async()=>{

  try {
      const response = await fetch(url);
      const data = await response.json();
      if(response.status===200){
          if(data.hits.length===0){
              throw new Error("No result for this search");
          }
          recipeList=data.hits;
          recipeContent=recipeList.map((item)=>{
          return item.recipe
          })
          render();
      }else{
          throw new Error(data.message)
      }
  }catch(error){
      errorRender(error.message)
  }
}
getRecipe();

const getKeybutton=(event)=>{
const checkKeyword=event.target.textContent
console.log(checkKeyword)
url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=${checkKeyword}&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`)
getRecipe();
}


const getSearchRecipe=async()=>{
  let recipeKeyword=inputRecipe.value;
  url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=${recipeKeyword}&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`)
  getRecipe();
  inputRecipe.value="";
};

const render=()=>{
  const recipeCardHTML=recipeContent.map(item=>`<button class="recipe-card" id="recipe-button" onclick="clickRecipe(event)">
  <div class="recipe-card-image"><img src="${item.image}"></div>
  <div><h3>${item.label}</h3></div>
</button>`).join('');

  document.getElementById("view-recipecard").innerHTML=recipeCardHTML
  let recipeButton = document.createElement("recipe-button")
}
//<p>${parseInt(item.calories)} calories</p>

const clickRecipe=(event)=>{
  console.log(event.target.offsetParent.offsetParent.innerText);
  let recipeText = event.target.offsetParent.offsetParent.innerText;
  let clickRecipe=recipeContent.filter((item)=>{
      return item.label==`${recipeText}`
  })
  console.log("ohmy",clickRecipe)
  const clickRecipeHTML=clickRecipe.map(item=>`<div class="recipe-alltext">
 <div class="recipe-alltext-img"><img src="${item.image}"></div>
 <div class="recipe-alltext-title"><p><span class="recipe-title">${item.label}</span><br>
 <span class="recipe-blue">${parseInt(item.calories)}</span> <span class="recipe-smalltext">CALORIES</span> | <span class="recipe-blue">${item.ingredientLines.length}</span> <span class="recipe-smalltext">INGREDIENTS</span></p></div>
 <p class="font-boldweight">INGREDIENTS</p><div class="recipe-ingredient"><p> ${item.ingredientLines.join('<br></br>')}</p></div>
 <p class="nutri-font"><span class="recipe-smalltext">🔴</span>PROTEIN &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.PROCNT.quantity)}</span>${item.totalNutrients.PROCNT.unit} | 
 <span class="recipe-smalltext">🟡</span>CARB &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.CHOCDF.quantity)}</span>${item.totalNutrients.CHOCDF.unit} | 
 <span class="recipe-smalltext">🟢</span>FAT &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.FAT.quantity)}</span>${item.totalNutrients.FAT.unit}</p>`)

  document.getElementById("click-recipe-area").innerHTML=clickRecipeHTML
}

const errorRender=(errorMessage)=>{
  const errorHTML=`<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
document.getElementById("view-recipecard").innerHTML=errorHTML
}

//recipe Area - 이수

// 경일님

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

document.getElementById('detail-go').addEventListener('click', () => {
  window.location.href = "exercise.html";
  });

// document.getElementById('clickgoto').addEventListener('click', () => {
// window.location.href = "exercise.html";
// });

// document.getElementById('result').addEventListener('click', () => {
// window.location.href = "exercise.html";
// });

let userSport=document.getElementById("plan-sport-input")
let userWater=document.getElementById("plan-water-input")

const planAdd=()=>{

  let waterIcon=" ";
  if(userWater.value==1){
    waterIcon="💧";
  } else if(userWater.value==2){
    waterIcon="💧💧";
  } else if(userWater.value==3){
    waterIcon="💧💧💧";
  } else if(userWater.value==4){
    waterIcon="💧💧💧💧";
  }  else if(userWater.value==5){
    waterIcon="💧💧💧💧💧";
  } else{
    userWater.value="1~5 숫자!"
    return;
  }

  let planAddHTML=`<div class="plan-item">
  <div class="plan-date">${moment().format("MMM D")}</div>
  <div class="plan-sport">${userSport.value}</div>
  <div class="plan-water">${waterIcon}</div>
  <div><button class="plan-delete-button" onclick="planDelete(event)" id="plan-delete">🗙</button><div>
  >>>>>>> develop
  </div>`

  document.getElementById("plan-area").innerHTML+=planAddHTML

  let planDeleteLine = document.createElement("plan-delete")
  inputRemove();
}

const inputRemove=()=>{
  userSport.value="";
  userWater.value="";
}
