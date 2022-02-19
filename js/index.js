/*----- constants -----*/
//Creating the deck of 52 cards and storing them in the cards array
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
suits.forEach((suit) => values.forEach((value) => cards.push(suit + value)));
//initial shuffling of the deck, feels like it does a bad job sometimes
cards = cards.sort(() => 0.5 - Math.random());
//split cards in to a deck for each player
let playerCards = cards.slice(26);
let cpuCards = cards.slice(0, 26);
console.log(cards);
console.log(cards.length);

/*----- app's state (variables) -----*/

const deck = [];
let playerDeck = [];
let cpuDeck = [];
let playerCard = "back-blue";
let cpuCard = "back-red";
let deckListDisplay = "";
let gameOver = null;

/*----- cached element references -----*/

let btnEl = document.getElementById("draw-card-btn");
let playerCardEl = document.querySelector("#player-card");
let cpuCardEl = document.querySelector("#cpu-card");
let playerTallyEl = document.querySelector(".player-tally");
let cpuTallyEl = document.querySelector(".cpu-tally");
let deckList = document.querySelector(".deck-list");

/*----- event listeners -----*/

btnEl.addEventListener("click", handleClick);

/*----- functions -----*/

//handle movings cards from hands to decks based on turn win/draw conditions
function handleClick() {
  let oldPlayerCard = playerCard;
  let oldCpuCard = cpuCard;
  playerCardEl.classList.remove("back-blue"); //fixed by moving player card and cpu card declaration global and as 'back-blue/red'
  cpuCardEl.classList.remove("back-red");

  playerCard = playerCards.pop();
  console.log("player card: " + playerCard);
  cpuCard = cpuCards.pop();
  console.log(`cpu card: ${cpuCard}`);

  let playerNum = playerCard[1];
  if (playerCard[2] != undefined) {
    playerNum += playerCard[2];
  }

  let cpuNum = cpuCard[1];
  if (cpuCard[2] != undefined) {
    cpuNum += cpuCard[2];
  }
  /// compare player vs cpu card, handle win and draw
  console.log(`${playerNum} vs ${cpuNum}`);
  if (cpuCard[1] == "J") {
    cpuNum = "11";
  }
  if (cpuCard[1] == "Q") {
    cpuNum = "12";
  }
  if (cpuCard[1] == "K") {
    cpuNum = "12";
  }
  if (cpuCard[1] == "A") {
    cpuNum = "13";
  }
  if (playerCard[1] == "J") {
    playerNum = "11";
  }
  if (playerCard[1] == "Q") {
    playerNum = "12";
  }
  if (playerCard[1] == "K") {
    playerNum = "12";
  }
  if (playerCard[1] == "A") {
    playerNum = "13";
  }

  if (playerCard[1] == "J") {
    console.log("Player jack!");
  }
  console.log(`${playerNum} vs ${cpuNum}`);
  if (cpuNum > playerNum) {
    cpuDeck.push(cpuCard);
    cpuDeck.push(playerCard);
    console.log("CPU wins");
  } else if (playerNum > cpuNum) {
    playerDeck.push(cpuCard);
    playerDeck.push(playerCard);
    console.log("Player wins");
  } else {
    console.log("Draw");
    cpuDeck.push(cpuCard);
    playerDeck.push(playerCard);
  }
  //if player or cpu runs out of cards, shuffle their deck
  if (playerCards.length == 0) {
    shuffle(playerDeck);
  }
  if (cpuCards.length == 0) {
    shuffle(cpuDeck);
  }
  //render function, actually did not have this seperated before so this is new
  function render() {
    playerTallyEl.textContent =
      "Player Cards: " + (playerCards.length + playerDeck.length);
    cpuTallyEl.textContent = "CPU Cards: " + (cpuCards.length + cpuDeck.length);
    // playerCardDisplay.textContent = "Player Card: " + playerCard;
    // cpuCardDisplay.textContent = "Cpu Card: " + cpuCard;
    playerCardEl.classList.remove(oldPlayerCard);
    cpuCardEl.classList.remove(oldCpuCard);
    playerCardEl.classList.add(playerCard);
    cpuCardEl.classList.add(cpuCard);
    // deckListDisplay = playerDeck + playerCards;

    deckListDisplay = playerDeck.join(", ") + ", " + playerCards.join(", ");
    //deckListDisplay.sort();
    // deckListDisplay = deckListDisplay.join(", ");
    if (deckListDisplay[0] == ",") {
      deckListDisplay = playerDeck.join(", ") + playerCards.join(", ");
    }
    deckListDisplay = deckListDisplay.toUpperCase();

    deckList.textContent = deckListDisplay;
  }
  render();
  //if cards == 0 shuffle player or cpu deck
  function shuffle(deck) {
    //my error with cards dissapearing was from a single = in this if statement
    if (deck == playerDeck) {
      playerDeck = playerDeck.sort(() => 0.5 - Math.random());
      playerCards = playerDeck;
      console.log("shufflign player deck");
      if (playerCards.length == 0) {
        alert("The Computer has won, get good.");
        gameOver = true;
      }
      playerDeck = [];
    }
    if (deck == cpuDeck) {
      cpuDeck = cpuDeck.sort(() => 0.5 - Math.random());
      cpuCards = cpuDeck;
      console.log("shufflign cpu deck");
      if (cpuCards.length == 0) {
        alert("You have won, good job.");
        gameOver = true;
      }
      cpuDeck = [];
    }
  }
}
function autoPlay() {
  if (gameOver != true) {
    //setInterval(handleClick, 1);
    handleClick();
  }
}
//add sound on shuffle

//found a bug, sometimes more than 1 turn is triggering at a time without being rendered
