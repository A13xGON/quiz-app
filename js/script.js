const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const quit_button = info_box.querySelector(".buttons .stop-game");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_cont = document.querySelector(".quiz-container");
const options = document.querySelector(".answer-list");
const timerCnt = quiz_cont.querySelector(".clock .timer");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
  console.log("Start-Button Worked");
};

quit_button.onclick = () => {
  info_box.classList.remove("activeInfo");
  console.log("Quit Button Worked");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_cont.classList.add("quizStart");
  console.log("Continue Button Started");
  getQuestions(0);
  footer_counter(1);
  clearInterval(seconds);
  startClock(30);

};

// I'm going to create an array for the questions

let questions = [
  {
    numb: 1,
    question: "What is HTML?",
    correct_answer: "HyperText Markup Language: the foundation of a website",
    answers: [
      "A type of aircraft",
      "A made up abbreviation",
      "HyperText Markup Language: the foundation of a website",
      "None of the above",
    ],
  },

  {
    numb: 2,
    question: "Who was Luke Skywalker's Father?",
    correct_answer: "Darth Vader",
    answers: ["Darth Maul", "Obi Wan Kenobi", "Qui-Gon Jinn", "Darth Vader"],
  },

  {
    numb: 3,
    question: "What are the other 2 languages you can connect to HTML?",
    correct_answer: "CSS, JavaScript",
    answers: [
      "CSS, JavaScript",
      "Python 3.0, ChatGPT",
      "C++, Java",
      "Duolingo, Rossetta Stone",
    ],
  },

  {
    numb: 4,
    question: "What is the greatest anime of all time?",
    correct_answer: "One Piece",
    answers: ["Naruto", "Jujutsu Kaisen", "Bleach", "One Piece"],
  },

  {
    numb: 5,
    question: "What is the correct way of linking a stylesheet to your HTML?",
    correct_answer: "link rel= href= ",
    answers: [
      "You can't",
      "link rel= href= ",
      "link href= ",
      " None of the above ",
    ],
  },
];

let que_count = 0;
let que_number = 1;
let seconds;
let quizScore = 0;
const next_button = quiz_cont.querySelector(".next");

const result_container = document.querySelector(".results-container");
const restart_test = result_container.querySelector(".buttons .restart-quiz");
const quit_test = result_container.querySelector(".buttons .quit-quiz");

quit_test.onclick = () => {
  window.location.reload();
};

restart_test.onclick = () => {
  result_container.classList.remove("activeResultBox");
  quiz_cont.classList.add("quizStart");
  let que_count = 0;
  let que_number = 1;
  let quizScore = 0;
  getQuestions(que_count);
  footer_counter(que_number);
  clearInterval(seconds);
  startClock(30);
  next_button.style.display = "none";
};

next_button.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_number++;
    getQuestions(que_count);
    footer_counter(que_number);
    console.log("Next Button Clicked");
    next_button.style.display = "none";
  } else {
    console.log("ALL QUESTIONS ANSWERED");
    showResultsContainer();
  }
};

function getQuestions(index) {
  const question_text = document.querySelector(".question");

  let que =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="answer">' +
    questions[index].answers[0] +
    "<span></span></div>" +
    '<div class="answer">' +
    questions[index].answers[1] +
    "<span></span></div>" +
    '<div class="answer">' +
    questions[index].answers[2] +
    "<span></span></div>" +
    '<div class="answer">' +
    questions[index].answers[3] +
    "<span></span></div>";
  question_text.innerHTML = que;
  options.innerHTML = option_tag;
  const ans = options.querySelectorAll(".answer");
  for (let i = 0; i < ans.length; i++) {
    ans[i].setAttribute("onclick", "answerSelected(this)");
  }
}

function answerSelected(answer) {
  let userPick = answer.textContent;
  let correctPick = questions[que_count].correct_answer;
  let allAnswers = options.children.length;
  if (userPick == correctPick) {
    quizScore += 1;
    console.log("Correct Answers: " + quizScore);
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {
    console.log("Answer is wrong.");
    answer.classList.add("wrong");

    for (let i = 0; i < allAnswers; i++) {
      if (options.children[i].textContent == correctPick) {
        options.children[i].setAttribute("class", "answer correct");
      }
    }
  }

  for (let i = 0; i < allAnswers; i++) {
    options.children[i].classList.add("disabled");
  }

  next_button.style.display = "block";
}

function showResultsContainer() {
  info_box.classList.remove("activeInfo");
  quiz_cont.classList.remove("quizStart");
  result_container.classList.add("activeResultBox");
  const scoreText = result_container.querySelector(".score");
  if (quizScore >= 4) {
    let score_text =
      "<span>Are you a genius? You got <p>" +
      quizScore +
      "</p> out of <p>" +
      questions.length +
      "</p>questions correct!</span>";
    scoreText.innerHTML = score_text;
  } else if (quizScore == 2 || quizScore == 3) {
    let score_text =
      "<span>Nice! You got <p>" +
      quizScore +
      "</p> out of <p>" +
      questions.length +
      "</p>questions correct!</span>";
    scoreText.innerHTML = score_text;
  } else {
    let score_text =
      "<span>Yikes... You got <p>" +
      quizScore +
      "</p> out of <p>" +
      questions.length +
      "</p>questions correct...</span>";
    scoreText.innerHTML = score_text;
  }
}

function startClock(time) {
  seconds = setInterval(timer, 1000);
  function timer() {
    timerCnt.textContent = time;
    time--;
    if (time < 9) {
      let zero = timerCnt.textContent;
      timerCnt.textContent = "0" + zero;
    }
    if (time <= 0) {
      clearInterval(seconds);
      timerCnt.textContent = "00";
      showResultsContainer();
    }
  }
}

function footer_counter(index) {
  const question_counter = quiz_cont.querySelector(".total-questions");

  let tot_q_count =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  question_counter.innerHTML = tot_q_count;
}
