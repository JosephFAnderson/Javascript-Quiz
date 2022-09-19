var count = 0;
var score;
var seconds = 120;
var timer = document.getElementById("timer");
var generateStartBtn = document.querySelector("#startbtn");
var generateViewLeaderboard = document.querySelector("#viewLeaderboard");
var generateBtn1 = document.querySelector("#button1");
var generateBtn2 = document.querySelector("#button2");
var generateBtn3 = document.querySelector("#button3");
var generateBtn4 = document.querySelector("#button4");
var questionBlock = document.getElementById("questionBlock");
var questionChoices = document.querySelector("#questionChoices");
var header = document.querySelector("h1");

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

//Check user local storage for leaderboard data. If none create empty leaderboard.
if (JSON.parse(localStorage.getItem("highscores")) === null){
    var highscores = [];
}else{
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    console.log(highscores);
}

var questionBank = [question1, question2, question3, question4];

// This function is what runs the quiz part of the game.
function nextQuestion(){
    header.textContent = questionBank[count].questionText;
    generateBtn1.textContent = questionBank[count].option1;
    generateBtn2.textContent = questionBank[count].option2;
    generateBtn3.textContent = questionBank[count].option3;
    generateBtn4.textContent = questionBank[count].option4;
    questionBlock.setAttribute("style", "display: none");
    generateStartBtn.setAttribute("style", "display: none;");
    questionChoices.setAttribute("style", "display: block;");

    questionChoices.addEventListener("click", checkAnswer, false);
}

//Handles button clicks for question / answer portion of Quiz.
function checkAnswer(e){
    if (e.target.textContent !== questionBank[count].correctAnswer) {
        seconds -= 15;
        console.log("Wrong");
    }else{
        console.log("Correct!");
    }

    count++

    if(count === questionBank.length) {
        console.log("Game Over");
        score = seconds;
        seconds = 0;
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

    questionBlock.setAttribute("style", "display: block");
    form.setAttribute("style", "display: block");
    questionChoices.setAttribute("style", "display: none");
    timer.setAttribute("style", "display: none");
    header.textContent = "Results"

    if (score === undefined) {
        score = 0;
    }

    questionBlock.textContent = "Your final score is: " + score + ". If you would like to save your score, please enter your initials.";
    
    if (score <= 0) {
        var label = document.querySelector("label");

        label.setAttribute("style", "display: none");
        initials.setAttribute("style", "display: none");
        questionBlock.textContent = "Your final score is: " + score + ". Please try again!"
        submit.textContent = "Home";
        submit.addEventListener("click", function(e) {
            location.reload;
        })
    }else{
        //Places an Event Listern to submit button. When pressed add user intials and score to leaderboard array.
        //Then store leaderboard array to local storage.
        submit.addEventListener("click", function(e) {  
            e.preventDefault();  
            highscores.push({name: initials.value, total: score});
            localStorage.setItem("highscores", JSON.stringify(highscores));  
            viewLeaderboard();      
        })
}
}

// console.log(JSON.parse(localStorage.getItem("leaderboard")));
/*
This sets up the default timer.
*/
timer.innerHTML = "Timer: 120";

//Timer Function
function countdown(){        
    
    var clock = setInterval(function(){ timer.innerHTML = "Timer: " + seconds;
        seconds--;
        if (seconds <= 0 && score == undefined) {
            timer.innerHTML = " ";
            clearInterval(clock);
            gameOver();
        }else if (seconds <= 0) {
            clearInterval(clock);
        }
    }, 1000);
}

//Sorts the highscores to get them highest to lowest
function sortHighscores(a, b) {
    if (a.total < b.total){
        return 1;
    }else if(a.total > b.total){
        return -1;
    }else{
        return 0;
    }
}

function viewLeaderboard() {
    var leaderboard = document.querySelector("#leaderboard");
    var board = document.querySelector("#board");
    var homeBtn = document.querySelector("#home");
    var clearBtn = document.querySelector("#clear");
    var stage = document.querySelector("#staging");

    stage.setAttribute("style", "display: none");
    timer.setAttribute("style", "display: none");
    board.setAttribute("style", "display: block");
    leaderboard.setAttribute("style", "display: block");
    homeBtn.setAttribute("style", "display: inline-block");
    clearBtn.setAttribute("style", "display: inline-block");

    highscores.sort(sortHighscores);

    for (var i = 0; i < highscores.length; i++) {
        if(leaderboard.childElementCount < highscores.length){
            leaderboard.appendChild(document.createElement("li"));
        }

        if(i%2 > 0) {
            leaderboard.children[i].setAttribute("style", "background-color: rgb(144, 162, 201)");
        }

        var li = leaderboard.children[i];
        li.textContent = "Player: " + highscores[i].name.toUpperCase() + " scored " + highscores[i].total + " points";
    }

    
    homeBtn.addEventListener("click", function() {
        location.reload();
    });
    clearBtn.addEventListener("click", function() {
        localStorage.clear();
        leaderboard.setAttribute("style", "display: none");
    })
}

generateStartBtn.addEventListener("click", countdown);
generateStartBtn.addEventListener("click", nextQuestion);
generateViewLeaderboard.addEventListener("click", function(e) {
    e.preventDefault();
    viewLeaderboard();
});