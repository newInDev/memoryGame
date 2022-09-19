import easy from "./easy.js";
import medium from "./medium.js";
import hard from "./hard.js";

//Buttons on start Page
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const playAgain = document.getElementById("playAgain");
const nextLevel = document.getElementById("nextLevel");

//Texts
const gameNameResult = document.querySelector(".game_name");

//Html Pages
const startPage = document.querySelector(".start__page");
const gameBoard = document.querySelector(".game__board__container");
const gameBoardDesign = document.querySelector(
  ".game__board__container__design"
);
const resultDisplay = document.querySelector(".result__display");

//timer Dom Elements
const timerContainer = document.querySelector(".timer__container");
const timerDisplay = document.querySelector(".timer");
const timerCircle = document.querySelector(".timer__circle");

//Audio
const loserAudio = new Audio("audio/Looser.mp3");
const sameCardAudio = new Audio("audio/buzer.mp3");
const foundMatchAudio = new Audio("audio/Sparkle.mp3");
const winAudio = new Audio("audio/Applause.mp3");

//For Timer
let minute;
let second;
let mileSeconds;
let timer;

//Game level
let gameLevel;
let gameWonOrNot;

//For Game Logic
let picsArr = [];
let cardChosen = [];
let cardChoseId = [];
let cardWon = [];

//Functions

//Function For preparing table for Game
const preparingTable = function () {
  startPage.classList.add("hide");
  gameBoard.classList.remove("hide");
  timerContainer.classList.remove("hide");
  document.querySelector(".game__board").innerHTML = "";
};

const displayresult = function () {
  console.log(gameWonOrNot);
  gameWonOrNot
    ? nextLevel.classList.remove("hide")
    : nextLevel.classList.add("hide");

  if (gameWonOrNot) {
    gameNameResult.textContent = "Congs You Won!";
  } else {
    gameNameResult.textContent = "Game Over";
  }

  gameWonOrNot ? winAudio.play() : loserAudio.play();

  // loserAudio.play();
  gameBoard.classList.add("hide");
  resultDisplay.classList.remove("hide");
  startPage.classList.remove("hide");
  document
    .querySelector(".start__page__game__start__box")
    .classList.add("hide");
  // gameNameResult.textContent = "Game Over";
  // timerContainer.classList.add("hide");
  timerCircle.classList.remove("animation");
};

const rePlay = function () {
  if (gameLevel === "easy") {
    preparingTable();

    resultDisplay.classList.add("hide");
    document.querySelector(".game__board").innerHTML = "";
    easyGame();
  } else if (gameLevel === "medium") {
    preparingTable();

    resultDisplay.classList.add("hide");
    document.querySelector(".game__board").innerHTML = "";
    mediumGame();
  } else if (gameLevel === "hard") {
    preparingTable();

    resultDisplay.classList.add("hide");
    document.querySelector(".game__board").innerHTML = "";
    hardGame();
  }
};

//Timer Logic
const setTimer = function () {
  timerCircle.style.borderColor = "#00ffab";
  timerDisplay.style.color = "black";
  timer = setInterval(() => {
    document.getElementById(
      "timerandMinutes"
    ).textContent = `${minute}:${second}`;
    if (minute === 0 && second === 0) {
      document.getElementById("timerandMinutes").textContent = `Time Lapsed`;
      timerCircle.style.borderColor = "#EB1D36";
      clearInterval(timer);
      displayresult();
      gameWonOrNot = false;
    } else if (second === 0) {
      minute--;
      second = 59;
    } else {
      if (minute == 0 && second == 59) {
        // timerDisplay.style.color = "blue";
        // timerCircle.style.borderColor = "blue";
      }

      if (minute == 0 && second < 20) {
        timerDisplay.style.color = "#FFC300";
        timerCircle.style.borderColor = "#FFC300";
      }

      if (minute == 0 && second < 10) {
        timerDisplay.style.color = "#EB1D36";
        timerCircle.style.borderColor = "#EB1D36";
      }
      second--;
    }
  }, mileSeconds);
};

//Gme Logic
function game(arr) {
  cardWon = [];
  const table = document.querySelector(".game__board");
  picsArr = arr.sort(() => {
    return 0.5 - Math.random();
  });
  setTable(table);
}

const setTable = function (table) {
  for (let i = 0; i < picsArr.length; i++) {
    const cards = document.createElement("img");
    cards.setAttribute("src", `images/${gameLevel}Blank.jpeg`);
    cards.setAttribute("data-id", i);
    cards.addEventListener("click", flipCard);
    table.appendChild(cards);
  }
};

const flipCard = function (arr) {
  let cardId = this.getAttribute("data-id");
  cardChoseId.push(cardId);
  cardChosen.push(picsArr[cardId].name);
  this.setAttribute("src", picsArr[cardId].img);

  if (cardChosen.length === 2) {
    setTimeout(chekWin, 500);
  }
};

const chekWin = function () {
  let cardOption1 = cardChoseId[0];
  let cardOption2 = cardChoseId[1];
  let card = document.querySelectorAll("img");

  if (cardOption1 === cardOption2) {
    card[cardOption1].setAttribute("src", `images/${gameLevel}Blank.jpeg`);
    card[cardOption2].setAttribute("src", `images/${gameLevel}Blank.jpeg`);
    sameCardAudio.play();
  } else if (cardChosen[0] === cardChosen[1]) {
    card[cardOption1].classList.add("fade__picture");
    card[cardOption2].classList.add("fade__picture");
    card[cardOption1].removeEventListener("click", flipCard);
    card[cardOption2].removeEventListener("click", flipCard);
    cardWon.push(cardChosen);
    foundMatchAudio.play();
  } else {
    card[cardOption1].setAttribute("src", `images/${gameLevel}Blank.jpeg`);
    card[cardOption2].setAttribute("src", `images/${gameLevel}Blank.jpeg`);
  }
  cardChoseId = [];
  cardChosen = [];

  if (cardWon.length === picsArr.length / 2) {
    timerContainer.classList.add("hide");
    gameWonOrNot = true;
    foundMatchAudio.pause();
    displayresult();
    clearInterval(timer);
    cardWon = [];
  }
};

//1. Function For Easy game
const easyGame = function () {
  preparingTable();

  minute = 0;
  second = 15;
  mileSeconds = 1000;
  document.getElementById(
    "timerandMinutes"
  ).textContent = `${minute}:${second}`;
  gameLevel = "easy";

  game(easy);
  setTimer();
};

const mediumGame = function () {
  preparingTable();
  gameBoardDesign.style.width = "600px";
  gameLevel = "medium";

  minute = 0;
  second = 30;
  mileSeconds = 1000;
  document.getElementById(
    "timerandMinutes"
  ).textContent = `${minute}:${second}`;
  game(medium);
  setTimer();
};

const hardGame = function () {
  preparingTable();
  gameBoardDesign.style.width = "850px";
  gameLevel = "hard";

  minute = 1;
  second = 0;
  mileSeconds = 1000;
  document.getElementById(
    "timerandMinutes"
  ).textContent = `${minute}:${second}`;
  game(hard);
  setTimer();
};

//Listiners
easyButton.addEventListener("click", easyGame);

mediumButton.addEventListener("click", mediumGame);

hardButton.addEventListener("click", hardGame);

playAgain.addEventListener("click", function () {
  rePlay();
});

nextLevel.addEventListener("click", function () {
  if (gameLevel === "easy") {
    mediumGame();
  } else if (gameLevel === "medium") {
    hardGame();
  } else if (gameLevel === "hard") {
    gameNameResult.textContent = "Sorry, No more Levels Yet!";
    setTimeout(() => {
      gameNameResult.textContent = "Memory Game";
      startPage.classList.remove("hide");
      document
        .querySelector(".start__page__game__start__box")
        .classList.remove("hide");
      gameBoard.classList.add("hide");
      resultDisplay.classList.add("hide");
    }, 2000);
  }
});
