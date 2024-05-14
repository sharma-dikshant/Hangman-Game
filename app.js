const wordElement = document.getElementById("word");
const wrongLetterElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word

function displayWord() {
  wordElement.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
               <span class="letter"> ${
                 correctLetters.includes(letter) ? letter : ""
               }    </span>
            `
          )
          .join("")}
    `;

  //   console.log(wordElement.innerText); // this is adding a next line
  // to remove next line
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  console.log(innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerHTML = "congrulations! YOU WON";
    popup.style.display = "flex";
  }
}

//update the wrond letter

function updateWrongLetterElement() {
  // display wrong letters
  wrongLetterElement.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  //displaying parts

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You Lost!";
    popup.style.display = "flex";
  }
}

function ShowNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// adding keydown functionality

window.addEventListener("keydown", (e) => {
  // check if the pressed key is letter or not
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // console.log("correct");
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        ShowNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterElement();
      } else {
        ShowNotification();
      }
    }
  }
});

// Restart game

playAgainBtn.addEventListener("click", () => {
  //emptying the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterElement();
  popup.style.display = "none";
});

displayWord();
