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

/*----- cached element references -----*/

let btnEl = document.getElementById("draw-card-btn");
let playerCardEl = document.querySelector("#player-card");
let cpuCardEl = document.querySelector("#cpu-card");
let playerTallyEl = document.querySelector(".player-tally");
let cpuTallyEl = document.querySelector(".cpu-tally");

/*----- event listeners -----*/

btnEl.addEventListener("click", handleClick);

/*----- functions -----*/

//handle movings cards from hands to decks based on turn win/draw conditions
function handleClick() {
  let oldPlayerCard = playerCard;
  let oldCpuCard = cpuCard;
  playerCardEl.classList.remove("back-blue"); //fixed issue by moving player card and cpu card declaration global and as 'back-blue/red'
  cpuCardEl.classList.remove("back-red");

  playerCard = playerCards.pop();
  console.log("player card: " + playerCard);
  cpuCard = cpuCards.pop();
  console.log(`cpu card: ${cpuCard}`);
  cpuDeck.push(cpuCard);
  playerDeck.push(playerCard);

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
  //render function, actually did not have this seperated before so this is new
  function render() {
    playerTallyEl.textContent = "Player Card: " + playerCard;
    cpuTallyEl.textContent = "Cpu Card: " + cpuCard;

    playerCardEl.classList.remove(oldPlayerCard);
    cpuCardEl.classList.remove(oldCpuCard);
    playerCardEl.classList.add(playerCard);
    cpuCardEl.classList.add(cpuCard);
  }
  render();
}
