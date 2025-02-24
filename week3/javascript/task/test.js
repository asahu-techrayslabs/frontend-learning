document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  
  const startScreen = document.getElementById("startScreen");
  const quizScreen = document.getElementById("quizScreen");
  const resultScreen = document.getElementById("resultScreen");
  
  const questionCounter = document.getElementById("questionCounter");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const nextButton = document.getElementById("nextButton");
  
  const finalScore = document.getElementById("finalScore");
  const restartButton = document.getElementById("restartButton");

  const questions = [
    
        { 
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
        }
    ];
    

  
  let currentQuestionIndex = 0;
  let score = 0;

  function validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validatePhone(phone) {
      return /^[0-9]{10}$/.test(phone);
  }

  userForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!validateEmail(email)) {
          emailError.textContent = "Invalid email format";
          return;
      } else {
          emailError.textContent = "";
      }

      if (!validatePhone(phone)) {
          phoneError.textContent = "Enter a 10-digit phone number";
          return;
      } else {
          phoneError.textContent = "";
      }

      startScreen.classList.add("hidden");
      quizScreen.classList.remove("hidden");

      loadQuestion();
  });

  function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.innerHTML = `
                <label class="flex items-center space-x-2">
                    <input type="radio" name="answer" value="${option}" class="form-radio">
                    <span>${option.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
                </label>
            `;
            optionsContainer.appendChild(optionElement);
        });
    } else {
        showResults();
    }
}


  nextButton.addEventListener("click", function () {
      const selectedOption = document.querySelector("input[name='answer']:checked");
      if (!selectedOption) {
          alert("Please select an answer before proceeding.");
          return;
      }

      if (selectedOption.value === questions[currentQuestionIndex].answer) {
          score++;
      }

      currentQuestionIndex++;
      loadQuestion();
  });

  function showResults() {
      quizScreen.classList.add("hidden");
      resultScreen.classList.remove("hidden");
      let percentage = (score / questions.length) * 100;
      finalScore.textContent = `You scored ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`;
  }

  restartButton.addEventListener("click", function () {
      resultScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
      currentQuestionIndex = 0;
      score = 0;
  });
});
