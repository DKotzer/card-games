/*----- constants -----*/
//Creating the deck of 54 cards and storing them in the cards array
const suits = ["h", "s", "d", "c"];
const values = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let cards = [];
cards.push("joker");
cards.unshift("joker");
suits.forEach((suit) => values.forEach((value) => cards.push(suit + value)));
cards = cards.sort(() => 0.5 - Math.random());
let playerCards = cards.slice(27);
let cpuCards = cards.slice(0, 27);
console.log(cards);
console.log(cards.length);

/*----- app's state (variables) -----*/

let playerDeck = [];
let cpuDeck = [];
let playerCard = "back-blue";
let cpuCard = "back-red";
let deckListDisplay = "";
let gameOver = null;
let playerWarCard = "back-blue";
let playerWarCards = [];
let cpuWarCard = "back-red";
let cpuWarCards = [];
let delay = 4000;
let warState = false;
let oldPlayerCard = playerCard;
let oldCpuCard = cpuCard;

/*----- cached element references -----*/

let btnEl = document.getElementById("draw-card-btn");
let playerCardEl = document.querySelector("#player-card");
let cpuCardEl = document.querySelector("#cpu-card");
let playerTallyEl = document.querySelector(".player-tally");
let cpuTallyEl = document.querySelector(".cpu-tally");
let deckList = document.querySelector(".deck-list");
let playerWarCardEl = document.querySelector("#player-war-card");
let cpuWarCardEl = document.querySelector("#cpu-war-card");
let warAreaEl = document.querySelector(".warArea");
let warArea2El = document.querySelector(".warArea2");
let warArea3El = document.querySelector(".warArea3");
let warArea4El = document.querySelector(".warArea4");
let deckClickEl = document.querySelector("#player-card");
let cpuDeckEl = document.querySelector("#cpu-draw-pile");
let warTextEl = document.querySelector(".war");
let playerPileEl = document.querySelector("#player-pile");
let cpuPileEl = document.querySelector("#cpu-pile");

let shuffleSound = new Audio("sounds/shuffle.mp3");
let warSound = new Audio("sounds/warcry.mp3");
let doubleWarSound = new Audio("sounds/war.wav");
let clickSound = new Audio("sounds/click.mp3");

/*----- event listeners -----*/

btnEl.addEventListener("click", handleClick);
deckClickEl.addEventListener("click", handleClick);

/*----- functions -----*/

//handle the logic of each turn
function handleClick() {
  clickSound.play();
  if (playerCards.length == 0) {
    shuffle(playerDeck);
  }
  if (cpuCards.length == 0) {
    shuffle(cpuDeck);
  }
  oldPlayerCard = playerCard;
  oldCpuCard = cpuCard;

  playerCardEl.classList.remove("back-blue"); //fixed bug by moving player card and cpu card declaration global and as 'back-blue/red'
  cpuCardEl.classList.remove("back-red");

  playerCard = playerCards.pop();

  cpuCard = cpuCards.pop();

  let playerNum = playerCard[1];
  if (playerCard[2] != undefined) {
    playerNum += playerCard[2];
  }

  let cpuNum = cpuCard[1];
  if (cpuCard[2] != undefined) {
    cpuNum += cpuCard[2];
  }

  if (cpuCard[1] == "J") {
    cpuNum = "11";
  }
  if (cpuCard[1] == "Q") {
    cpuNum = "12";
  }
  if (cpuCard[1] == "K") {
    cpuNum = "13";
  }
  if (cpuCard[1] == "A") {
    cpuNum = "14";
  }
  if (cpuCard[0] == "j") {
    cpuNum = "15";
  }
  if (playerCard[1] == "J") {
    playerNum = "11";
  }
  if (playerCard[1] == "Q") {
    playerNum = "12";
  }
  if (playerCard[1] == "K") {
    playerNum = "13";
  }
  if (playerCard[1] == "A") {
    playerNum = "14";
  }
  if (playerCard[0] == "j") {
    playerNum = "15";
  }
  console.log(`${playerNum} vs ${cpuNum}`);
  if (cpuNum > playerNum) {
    cpuDeck.push(cpuCard);
    cpuDeck.push(playerCard);
    console.log("CPU wins round");
  } else if (playerNum > cpuNum) {
    playerDeck.push(cpuCard);
    playerDeck.push(playerCard);
    console.log("Player wins round");
  } else {
    console.log("War!");
    war();
  }
  //if player or cpu runs out of cards, shuffle their deck

  function war() {
    warState = true;
    btnEl.disabled = true;
    deckClickEl.removeEventListener("click", handleClick);
    setTimeout(() => {
      warArea2El.classList.remove("hidden");
      clickSound.play();
    }, 500);
    setTimeout(() => {
      warArea3El.classList.remove("hidden");
      clickSound.play();
    }, 1000);
    setTimeout(() => {
      warArea4El.classList.remove("hidden");
      clickSound.play();
    }, 1500);
    setTimeout(() => {
      warAreaEl.classList.remove("hidden");
      clickSound.play();
    }, 2000);

    warSound.play();

    // let oldPlayerWarCard = playerWarCard;
    // let oldCpuWarCard = cpuWarCard;
    function resetWar() {
      playerWarCardEl.classList = "card large back-blue";
      cpuWarCardEl.classList = "card large back-red";
      warState = false;
      btnEl.disabled = false;
      deckClickEl.addEventListener("click", handleClick);
      playerWarArrayFix = [];
      cpuWarArrayFix = [];
      warAreaEl.classList.add("hidden");
      warArea2El.classList.add("hidden");
      warArea3El.classList.add("hidden");
      warArea4El.classList.add("hidden");
    }

    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }

    playerWarCards.push(playerCards.pop());
    cpuWarCards.push(cpuCards.pop());

    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }
    playerWarCards.push(playerCards.pop());
    cpuWarCards.push(cpuCards.pop());

    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }
    playerWarCards.push(playerCards.pop());
    cpuWarCards.push(cpuCards.pop());

    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }

    playerWarCard = playerCards.pop();
    cpuWarCard = cpuCards.pop();

    // console.log(`cpu war card: ${cpuWarCard}`);
    playerWarCardEl.classList.remove("back-blue");
    playerWarCardEl.classList.add(playerWarCard);
    cpuWarCardEl.classList.remove("back-red");
    cpuWarCardEl.classList.add(cpuWarCard);

    let playerWarNum = playerWarCard[1];
    if (playerWarCard[2] != undefined) {
      playerWarNum += playerWarCard[2];
    }

    let cpuWarNum = cpuWarCard[1];
    if (cpuWarCard[2] != undefined) {
      cpuWarNum += cpuWarCard[2];
    }

    if (cpuWarCard[1] == "J") {
      cpuWarNum = "11";
    }
    if (cpuWarCard[1] == "Q") {
      cpuWarNum = "12";
    }
    if (cpuWarCard[1] == "K") {
      cpuWarNum = "13";
    }
    if (cpuWarCard[1] == "A") {
      cpuWarNum = "14";
    }
    if (playerWarCard[1] == "J") {
      playerWarNum = "11";
    }
    if (playerWarCard[1] == "Q") {
      playerWarNum = "12";
    }
    if (playerWarCard[1] == "K") {
      playerWarNum = "13";
    }
    if (playerWarCard[1] == "A") {
      playerWarNum = "14";
    }

    console.log(`War ${playerWarNum} vs ${cpuWarNum}`);
    if (cpuWarNum > playerWarNum) {
      cpuDeck.push(cpuCard);
      cpuDeck.push(playerCard);
      cpuDeck.push(playerWarCard);

      cpuDeck.push(playerWarCards);
      cpuDeck.push(cpuWarCards);

      cpuDeck.push(cpuWarCard);
      cpuDeck = [].concat.apply([], cpuDeck);
      playerWarCards = [];
      playerWarCard = []; // having this as "" instead of [] was breaking the game
      cpuWarCards = [];
      cpuWarCard = [];

      console.log("CPU wins the WAR");
      setTimeout(resetWar, delay);
    } else if (playerWarNum > cpuWarNum) {
      playerDeck.push(cpuCard);
      playerDeck.push(playerCard);
      playerDeck.push(cpuWarCard);
      playerDeck.push(cpuWarCards);
      playerDeck.push(playerWarCards);

      playerDeck.push(playerWarCard);
      playerDeck = [].concat.apply([], playerDeck);
      playerWarCards = [];
      cpuWarCards = [];
      cpuWarCard = [];
      playerWarCard = [];

      console.log("Player wins the WAR");
      setTimeout(resetWar, delay);
    } else {
      console.log(`War ${playerWarNum} vs ${cpuWarNum}`);
      console.log("Double War!");
      warTextEl.style.color = "blue";
      setTimeout(() => (warTextEl.style.color = "red"), 1200);
      playerWarCards.push(playerWarCard);
      cpuWarCards.push(cpuWarCard);
      console.log("player war cards: " + playerWarCards);
      cpuWarCard = [];
      playerWarCard = [];
      setTimeout(resetWar, 3500);
      doubleWarSound.play();
      warState = true;
      war();
    }
    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }
  }

  function render() {
    playerTallyEl.textContent =
      "Player Cards: " + (playerCards.length + playerDeck.length);
    cpuTallyEl.textContent = "CPU Cards: " + (cpuCards.length + cpuDeck.length);
    playerCardEl.classList.remove(oldPlayerCard);
    cpuCardEl.classList.remove(oldCpuCard);
    playerCardEl.classList.add(playerCard);
    cpuCardEl.classList.add(cpuCard);
    cpuCardEl.classList.add("animated");
    playerCardEl.classList.add("animated");
    setTimeout(timeOut, 1200);

    function timeOut() {
      cpuPileEl.classList = cpuCardEl.classList;
      playerPileEl.classList = playerCardEl.classList;
      cpuPileEl.classList.remove("animated");
      playerPileEl.classList.remove("animated");
      cpuCardEl.classList.remove("animated");
      playerCardEl.classList.remove("animated");
      playerCardEl.classList.add("back-blue"); //fixed by moving player card and cpu card declaration global and as 'back-blue/red'
      cpuCardEl.classList.add("back-red");
    }

    deckListDisplay = playerDeck.concat(playerCards);
    deckListDisplay.sort();
    deckListDisplay = deckListDisplay.toString();
    if (deckListDisplay[0] == ",") {
      deckListDisplay = playerDeck.join(", ") + playerCards.join(", "); //surely there is a better way to do this
    }
    deckListDisplay = deckListDisplay.toUpperCase();
    deckListDisplay = deckListDisplay.replaceAll("H", "&hearts;"); //https://blog.pokercopilot.com/2017/01/how-to-use-card-suit-symbols-%E2%99%A5%E2%99%A6%E2%99%A0%E2%99%A3-on-your-computer
    deckListDisplay = deckListDisplay.replaceAll("D", "&diams;");
    deckListDisplay = deckListDisplay.replaceAll("S", "&spades;");
    deckListDisplay = deckListDisplay.replaceAll("C", "&clubs;");
    deckListDisplay = deckListDisplay.replaceAll("0", "");
    deckListDisplay = deckListDisplay.replaceAll("1", "10");
    deckListDisplay = deckListDisplay.replaceAll("JOKER", "Joker");
    deckListDisplay = deckListDisplay.replaceAll(",", " ");
    deckList.innerHTML = deckListDisplay;
  }
  render();

  function shuffle(deck) {
    if (deck == playerDeck) {
      playerDeck = playerDeck.sort(() => 0.5 - Math.random());
      playerCards = playerDeck;
      console.log("shufflign player deck");
      shuffleSound.play();
      if (playerCards.length == 0) {
        render();
        alert("The Computer has won, get good.");
        location.href = "index.html";
        gameOver = true;
      }
      playerDeck = [];
    }
    if (deck == cpuDeck) {
      cpuDeck = cpuDeck.sort(() => 0.5 - Math.random());
      cpuCards = cpuDeck;
      console.log("shufflign cpu deck");
      shuffleSound.play();
      if (cpuCards.length == 0) {
        alert("You have won, good job.");
        location.href = "index.html";
        gameOver = true;
      }
      cpuDeck = [];
    }
  }
}
function autoPlay() {
  if (gameOver != true) {
    delay = 100;
    setInterval(handleClick, delay);
  }
}
