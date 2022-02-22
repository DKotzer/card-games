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
// for (i = 0; i < deckCount; i++) {
//   suits.forEach((suit) => values.forEach((value) => cards.push(suit + value)));  //something like this when you add in deck count
// }
suits.forEach((suit) => values.forEach((value) => cards.push(suit + value)));
cards = cards.sort(() => 0.5 - Math.random());

const player = {
  card1: null,
  card2: null,
  card3: null,
  card4: null,
  card5: null,
  card8: null,
  total: null,
  hasAce: false,
  bank: 100,
  bet: 0,
};

const dealer = {
  card1: null,
  card2: null,
  card3: null,
  card4: null,
  card5: null,
  card8: null,
  total: null,
  hasAce: false,
};

/*----- app's state (variables) -----*/
let pot = 0;

/*----- cached element references -----*/

let dealEl = document.querySelector("#deal-btn");

let dealerCard1 = document.querySelector("#dealer-card-1");
let dealerCard2 = document.querySelector("#dealer-card-2");
let dealerCard3 = document.querySelector("#dealer-card-3");
let dealerCard4 = document.querySelector("#dealer-card-4");
let dealerCard5 = document.querySelector("#dealer-card-5");
let dealerCard6 = document.querySelector("#dealer-card-6");
let dealerCard7 = document.querySelector("#dealer-card-7");
let dealerCard8 = document.querySelector("#dealer-card-8");

let playerCard1 = document.querySelector("#player-card-1");
let playerCard2 = document.querySelector("#player-card-2");
let playerCard3 = document.querySelector("#player-card-3");
let playerCard4 = document.querySelector("#player-card-4");
let playerCard5 = document.querySelector("#player-card-5");
let playerCard6 = document.querySelector("#player-card-6");
let playerCard7 = document.querySelector("#player-card-7");
let playerCard8 = document.querySelector("#player-card-8");

// let playerCard1 = document.querySelector("#player-card-1");

/*----- sounds -----*/
let shuffleSound = new Audio("sounds/shuffle.mp3");
let clickSound = new Audio("sounds/click.mp3");

/*----- event listeners -----*/

dealEl.addEventListener("click", dealCards);

/*----- functions -----*/

function dealCards() {
  player.card1 = cards.pop();
  dealer.card1 = cards.pop();
  player.card2 = cards.pop();
  dealer.card2 = cards.pop();
  console.log(player.card1 + player.card2);
  console.log(dealer.card1 + dealer.card2);
  //   dealerCard1.classList.add("back-red");
  //   dealerCard2.classList.add(dealer.card2);
  //   dealerCard2.classList.remove("back-red");
  //   playerCard1.classList.add(player.card1);
  //   playerCard1.classList.remove("back-red");
  //   playerCard2.classList.add(player.card2);
  //   playerCard2.classList.remove("back-red");

  setTimeout(() => {
    clickSound.play();
    playerCard1.classList.remove("hidden");
    playerCard1.classList.add(player.card1);
    playerCard1.classList.remove("back-red");
  }, 500);
  setTimeout(() => {
    clickSound.play();
    dealerCard1.classList.remove("hidden");
  }, 1000);
  setTimeout(() => {
    clickSound.play();
    playerCard2.classList.remove("hidden");
    playerCard2.classList.add(player.card2);
    playerCard2.classList.remove("back-red");
  }, 1500);
  setTimeout(() => {
    clickSound.play();
    dealerCard2.classList.remove("hidden");
    dealerCard2.classList.add(dealer.card2);
    dealerCard2.classList.remove("back-red");
  }, 2000);
}

function checkBlackjack() {}

/*---- plan ---- 

going to try to do this one with objects instead of just arrays
pick # of decks
card counter display



*/
