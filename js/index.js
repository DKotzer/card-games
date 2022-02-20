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
let playerWarCard = "back-blue";
let playerWarCards = [];
let cpuWarCard = "back-red";
let cpuWarCards = [];
let delay = 3500;
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
let playerWarArrayFix = [];
let cpuWarArrayFix = [];

/*----- event listeners -----*/

btnEl.addEventListener("click", handleClick);

/*----- functions -----*/

//handle the logic of each turn
function handleClick() {
  if (playerCards.length == 0) {
    //this is here in case there is a card for the first war card but not the face down war card
    shuffle(playerDeck);
  }
  if (cpuCards.length == 0) {
    shuffle(cpuDeck);
  }
  oldPlayerCard = playerCard;
  oldCpuCard = cpuCard;
  playerCardEl.classList.remove("back-blue"); //fixed by moving player card and cpu card declaration global and as 'back-blue/red'
  cpuCardEl.classList.remove("back-red");

  playerCard = playerCards.pop();
  //   console.log("player card: " + playerCard);
  cpuCard = cpuCards.pop();
  //   console.log(`cpu card: ${cpuCard}`);

  let playerNum = playerCard[1];
  if (playerCard[2] != undefined) {
    playerNum += playerCard[2];
  }

  let cpuNum = cpuCard[1];
  if (cpuCard[2] != undefined) {
    cpuNum += cpuCard[2];
  }
  /// compare player vs cpu card values, handle win and draw
  //   console.log(`${playerNum} vs ${cpuNum}`);
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

  //   console.log(`${playerNum} vs ${cpuNum}`);
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
    // cpuDeck.push(cpuCard);
    // playerDeck.push(playerCard);
  }
  //if player or cpu runs out of cards, shuffle their deck
  if (playerCards.length == 0) {
    shuffle(playerDeck);
  }
  if (cpuCards.length == 0) {
    shuffle(cpuDeck);
  }

  function war() {
    warState = true;
    btnEl.disabled = true;
    // let oldPlayerWarCard = playerWarCard;
    // let oldCpuWarCard = cpuWarCard;
    function resetWar() {
      playerWarCardEl.classList = "card large back-blue";
      cpuWarCardEl.classList = "card large back-red";
      warState = false;
      btnEl.disabled = false;
      playerWarArrayFix = [];
      cpuWarArrayFix = [];
    }

    if (playerCards.length == 0) {
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }
    playerWarArrayFix = playerCards.pop();
    cpuWarArrayFix = cpuCards.pop();
    console.log("face down pCard: " + playerWarArrayFix);
    console.log("face down cCard: " + cpuWarArrayFix);

    playerWarCards.push(playerWarArrayFix);
    cpuWarCards.push(cpuWarArrayFix);

    if (playerCards.length == 0) {
      //this is here in case there is a card for the first war card but not the face down war card
      shuffle(playerDeck);
    }
    if (cpuCards.length == 0) {
      shuffle(cpuDeck);
    }
    //add in animated war text between cards
    playerWarCard = playerCards.pop();
    console.log("player war card: " + playerWarCard);
    cpuWarCard = cpuCards.pop();

    console.log(`cpu war card: ${cpuWarCard}`);
    playerWarCardEl.classList.remove("back-blue");
    playerWarCardEl.classList.add(playerWarCard);
    cpuWarCardEl.classList.remove("back-red");
    cpuWarCardEl.classList.add(cpuWarCard);

    let playerWarNum = playerWarCard[1];
    if (playerWarCard[2] != undefined) {
      playerWarNum += playerWarCard[2];
    }
    if (cpuWarCard[1] == undefined) {
      console.log("CpuWarCard[1] is undefined, figure it out");
    }
    let cpuWarNum = cpuWarCard[1];
    if (cpuWarCard[2] != undefined) {
      cpuWarNum += cpuWarCard[2];
    }
    /// compare player vs cpu card values, handle win and draw
    console.log(`War before conversion: ${playerWarNum} vs ${cpuWarNum}`);
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
      console.log("player war cards: " + playerWarCards);
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

      //   playerWarCardEl.classList.add("back-blue");
      //   playerWarCardEl.classList.remove(playerWarCard);
      //   cpuWarCardEl.classList.add("back-red");
      //   cpuWarCardEl.classList.remove(cpuWarCard);
    } else if (playerWarNum > cpuWarNum) {
      playerDeck.push(cpuCard);
      playerDeck.push(playerCard);
      playerDeck.push(cpuWarCard);
      playerDeck.push(cpuWarCards);
      console.log("player war cards: " + playerWarCards);
      playerDeck.push(playerWarCards);

      playerDeck.push(playerWarCard);
      playerDeck = [].concat.apply([], playerDeck);
      playerWarCards = [];
      cpuWarCards = [];
      cpuWarCard = [];
      playerWarCard = [];

      console.log("Player wins the WAR");
      setTimeout(resetWar, delay);
      //   playerWarCardEl.classList.add("back-blue");
      //   playerWarCardEl.classList.remove(playerWarCard);
      //   cpuWarCardEl.classList.add("back-red");
      //   cpuWarCardEl.classList.remove(cpuWarCard);
    } else {
      console.log(`War ${playerWarNum} vs ${cpuWarNum}`);
      console.log("More War!");

      playerWarCards.push(playerWarCard);
      cpuWarCards.push(cpuWarCard);
      console.log("player war cards: " + playerWarCards);
      cpuWarCard = [];
      playerWarCard = [];
      setTimeout(resetWar, 3500);
      warState = true;
      //   playerWarCardEl.classList.add("back-blue");
      //   playerWarCardEl.classList.remove(playerWarCard);
      //   cpuWarCardEl.classList.add("back-red");
      //   cpuWarCardEl.classList.remove(cpuWarCard);
      war();
    }
  }

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
    // playerWarCardEl.classList.add(playerWarCard);

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
        render();
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
        render();
        alert("You have won, good job.");
        gameOver = true;
      }
      cpuDeck = [];
    }
  }
}
function autoPlay() {
  if (gameOver != true) {
    delay = 1;
    setInterval(handleClick, 1);
    // handleClick();
  }
}
//add sound on shuffle

//found a bug, sometimes more than 1 turn is triggering at a time without being rendered

//to do list
//turn some of the repeated code in to reusable functions
//add sound to shuffle and war
//add a player/cpu deck that you can click to draw a card instead of pressing draw button
