document.addEventListener('DOMContentLoaded', function() {

    populateDivs('etype', etype, 'type', etypeKorean);
    populateDivs('emuscle', emuscle, 'muscle', emuscleKorean);
    populateDivs('edifficulty', edifficulty, 'difficulty', edifficultyKorean);
    updateSymptomDivs(symptom);

    // URL에서 'name' 매개변수 값을 가져옵니다.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');

    if (name && symptom[name]) {
        document.getElementById(name)?.click();
    }
});

const symptom = {
    거북목 :{
        etype : 'stretching',
        emuscle : 'neck',  
        edifficulty : '',
        recipe : ['egg', 'egg2','egg3']  
    },
    목디스크 : {
        etype : 'strength',
        emuscle : 'neck',  
        edifficulty : '',
        recipe : ['apple', 'apple2','apple3']          

    },
    허리디스크 :{
        etype : 'strength',
        emuscle : 'lower_back',  
        edifficulty : '',
        recipe : ['pear', 'pear2','pear3']          

    },
    라운드숄더 :{
        etype : 'strength',
        emuscle : 'traps',  
        edifficulty : '',
        recipe : ['pear', 'pear2','pear3']          

    }
}

const etype = ['cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman'];
const emuscle = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];
const edifficulty = ['beginner', 'intermediate', 'expert'];
let result;
const selected = {
    type: '',
    muscle: '',
    difficulty: ''
};

// 한국어 변환
const etypeKorean = {
    'cardio': '유산소',
    'olympic_weightlifting': '역도',
    'plyometrics': '플라이오메트릭스',
    'powerlifting': '파워리프팅',
    'strength': '근력',
    'stretching': '스트레칭',
    'strongman': '스트롱맨'
};
const emuscleKorean = {
    'abdominals': '복근',
    'abductors': '외전근',
    'adductors': '내전근',
    'biceps': '이두근',
    'calves': '종아리',
    'chest': '가슴',
    'forearms': '전완근',
    'glutes': '둔근',
    'hamstrings': '햄스트링',
    'lats': '광배근',
    'lower_back': '하부 등',
    'middle_back': '중간 등',
    'neck': '목',
    'quadriceps': '대퇴사두근',
    'traps': '승모근',
    'triceps': '삼두근'
};
const edifficultyKorean = {
    'beginner': '초보자',
    'intermediate': '중급자',
    'expert': '전문가'
};


function updateSymptomDivs(symptom) {
    const symptomContainer = document.getElementById('symptom');
    symptomContainer.innerHTML = ''; // 기존 내용 초기화

    Object.keys(symptom).forEach(key => {
        const symptomDiv = document.createElement('div');
        symptomDiv.id = key; 
        symptomDiv.textContent = key; 
        symptomDiv.classList.add('symptom-item'); 
        symptomDiv.style.cursor = 'pointer';
        symptomContainer.appendChild(symptomDiv);

        symptomDiv.addEventListener('click', function() {
            document.querySelectorAll('.symptom-item').forEach(item => {
                item.style.backgroundColor = ''; 
            });
            this.style.backgroundColor = 'green'; 

            const details = symptom[key];
            populateDivs('etype', etype, 'type', etypeKorean);
            populateDivs('emuscle', emuscle, 'muscle', emuscleKorean);
            populateDivs('edifficulty', edifficulty, 'difficulty', edifficultyKorean);

            // 선택된 값에 대해 클릭 이벤트 시뮬레이션
            setTimeout(() => { 
                if (details.etype) simulateClick('etype', details.etype);
                if (details.emuscle) simulateClick('emuscle', details.emuscle);
                if (details.edifficulty) simulateClick('edifficulty', details.edifficulty);
                // Ajax 호출
                makeAjaxCall(selected.type, selected.muscle, selected.difficulty);
            }, 100);
        });
    });
}


updateSymptomDivs(symptom);

function simulateClick(id, value) {
    const elements = document.querySelectorAll(`#${id} .item`);
    elements.forEach(el => {
        if (el.getAttribute('data-value') === value) {
            el.click(); // 시뮬레이션 클릭
        }
    });
}


function populateDivs(id, items, category, mapping) {
    const container = document.getElementById(id);
    container.innerHTML = ''; 

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.id = `${id}${index}`; // 인덱스를 기반으로 고유 ID 할당
        div.setAttribute('data-value', item);
        div.classList.add('item');
        div.textContent = "#" + mapping[item]; // 한국어 변환된 텍스트 사용
        div.style.cursor = 'pointer';
        container.appendChild(div);

        div.addEventListener('click', function() {
            // Toggle selection
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                this.style.backgroundColor = '';
                selected[category] = ''; 
            } else {
                document.querySelectorAll(`#${id} .item`).forEach(el => {
                    el.style.backgroundColor = '';
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
                this.style.backgroundColor = id === 'etype' ? 'red' : id === 'emuscle' ? 'yellow' : 'blue';
                selected[category] = this.getAttribute('data-value');
            }

            makeAjaxCall(selected.type, selected.muscle, selected.difficulty);
        });
    });
}


function makeAjaxCall(type, muscle, difficulty) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/exercises?offset=0&type=${type}&muscle=${muscle}&difficulty=${difficulty}`,
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

    // results 배열이 비어 있는지 확인
    if (results.length === 0) {

        myHtml = '<div class="exec"><div>결과가 없습니다.</div></div>';

    } else {

        // results.forEach((result) => {
        const result=results[0];
        myHtml += `<div class="exec">
        <div class="linemenuview"><div class="linemenu">난이도</div><div name="difficulty">${result.difficulty}</div></div>
        <div class="linemenuview"><div class="linemenu">장비</div><div name="equipment">${result.equipment}</div></div>
        <div class="linemenuview"><div class="linemenu">방법</div><div name="instructions">${result.instructions}</div></div>
        <div class="linemenuview"><div class="linemenu">활용근육</div><div name="muscle">${result.muscle}</div></div>
        <div class="linemenuview"><div class="linemenu">운동명</div><div name="name">${result.name}</div></div>   
        <div class="linemenuview"><div class="linemenu">타입</div><div name="type">${result.type}</div></div>                                            
    </div>`;
        // });
    }

    document.getElementById('result').innerHTML = myHtml;
    
}