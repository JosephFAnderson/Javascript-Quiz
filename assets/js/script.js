// Declare and assign global variables
var score;
var count = 0;
var seconds = 90;
var timer = document.getElementById("timer");
var generateStartBtn = document.querySelector("#startbtn");
var generateViewLeaderboard = document.querySelector("#viewLeaderboard");
var questionBlock = document.querySelector("#questionBlock");
var questionChoices = document.querySelector("#questionChoices");
var header = document.querySelector("h1");

//Create question objects
var question1 = {
    questionText: "Which of the follow is the correct way to evaluate if something is equal in both type and value?",
    option1: "!=",
    option2: "==",
    option3: "===",
    option4: ">=",
    correctAnswer: "==="   
};

var question2 = {
    questionText: "Which of the following is not an acceptable way to declare a variable called myName that contains a vaule of 'Joseph'.",
    option1: "let myName = 'Joseph';",
    option2: "var myName = 'Joseph';",
    option3: "const myName = 'Joseph';",
    option4: "set myName = 'Joseph';",
    correctAnswer: "set myName = 'Joseph';"
};

var question3 = {
    questionText: "Given an array that contains the following: [Joseph, Brad, Martin, Alex]. What index is 'Martin' at?",
    option1: "1",
    option2: "2",
    option3: "3",
    option4: "4",
    correctAnswer: "2"
}

var question4 = {
    questionText: "Which of the following is not a primitive data type of Javascript",
    option1: "array",
    option2: "string",
    option3: "boolean",
    option4: "undefined",
    correctAnswer: "array"
}

// This function sets up the display of the quiz and listens for user answer.
function nextQuestion() {
    var generateBtn1 = document.querySelector("#button1");
    var generateBtn2 = document.querySelector("#button2");
    var generateBtn3 = document.querySelector("#button3");
    var generateBtn4 = document.querySelector("#button4");

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

// Handles button clicks for question / answer portion of Quiz
function checkAnswer(e){
    var isCorrect = document.querySelector("#rightWrong");
    isCorrect.setAttribute("style", "display: block");

    // Checks if user answer is correct. If not deduct 15 seconds. Display Correct / Wrong with a timeout on display
    if (e.target.textContent !== questionBank[count].correctAnswer) {
        seconds -= 15;
        isCorrect.textContent = "Wrong";
        setTimeout(function() {
            isCorrect.textContent = "";
        }, 2000);
    }else {
        isCorrect.textContent = "Correct!";
        setTimeout(function() {
            isCorrect.textContent = "";
        }, 2000);
    }

    count++

    // Trigger end of game once last question answered
    if(count === questionBank.length) {
        console.log("Game Over");
        score = seconds;
        seconds = 0;
        gameOver();
        
    }else{
        nextQuestion();
    }
}

//Allow user to enter their initials to save score to leaderboard.
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
        questionBlock.textContent = "Your final score is: " + score + ". If you would like to save your score, please enter your initials.";
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

//Timer Function
function countdown(){        
    
    var clock = setInterval(function(){ 
        timer.innerHTML = "Timer: " + seconds;
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

// Sets up and displays the highscores on a leaderboard
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

    // Add the highscores to the leaderboard. Creates enough li to fit the contents of the array.
    for (var i = 0; i < highscores.length; i++) {
        if(leaderboard.childElementCount < highscores.length){
            leaderboard.appendChild(document.createElement("li"));
        }

        // Change background color of the odd numbered scores to make viewing easier
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

//Check user local storage for leaderboard data. If none create empty leaderboard.
if (JSON.parse(localStorage.getItem("highscores")) === null){
    var highscores = [];
}else{
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    console.log(highscores);
}

// Create default array of questions
var defaultQuestionBank = [question1, question2, question3, question4];
var questionBank = [];

// Randomize the defaultQuestionBank and push it into questionBank
for(var i = defaultQuestionBank.length; i > 0; i--) {
    var random = Math.floor(Math.random() * i);
    console.log(random);
    questionBank.push(defaultQuestionBank[random]);
    defaultQuestionBank.splice(random, 1);
}

// Display timer
timer.innerHTML = "Timer: " + seconds;

// Handle button presses on default HTML page
generateStartBtn.addEventListener("click", countdown);
generateStartBtn.addEventListener("click", nextQuestion);
generateViewLeaderboard.addEventListener("click", function(e) {
    e.preventDefault();
    viewLeaderboard();
});