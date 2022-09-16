//Where to begin?
//Array to hold questions
var generateBtn = document.querySelector("#button1");
var questionBank;

//Create question object
var question = {
    questionText: "Is this working?",
    option1: "Hello",
    option2: "YES",
    option3: "NO",
    option4: "Hel",
    correctAnswer: "Hello",
    checkAnswer: function(a) {
        if(a === this.correctAnswer){
            console.log("Correct")
        }else{
            console.log("Incorrect")
        }
    }
};

var questionBlock = document.getElementById("questionBlock");
/*
This is how we change the text in the <p> element of our staging area

questionBlock.textContent = question.option1;
*/

var timer = document.getElementById("timer");

/*
This sets up the default timer. Need to replace "120" with a time variable
*/
timer.innerHTML = "Timer: " + "120";

//Timer Function
function countdown(){
    var seconds = 119;
    var clock = setInterval(function(){ timer.innerHTML = "Timer: " + seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(clock);
        }
    }, 1000);
}

//Starts timeer on button click
generateBtn.addEventListener("click", countdown);