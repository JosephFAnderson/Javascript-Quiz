//Where to begin?
//Array to hold questions
var count = 0;
var generateStartBtn = document.querySelector("#startbtn");
var generateBtn1 = document.querySelector("#button1");
var generateBtn2 = document.querySelector("#button2");
var generateBtn3 = document.querySelector("#button3");
var generateBtn4 = document.querySelector("#button4");
var questionBlock = document.getElementById("questionBlock");
var questionChoices = document.querySelector("#questionChoices");

var questionBank;

//Create question object
var question1 = {
    questionText: "Question 1",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 2",
    checkAnswer: function(a) {
        if(a === this.correctAnswer){
            console.log("Correct")
        }else{
            console.log("Incorrect")
        }
    }
};

var question2 = {
    questionText: "Question 2",
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answwer 4",
    correctAnswer: "Answer 4",
    checkAnswer: function(a) {
        if(a === this.correctAnswer){
            console.log("Correct")
        }else{
            console.log("Incorrect")
        }
    }
};

questionBank = [question1, question2];


function nextQuestion(){
    questionBlock.textContent = questionBank[count].questionText;
    generateBtn1.textContent = questionBank[count].option1;
    generateBtn2.textContent = questionBank[count].option2;
    generateBtn3.textContent = questionBank[count].option3;
    generateBtn4.textContent = questionBank[count].option4;
    generateStartBtn.setAttribute("style", "display: none;");
    questionChoices.setAttribute("style", "display: block;");

    
    if(count === questionBank.length) {
        console.log("GAME OVER");
    }
    
}



/*
This sets up the default timer.
*/
timer.innerHTML = "Timer: 120";

//Timer Function
function countdown(){  
    var seconds = 10;  
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
