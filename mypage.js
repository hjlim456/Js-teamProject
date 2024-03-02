
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    // 기타 옵션들
});








let bodyCheckButton = document.querySelectorAll(".body-check-area button");

bodyCheckButton.forEach(button => {
    button.addEventListener("click", (button)=>{
        button.classList.add("like-exercise-check-button-clicked");
    });
  });