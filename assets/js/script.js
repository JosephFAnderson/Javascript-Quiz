//Where to begin?
//Array to hold questions
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
