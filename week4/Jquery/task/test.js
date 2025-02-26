$(document).ready(function () {
  const userForm = $("#userForm");
  const emailInput = $("#email");
  const phoneInput = $("#phone");
  const emailError = $("#emailError");
  const phoneError = $("#phoneError");
  
  const startScreen = $("#startScreen");
  const quizScreen = $("#quizScreen");
  const resultScreen = $("#resultScreen");
  
  const questionCounter = $("#questionCounter");
  const questionText = $("#questionText");
  const optionsContainer = $("#optionsContainer");
  const nextButton = $("#nextButton");
  
  const finalScore = $("#finalScore");
  const restartButton = $("#restartButton");

  const questions = [  { 
      question: "What does HTML stand for?", 
      options: ["HyperText Markup Language", "High-Level Text Machine Learning", "Hyper Transfer Markup Language", "Home Tool Markup Language"], 
      answer: "HyperText Markup Language" 
  },
  { 
      question: "Which HTML tag is used to define a paragraph?", 
      options: ["<p>", "<h1>", "<div>", "<span>"], 
      answer: "<p>" 
  },
  { 
      question: "Which property is used to change the text color in CSS?", 
      options: ["color", "text-color", "font-color", "background"], 
      answer: "color" 
  },
  { 
      question: "What is the correct way to include an external CSS file?", 
      options: ["<style src='styles.css'>", "<css>styles.css</css>", "<link rel='stylesheet' href='styles.css'>", "<script href='styles.css'>"], 
      answer: "<link rel='stylesheet' href='styles.css'>" 
  },
  { 
      question: "Which CSS property controls the spacing between elements?", 
      options: ["margin", "padding", "spacing", "border"], 
      answer: "margin" 
  },
  { 
      question: "What is the default display property of a <div> element?", 
      options: ["inline", "block", "flex", "grid"], 
      answer: "block" 
  },
  { 
      question: "Which HTML tag is used to create a hyperlink?", 
      options: ["<a>", "<link>", "<href>", "<hyper>"], 
      answer: "<a>" 
  },
  { 
      question: "Which CSS property is used to make text bold?", 
      options: ["font-weight", "text-style", "bold", "font-bold"], 
      answer: "font-weight" 
  },
  { 
      question: "Which unit is not a valid CSS length unit?", 
      options: ["px", "em", "cm", "dp"], 
      answer: "dp" 
  },
  { 
      question: "Which of the following is used to make a responsive website?", 
      options: ["@media", "div", "table", "h1"], 
      answer: "@media" 
  }];
  
  let currentQuestionIndex = 0;
  let score = 0;

  function validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validatePhone(phone) {
      return /^[0-9]{10}$/.test(phone);
  }

  userForm.submit(function (event) {
      event.preventDefault();

      const email = emailInput.val().trim();
      const phone = phoneInput.val().trim();

      if (!validateEmail(email)) {
          emailError.text("Invalid email format");
          return;
      } else {
          emailError.text("");
      }

      if (!validatePhone(phone)) {
          phoneError.text("Enter a 10-digit phone number");
          return;
      } else {
          phoneError.text("");
      }

      startScreen.addClass("hidden");
      quizScreen.removeClass("hidden");

      if (questions.length === 0) {
          quizScreen.html("<p class='text-red-500'>Try again later. No questions available.</p><button id='returnHome' class='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Return Home</button>");
          
          $("#returnHome").click(function () {
              quizScreen.addClass("hidden");
              startScreen.removeClass("hidden");
          });
          return;
      }
      
      loadQuestion();
  });

  function loadQuestion() {
      if (currentQuestionIndex < questions.length) {
          const currentQuestion = questions[currentQuestionIndex];
          questionCounter.text(`Question ${currentQuestionIndex + 1} of ${questions.length}`);
          questionText.text(currentQuestion.question);
          optionsContainer.empty();

          $.each(currentQuestion.options, function (index, option) {
              let optionElement = `<div>
                  <label class="flex items-center space-x-2">
                      <input type="radio" name="answer" value="${option}" class="form-radio">
                      <span>${$('<div/>').text(option).html()}</span>
                  </label>
              </div>`;
              optionsContainer.append(optionElement);
          });
      } else {
          showResults();
      }
  }

  nextButton.click(function () {
      const selectedOption = $("input[name='answer']:checked");
      if (selectedOption.length === 0) {
          alert("Please select an answer before proceeding.");
          return;
      }

      if (selectedOption.val() === questions[currentQuestionIndex].answer) {
          score++;
      }

      currentQuestionIndex++;
      loadQuestion();
  });

  function showResults() {
      quizScreen.addClass("hidden");
      resultScreen.removeClass("hidden");
      let percentage = (score / questions.length) * 100;
      finalScore.text(`You scored ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`);
  }

  restartButton.click(function () {
      resultScreen.addClass("hidden");
      startScreen.removeClass("hidden");
      currentQuestionIndex = 0;
      score = 0;
  });
});