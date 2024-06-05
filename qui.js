const quizData = [
  {
    question: 'What is Java?',
    options: ['A programming language', 'A type of coffee', 'An island in Indonesia', 'A type of tree'],
    answer: 'A programming language',
  },
  {
    question: 'Which company developed Java?',
    options: ['Microsoft', 'Apple', 'Sun Microsystems', 'Google'],
    answer: 'Sun Microsystems',
  },
  {
    question: 'When was Java first released?',
    options: ['1995', '2000', '1990', '2005'],
    answer: '1995',
  },
  {
    question: 'What is the main purpose of the "static" keyword in Java?',
    options: ['To create a new instance of a class', 'To indicate that a variable or method belongs to the class, not instances of the class', 'To specify the entry point of a Java program', 'To allow a method to be overridden'],
    answer: 'To indicate that a variable or method belongs to the class, not instances of the class',
  },
  {
    question: 'What does JVM stand for?',
    options: ['Java Virtual Machine', 'Java Variable Manager', 'Java Virtual Method', 'Java Visual Model'],
    answer: 'Java Virtual Machine',
  },
  {
    question: 'Which method is called when an object is created?',
    options: ['initialize()', 'construct()', 'start()', 'constructor()'],
    answer: 'constructor()',
  },
  {
    question: 'What is the default value of a boolean variable in Java?',
    options: ['true', 'false', '0', 'null'],
    answer: 'false',
  },
  {
    question: 'What is the parent class of all classes in Java?',
    options: ['Object', 'Main', 'Super', 'Parent'],
    answer: 'Object',
  },
  {
    question: 'Which of the following is not a primitive data type in Java?',
    options: ['int', 'boolean', 'array', 'float'],
    answer: 'array',
  },
  {
    question: 'What is the keyword used to refer to the current object in Java?',
    options: ['this', 'self', 'Me', 'current'],
    answer: 'this',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

