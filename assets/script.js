const quizData = [
    {
      question: "Commonly used Data types DO Not include:",
      choices: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: 2,
    },
    {
      question: "The condition in an if / else statement is enclosed with __________.",
      choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
      answer: 2,
    },
    {
      question: "Arrays in JavaScript can be used to store _________.",
      choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
      answer: 3,
    },
    {
      question: "String values must be enclosed within ________ when being assigned to variables.",
      choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
      answer: 2,
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "Terminal/Bash", "for Loops", "console.log"],
      answer: 3,
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  var timeLeft = 60;
  
  const startQuizContainer = document.getElementById("startQuizContainer");
  const questionsContainer = document.getElementById("questionsContainer");
  const scoreContainer = document.getElementById("scoreContainer");
  const highScoreContainer = document.getElementById("highScoreContainer");
  const questionElement = document.getElementById("question");
  const choiceButtons = document.getElementsByClassName("choiceButton");
  const correctAnswerElement = document.getElementById("correctAnswer");
  const yourScoreElement = document.getElementById("yourScore");
  const initialsElement = document.getElementById("initials");
  const highScoreList = document.getElementById("highScoreList");
  
  const scoresArray = [];
  
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startQuiz);
  
  const startAgainButton = document.getElementById("startAgain");
  startAgainButton.addEventListener("click", startAgain);
  
  const clearHighScoreButton = document.getElementById("clearHighScore");
  clearHighScoreButton.addEventListener("click", clearHighScores);
  
  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].addEventListener("click", checkAnswer);
  }
  
  const viewHighScores = document.getElementById("viewHighScores");
  viewHighScores.addEventListener("click", showHighScore);
  
  const submitScoreButton = document.getElementById("submitScore");
  submitScoreButton.addEventListener("click", submitScore);
  
  function startTimer() {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = timeLeft;

    var countdown = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            showScore();
        }
    }, 1000);
}

  function startQuiz() {
    scoresArray.length = 0;
    startQuizContainer.style.display = "none";
    questionsContainer.style.display = "block";
    currentQuestion = 0;
    score = 0;
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const questionData = quizData[currentQuestion];
    questionElement.textContent = questionData.question;
    for (let i = 0; i < choiceButtons.length; i++) {
      choiceButtons[i].textContent = questionData.choices[i];
    }
  }
  
  function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswer = Array.prototype.indexOf.call(choiceButtons, selectedChoice);
    const questionData = quizData[currentQuestion];
  
    if (selectedAnswer === questionData.answer) {
      score++;
      correctAnswerElement.textContent = "Correct!";
    } else {
      correctAnswerElement.textContent = "Wrong!";
      timeLeft -= 10;
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
    yourScoreElement.textContent = "Your Score: " + score;
  }
  
  function showHighScore() {
    startQuizContainer.style.display = "none";
    questionsContainer.style.display = "none";
    scoreContainer.style.display = "none";
  
    const storedScores = JSON.parse(localStorage.getItem("initials")) || [];
    highScoreList.innerHTML = "";
  
    for (const scoreObject of storedScores) {
      const { input, score } = scoreObject;
      const li = document.createElement("li");
      li.textContent = input + ": " + score;
      highScoreList.appendChild(li);
    }
  
    highScoreContainer.style.display = "block";
  }
  
  function startAgain() {
    highScoreContainer.style.display = "none";
    startQuizContainer.style.display = "block";
    currentQuestion = 0;
    score = 0;
    // Reset timer
    // ... timer reset logic here ...
  }
  
  function clearHighScores() {
    highScoreList.innerHTML = "";
    localStorage.removeItem("initials");
  }

  function submitScore(event) {
    event.preventDefault();
  
    const storedScores = JSON.parse(localStorage.getItem("initials")) || [];
    const input = initialsElement.value;
    const scoreObject = { input, score };
  
    scoresArray.length = 0;
    scoresArray.push(...storedScores.filter(Boolean), scoreObject);
  
    localStorage.setItem("initials", JSON.stringify(scoresArray));
    initialsElement.value = "";
  
    showHighScore();
  }
  