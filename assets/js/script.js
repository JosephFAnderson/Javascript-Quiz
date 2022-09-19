var count = 0;
var score;
var seconds = 120;
var generateStartBtn = document.querySelector("#startbtn");
var generateBtn1 = document.querySelector("#button1");
var generateBtn2 = document.querySelector("#button2");
var generateBtn3 = document.querySelector("#button3");
var generateBtn4 = document.querySelector("#button4");
var questionBlock = document.getElementById("questionBlock");
var questionChoices = document.querySelector("#questionChoices");

//Create question objects
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

//Check user local storage for leaderboard data. If none create empty leaderboard.
if (JSON.parse(localStorage.getItem("leaderboard")) === null){
    var leaderboard = [];
}else{
    var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    console.log(leaderboard);
}

var questionBank = [question1, question2, question3, question4];

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
        score = seconds;
        seconds = 1;
        gameOver();
        
    }else{
        nextQuestion();
    }
}

//Allow users to enter their initials to save score to leaderboard.
function gameOver() {
    var form = document.querySelector("form");
    var submit = document.querySelector("#submit");
    var initials = document.querySelector("#initials");
    form.setAttribute("style", "display: block");
    questionChoices.setAttribute("style", "display: none");
    questionBlock.textContent = "You final score is: " + score + ". If you would like to save your score, please enter your initials.";
    
    //Places an Event Listern to submit button. When pressed add user intials and score to leaderboard array.
    //Then store leaderboard array to local storage.
    submit.addEventListener("click", function() {        
        leaderboard.push({name: initials.value, total: score});
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    })
}

// console.log(JSON.parse(localStorage.getItem("leaderboard")));
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


//Compares the scores of the leaderboard to sort them highest to lowest
function sortLeaderboard(a, b) {
    if (a.total < b.total){
        return 1;
    }else if(a.total > b.total){
        return -1;
    }else{
        return 0;
    }
}
leaderboard.sort(sortLeaderboard);

