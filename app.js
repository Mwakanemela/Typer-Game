const input = document.querySelector(".wordInput");
const generateButton = document.querySelector(".generate");
const replayButton = document.querySelector(".replay");
let randomWord = document.querySelector(".randomWord");
let countDown = document.querySelector(".countdown");

let wordArray = [
  "Mwaka",
  "Mwakanemela",
  "Kayange",
  "Mwakanemela kayange",
  "JavaScript",
  "Node.js",
  "React",
  "Python",
  "Git",
  "VSCode",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledArray = shuffleArray(wordArray);

let count = 5;

function inputGame() {
  generateButton.addEventListener("click", (e) => {
    e.preventDefault();

    input.value = "";
    count = 5;

    if (shuffledArray.length === 0) {
      shuffledArray = shuffleArray([...wordArray]); // Re-shuffle if all words are used
    }

    const randomArray = shuffledArray.pop();
    randomWord.innerHTML = randomArray;

    const countdownInterval = setInterval(() => {
      if (count > 0) {
        count--;
        countDown.innerHTML = "Count-down: " + count;
      }

      if (count === 0) {
        clearInterval(countdownInterval);
        countDown.innerHTML = "Time up!!";

        // Check for correctness when time is up
        if (input.value !== randomArray) {
          randomWord.innerHTML = "You Lost! Better luck next time. 😢";
        }
      }
    }, 1000);

    input.addEventListener("input", () => {
      if (input.value === randomArray && count !== 0) {
        clearInterval(countdownInterval);
        randomWord.innerHTML = "You're a Genius! You WON 🎉";
      }
    });
  });
}

inputGame();
