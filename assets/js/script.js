//Where to begin?
//Array to hold questions
var count = 0;
var generateStartBtn = document.querySelector("#startbtn");
var generateBtn1 = document.querySelector("#button1");
var generateBtn2 = document.querySelector("#button2");
var generateBtn3 = document.querySelector("#button3");
var generateBtn4 = document.querySelector("#button4");
var questionBlock = document.getElementById("questionBlock");
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
    console.log("Hello");
}



/*
This sets up the default timer.
*/
timer.innerHTML = "Timer: 120";

//Timer Function
function countdown(){  
    var seconds = 119;  
    var timer = document.getElementById("timer");
    
    
    var clock = setInterval(function(){ timer.innerHTML = "Timer: " + seconds;
        seconds--;
        if (seconds === 0) {
            clearInterval(clock);
        }
    }, 1000);
}



//Starts timeer on button click
generateStartBtn.addEventListener("click", countdown);
generateStartBtn.addEventListener("click", nextQuestion);

// generateBtn.setAttribute("style", "display: none");