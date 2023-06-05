function showBlock() {
    // получаем все блоки с классом "block"
    let blocks = document.querySelectorAll('.kviz');
    // скрываем все блоки
    blocks.forEach(block => block.style.display = 'none');
    // показываем нужный блок
    document.querySelector('#block2').style.display = 'block';
};




const quizData = [
    {
      question: "Кто написал роман 'Война и мир'?",
      options: [
        { answer: "Лев Толстой", correct: true },
        { answer: "Федор Достоевский", correct: false },
        { answer: "Иван Тургенев", correct: false },
      ],
    },
    {
      question: "Какое животное является символом мира?",
      options: [
        { answer: "Орел", correct: false },
        { answer: "Голубь", correct: true },
        { answer: "Медведь", correct: false },
      ],
    },
    {
      question: "В каком году произошла Октябрьская революция?",
      options: [
        { answer: "1917", correct: true },
        { answer: "1918", correct: false },
        { answer: "1919", correct: false },
      ],
    },
    {
      question: "Какой горный хребет является самым высоким на Земле?",
      options: [
        { answer: "Альпы", correct: false },
        { answer: "Анды", correct: false },
        { answer: "Гималаи", correct: true },
      ],
    },
    {
      question: "Как называется столица Италии?",
      options: [
        { answer: "Париж", correct: false },
        { answer: "Лондон", correct: false },
        { answer: "Рим", correct: true },
      ],
    },
    {
      question: "Кто является автором сказки 'Питер Пэн'?",
      options: [
        { answer: "Льюис Кэрролл", correct: false },
        { answer: "Джон Толкин", correct: false },
        { answer: "Джеймс Барри", correct: true },
      ],
    },
    {
      question: "Как называется первый космический корабль, запущенный в космос с человеком на борту?",
      options: [
        { answer: "Союз", correct: false },
        { answer: "Восток", correct: true },
        { answer: "Аполлон", correct: false },
      ],
    },
    {
      question: "Как называется ежегодный кинофестиваль, проходящий в Каннах?",
      options: [
        { answer: "Венецианский кинофестиваль", correct: false },
        { answer: "Берлинский кинофестиваль", correct: false },
        { answer: "Каннский кинофестиваль", correct: true },
      ],
    },
    {
      question: "Как звали знаменитого футболиста, который выступал за сборную Бразилии и назывался 'Король футбола'?",
      options: [
        { answer: "Пеле", correct: true },
        { answer: "Марадона", correct: false },
        { answer: "Зидан", correct: false },
      ],
    },
    {
      question: "Сколько игроков в одной команде в футболе?",
      options: [
        { answer: "10", correct: false },
        { answer: "11", correct: true },
        { answer: "12", correct: false },
      ],
    },
  ];

  const quizForm = document.getElementById("quiz");
  const questionWrapper = document.querySelector(".question-wrapper");
  const feedbackWrapper = document.querySelector(".feedback-wrapper");
  let score = 0;

  function createQuestion(index) {
    const questionData = quizData[index];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `
      <div>${questionData.question}</div>
      <div class="options">
        ${questionData.options
          .map(
            (option, optionIndex) =>
              `<label class="option__label">
                <input class="option__input" type="radio" name="q${index}" value="${optionIndex}">
                <p class="option__p">${option.answer}</p>
              </label>`
          )
          .join("")}
      </div>
    `;
    questionWrapper.appendChild(questionElement);
  }

  function getSelectedAnswer(index) {
    const questionData = quizData[index];
    const selectedOption = quizForm.elements[`q${index}`].value;
    if (questionData.options[selectedOption].correct) {
      score++;
    }
  }

  function showFeedback() {
    const totalQuestions = quizData.length;
    const correctAnswers = score;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const feedbackElement = document.createElement("div");
    feedbackElement.className = "feedback";
    if (percentage >= 80) {
      feedbackElement.innerHTML = `
      <h1 class="main__text">Результаты тестирования</h1>
    <div class="feedback__block_text">
        <p class="feedback__imy">Константин Константинопольский</p>
        <p class="feedback__date">20.01.2020</p>
    </div>
   
    <div class="feedback__block">
        <div class="feedback__block_rez">
            <label for="" class="feedback__label_one">Результат попытки</label>
        </div>
      
      <div class="feedback__block_numder">
        <label for="" class="feedback__poloshitel_two">${correctAnswers}/${totalQuestions}</label> 
        <label class="feedback__poloshitel_three">${percentage}%</label>
      </div>
      
      
    </div>
    <p class="feedback__otv">Отличный результат!</p>`;
    } else {
      feedbackElement.innerHTML = `
      <h1 class="main__text">Результаты тестирования</h1>
    <div class="feedback__block_text">
        <p class="feedback__imy">Константин Константинопольский</p>
        <p class="feedback__date">20.01.2020</p>
    </div>
   
    <div class="feedback__block">
        <div class="feedback__block_rez">
            <label for="" class="feedback__label_one">Результат попытки</label>
        </div>
      
      <div class="feedback__block_numder">
        <label for="" class="feedback__label_two">${correctAnswers}/${totalQuestions}</label> 
        <label class="feedback__label_three">${percentage}%</label>
      </div>
      
      
    </div>
    <p class="feedback__otv">Не очень хороший результат, рекомендуем изучить курс еще раз.</p>`;
      const bestScore = localStorage.getItem("bestScore");
      if (bestScore !== null && bestScore >= percentage) {
        feedbackElement.innerHTML += ` Ваш лучший результат: ${bestScore}%`;
      } else {
        localStorage.setItem("bestScore", percentage);
      }
    }
    feedbackWrapper.appendChild(feedbackElement);
    const retryElement = document.createElement("div");
    retryElement.className = "retry";
    retryElement.innerHTML =
      '<button class="feedback__button" onclick="location.reload()">Повторить тест</button>';
    feedbackWrapper.appendChild(retryElement);
  }

  function onSubmitQuiz(event) {
    event.preventDefault();
    for (let i = 0; i < quizData.length; i++) {
      getSelectedAnswer(i);
    }
    questionWrapper.style.display = "none";
    showFeedback();
  }

  function init() {
    for (let i = 0; i < quizData.length; i++) {
      createQuestion(i);
    }
    quizForm.addEventListener("submit", onSubmitQuiz);
  }

  init();