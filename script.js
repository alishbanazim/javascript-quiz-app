let startScreen = document.querySelector('.start');
let showInstructionBtn = document.querySelector('.startQuiz');
let instructions = document.querySelector('.container');
let startQuizBtn = document.querySelector('.Start');
let quitQuizBtn = document.querySelector('.quit');
let quesContainer = document.querySelector('.quesContainer');
let queNo = document.querySelector('.queNo');
let CountTime = document.querySelector('.count');
let questions = document.querySelector('.questions');
let timerBar = document.querySelector(".timer");
let resultContainer = document.querySelector('.resultContainer');
let count = 60;
let ArrCount = 0;
let score = 0;

//creating next button
//create next button 
let Next = document.createElement('button');
Next.classList.add('Next');
Next.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
Next.disabled = true;
// next question 
Next.addEventListener("click", () => {
    clearInterval(timer);

    if (ArrCount == quiz.length - 1) {
        resultContainer.classList.remove('hide');
        quesContainer.classList.add('hide');
        result();

    } else {
        ArrCount++;
        questions.innerHTML = "";
        displayQuestion();
    }

});
quesContainer.append(Next);
//Start quiz 
showInstructionBtn.addEventListener('click', () => {
    startScreen.classList.add('hide');
    instructions.classList.remove('hide');
    quesContainer.classList.add('hide');
    shuffle();
});
// Quit quiz
quitQuizBtn.addEventListener('click', () => {
    startScreen.classList.remove('hide');
    instructions.classList.add('hide');
    quesContainer.classList.add('hide');
});
// start Quiz 
startQuizBtn.addEventListener('click', () => {
    quesContainer.classList.remove('hide');
    startScreen.classList.add('hide');
    instructions.classList.add('hide');
    displayQuestion();
});
// Display questions on screen 
function displayQuestion() {
    Next.disabled = true;
    //options button 
    let option = quiz[ArrCount].options.map(e => {
        return `<button class='optionBtn'>${e.text}</button>`;
    }).join('');
    //options button end
    //display on screen
    queNo.innerHTML = `Question ${ArrCount + 1} of 10`;
    questions.innerHTML = `<h3>${quiz[ArrCount].ques}</h3>
      ${option}`;

    if (ArrCount == quiz.length - 1) {
        Next.innerHTML = "Result";
    } else {
        Next.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
    }
    //  cheking answers 
    let optionBtn = document.querySelectorAll('.optionBtn');
    optionBtn.forEach((btn, index) => {

        btn.addEventListener("click", (e) => {
            // disabled buttons 
            optionBtn.forEach(button => {
                button.disabled = true;
            });

            Next.disabled = false;

            if (quiz[ArrCount].options[index].correct) {
                e.target.classList.add('correct');
                score++;

            } else {
                e.target.classList.add('false');
                optionBtn.forEach((button, i) => {
                    if (quiz[ArrCount].options[i].correct) {
                        button.classList.add('correct');
                    }

                })
            }
        });
    });
    startTimer();
}
// Showing result
function result() {

    if (score === 10) {
        resultContainer.innerHTML = `<h1>🎉 Outstanding!</h1>
   <h3>Congratulations! You scored ${score} out of 10.</h3>
   <p>
   You have an excellent understanding of JavaScript.
Keep learning and maintain your amazing performance! 🌟</p>
<button class='restart'>Restart</button>`
    }
    else if (score >= 6) {
        resultContainer.innerHTML = `<h1>👏 Great Job!</h1>
   <h3>You scored ${score} out of 10.</h3>
   <p>
  You have a strong understanding of JavaScript.
Just a little more practice and you'll score full marks! 😊</p><button class='restart'>Restart</button>`
    }
    else if (score === 5) {
        resultContainer.innerHTML = `<h1>👍 Good Work!</h1>
   <h3>You scored ${score} out of 10.</h3>
   <p>
You know the basics well, but there's still room for improvement.
Keep practicing and you'll do even better! 📚</p><button class='restart'>Restart</button>`
    }
    else {
        resultContainer.innerHTML = `<h1>😊 Keep Practicing!!</h1>
   <h3>You scored ${score} out of 10</h3>
   <p>
Don't worry! Mistakes are part of learning.
Review the topics and try the quiz again. 💪</p><button class='restart'>Restart</button>`
    }
    //Restart button 
    let Restart = document.querySelector('.restart');
    Restart.innerHTML = `Restart Quiz`;
    Restart.addEventListener('click', () => {
        clearInterval(timer);
        resultContainer.classList.add('hide');
        quesContainer.classList.add('hide');
        startScreen.classList.remove('hide');
        instructions.classList.add('hide');
        count = 60;
        ArrCount = 0;
        score = 0;
    })

}
//Array shuffling 
function shuffle() {
    for (let i = quiz.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
}

// Timer 
let timer;
function startTimer() {
    clearInterval(timer);
    // Restart time bar 
    timerBar.style.animation = "none";
    timerBar.offsetHeight;
    timerBar.style.animation = "timer 60s linear forwards";
 count = 60;
    CountTime.innerHTML = `${count}s`;
    timer = setInterval(() => {
        count--;
        CountTime.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(timer);
            count = 60;
            Next.disabled = false;
            //showing answer
            let optionBtn = document.querySelectorAll('.optionBtn');
            optionBtn.forEach((button, i) => {
                if (quiz[ArrCount].options[i].correct) {
                    button.classList.add('correct');
                }

            });
            setTimeout(() => {
                Next.click();
            }, 1000);
        }
    }, 1000);
}

