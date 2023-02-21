// Define an array of quiz questions
const questions = [
  {
    question: "What does HtML Stand for?",
    choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hi Tom my lane"],
    answer: "Hyperlinks and Text Markup Language"
  },
  {
    question: "Choose the correct HTML tag for the largest heading?",
    choices: ["H1", "Heading", "Head", "H6"],
    answer: "H1"
  },
  {
    question: "What is the correct HTML tag for inserting a line break?",
    choices: ["Br", "Break", "Lb", "Break/br"],
    answer: "Br"
  },
  {
    question: "Choose the correct HTML tag to make text bold?",
    choices: ["Bold", "Bl", "Bld", "B"],
    answer: "B"
  },
  {
    question: "Choose the correct HTML tag to make the text italic?",
    choices: ["Italic", "It", "I", "Li"],
    answer: "I"
  }
];

// Define variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Define elements
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit-btn");
const initialsInput = document.getElementById("initials");
const scoreEl = document.getElementById("score");
const Highscorebtn= document.getElementById("Highscore-btn")
const Savebtn= document.getElementById("save-btn")
const saveplayerinfo=JSON.parse(localStorage.getItem("savedscore")) || []
// Define functions
startBtn.addEventListener("click",startQuiz)
Highscorebtn.addEventListener("click",endQuiz)
Savebtn.addEventListener("click",function(){
  const username=document.querySelector("#username").value
  saveplayerinfo.push({
    name:username,
    score:time
  })
  localStorage.setItem("savedscore",JSON.stringify(saveplayerinfo))
})
// Starts the quiz
function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  setNextQuestion();
  startTimer();
}

// Sets the next question
function setNextQuestion() {
  resetChoices();
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = choice;
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      li.appendChild(label);
      choicesEl.appendChild(li);
    });
  } else {
    endQuiz();
  }
}

// Resets the choices
function resetChoices() {
  console.log(choicesEl)
  while (choicesEl.firstChild) {
    choicesEl.removeChild(choicesEl.firstChild);
  }
}

// Submits the answer
function submitAnswer() {
  console.log ("Hello")
  const selectedChoice = document.querySelector('input[name="choice"]:checked');
  if (!selectedChoice) {
    return;
  }
  const selectedAnswer = selectedChoice.value;
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.answer) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    setNextQuestion();
  }
}

// Ends the quiz
function endQuiz() {
  clearInterval(timerId);
  quizScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  scoreEl.innerText = time;
}

// Starts the timer
function startTimer() {
  timerId = setInterval(() => {
    time--;
    timerEl.innerText = time;
    if (time <= 0) {
     clearInterval(timerId)
     }
    },1000)
  }
