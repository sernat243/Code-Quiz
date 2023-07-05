var quizData = [
    {
        question: "Commonly used Data types DO Not include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: 3
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/Bash", "for Loops", "console.log"],
        answer: 3
    }
];

var currentQuestion = 0;
var score = 0;

var startQuizContainer = document.getElementById("startQuizContainer");
var questionsContainer = document.getElementById("questionsContainer");
var scoreContainer = document.getElementById("scoreContainer");
var highScoreContainer = document.getElementById("highScoreContainer");
var questionElement = document.getElementById("question");
var choiceButtons = document.getElementsByClassName("choiceButton");
var correctAnswerElement = document.getElementById("correctAnswer");
var yourScoreElement = document.getElementById("yourScore");
var initialsElement = document.getElementById("initials");
var highScoreElement = document.getElementById("highScore");

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startQuiz);

for (var i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].addEventListener("click", checkAnswer);
}

var viewHighScores = document.getElementById("viewHighScores");
viewHighScores.addEventListener("click",showHighScore);

function startQuiz() {
    startQuizContainer.style.display = "none";
    questionsContainer.style.display = "block";
    showQuestion();
}

function showQuestion() {
    var questionData = quizData[currentQuestion];
    questionElement.innerText = questionData.question;
    for (var i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].innerText = questionData.choices[i];
    }
}


function checkAnswer(event) {
    var selectedChoice = event.target;
    var selectedAnswer = Array.prototype.indexOf.call(choiceButtons, selectedChoice);
    var questionData = quizData[currentQuestion];

    if (selectedAnswer === questionData.answer) {
        score++;
        correctAnswerElement.innerText = "Correct!";
    } else {
        correctAnswerElement.innerText = "Wrong!";
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionsContainer.style.display = "none";
    scoreContainer.style.display = "block";
    yourScoreElement.innerText = "Your Score: " + score;
}

function showHighScore() {
    startQuizContainer.style.display = "none";
    questionsContainer.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
}