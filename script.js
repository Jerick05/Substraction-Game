const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const scoreEl = document.getElementById("score");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let score = 0;
let correctAnswer = 0;

// Generate a new subtraction question
function newQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * num1) + 1;
    correctAnswer = num1 - num2;

    questionEl.textContent = `What is ${num1} - ${num2}?`;

    generateChoices();
}

// Generate answer choices
function generateChoices() {
    choicesEl.innerHTML = "";
    let options = [correctAnswer];

    while (options.length < 3) {
        let randomOption = Math.floor(Math.random() * 10);
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(choice => {
        const button = document.createElement("button");
        button.classList.add("choice");
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice, button);
        choicesEl.appendChild(button);
    });
}

// Show Confetti Animation 🎉
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Flash Red Background for Wrong Answer
function flashRed(button) {
    button.style.backgroundColor = "red";
    setTimeout(() => {
        button.style.backgroundColor = "lightblue";
    }, 500);
}

// Check the player's answer
function checkAnswer(choice, button) {
    if (choice === correctAnswer) {
        score++;
        scoreEl.textContent = "Score: " + score;

        // Play correct sound & show confetti
        correctSound.play();
        showConfetti();
    } else {
        // Play wrong sound & flash red effect
        wrongSound.play();
        flashRed(button);
    }

    // Wait a bit before showing the next question
    setTimeout(newQuestion, 800);
}

// Start the game
newQuestion();
