//Where to begin?
//Array to hold questions
var count = 0;
var seconds = 120;
var generateStartBtn = document.querySelector("#startbtn");
var generateBtn1 = document.querySelector("#button1");
var generateBtn2 = document.querySelector("#button2");
var generateBtn3 = document.querySelector("#button3");
var generateBtn4 = document.querySelector("#button4");
var questionBlock = document.getElementById("questionBlock");
var questionChoices = document.querySelector("#questionChoices");
var answerButton = document.querySelectorAll("button");
console.log(answerButton);

var questionBank;

//Create question object
var question1 = {
    questionText: "Question 1",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 2"   
};

var question2 = {
    questionText: "Question 2",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 1"
};

var question3 = {
    questionText: "Question 3",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 2"
}

var question4 = {
    questionText: "Question 4",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 4"
}

var highscores = {
    name: "",
    score: ""
}

var leaderboard = [];



questionBank = [question1, question2];

// This function is what runs the quiz part of the game.
function nextQuestion(){
    questionBlock.textContent = questionBank[count].questionText;
    generateBtn1.textContent = questionBank[count].option1;
    generateBtn2.textContent = questionBank[count].option2;
    generateBtn3.textContent = questionBank[count].option3;
    generateBtn4.textContent = questionBank[count].option4;
    generateStartBtn.setAttribute("style", "display: none;");
    questionChoices.setAttribute("style", "display: block;");

    questionChoices.addEventListener("click", checkAnswer, false);
}

//Handles button clicks for question / answer portion of Quiz.
function checkAnswer(e){
    console.log(e.target.textContent);
    if (e.target.textContent !== questionBank[count].correctAnswer)
    {
        seconds -= 15;
        console.log("Wrong");
    }else{
        console.log("Correct!");
    }

    count++

    if(count === questionBank.length) {
        console.log("Game Over");
    }else{
        nextQuestion();
    }
}



/*
This sets up the default timer.
*/
timer.innerHTML = "Timer: 120";

//Timer Function
function countdown(){    
    var timer = document.getElementById("timer");    
    
    var clock = setInterval(function(){ timer.innerHTML = "Timer: " + seconds;
        seconds--;
        if (seconds === 0) {
            timer.innerHTML = " ";
            console.log("Game Over");
            clearInterval(clock);
        }
    }, 1000);
}



//Starts timeer on button click
generateStartBtn.addEventListener("click", countdown);
generateStartBtn.addEventListener("click", nextQuestion);
