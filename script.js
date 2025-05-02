const questions = [
  {
    question : "Which is the largest animal in the World?",
    answer: [
      {text: "Shark", correct:false},
      {text: "Blue Whale", correct:true},
      {text: "Elephant", correct:false},
      {text: "Tiger", correct:false}
    ]
  },

  {
    question : "Which country has the highest life expectancy?",
    answer: [
      {text: "USA", correct:false},
      {text: "China", correct:false},
      {text: "India", correct:false},
      {text: "Hong Kong", correct:true}
    ]
  },

  {
    question : "What is the most common surname in the United States?",
    answer: [
      {text: "Smith", correct:true},
      {text: "John", correct:false},
      {text: "Jarrod", correct:false},
      {text: "Robbert", correct:false}
    ]
  },

  {
    question : "How many minutes are in a full week?",
    answer: [
      {text: "11,120", correct:false},
      {text: "11,000", correct:false},
      {text: "10,080", correct:true},
      {text: "10,785", correct:false}
    ]
  },

  {
    question : "Aureolin is a shade of what color?",
    answer: [
      {text: "White", correct:false},
      {text: "Yellow", correct:true},
      {text: "Pink", correct:false},
      {text: "Green", correct:false}
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrecct = selectedBtn.dataset.correct === "true";
  if(isCorrecct){
    selectedBtn.classList.add("correct")
    score++;
  }  else{
    selectedBtn.classList.add("incorrect")
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct")
    }
    button.disabled="true";
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display="block";
 }

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();