/*----- constants -----*/
//Creating the deck of cards based on deckCount and storing them in the cards array + deck array
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
let deckCount = 1;
for (i = 0; i < deckCount; i++) {
  suits.forEach((suit) => values.forEach((value) => cards.push(suit + value))); //something like this when you add in deck count
}
let deckList = cards.slice(); //create array copy of cards to use for shuffling
cards = cards.sort(() => 0.5 - Math.random());

const player = {
  cards: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    8: null,
  },
  hand: [],
  total: null,
  hasAces: 0,
  bank: 1000,
  bet: 0,
  previousBet: 0,
  insurance: false,
  name: "Player",
};

const dealer = {
  cards: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    8: null,
  },
  hand: [],
  total: null,
  hasAces: 0,
  name: "Dealer",
  visibleTotal: null,
  turnComplete: false,
  turnActive: false,
  aceUp: false,
};

const count = {
  ten: 0,
  J: 0,
  Q: 0,
  K: 0,
  A: 0,
};

const guide = {
  //from martin, used to help add up hand totals. Going with my solution from war might have actually made handling aces much easier for more than 1 ace.
  "02": 2,
  "03": 3,
  "04": 4,
  "05": 5,
  "06": 6,
  "07": 7,
  "08": 8,
  "09": 9,
  "10": 10,
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": 11,
};

/*----- app's state (variables) -----*/
let pot = 0;
let playerTotal = 0;
let dealerTotal = 0;

/*----- cached element references -----*/

let dealEl = document.querySelector("#deal-btn");
let hitEl = document.querySelector("#hit-btn");
let standEl = document.querySelector("#stand-btn");
let insuranceEl = document.querySelector("#insurance-btn");

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

let dealerValueEl = document.querySelector(".dealerValue");
let playerValueEl = document.querySelector(".playerValue");

let chip1El = document.querySelector("#chip1");
let chip2El = document.querySelector("#chip2");
let chip3El = document.querySelector("#chip3");
let chip4El = document.querySelector("#chip4");
let chip5El = document.querySelector("#chip5");
let chip6El = document.querySelector("#chip6");

let betEl = document.querySelector(".betTotal");
let cashEl = document.querySelector(".cashTotal");

let aceEl = document.querySelector(".ace-count");
let kingEl = document.querySelector(".king-count");
let queenEl = document.querySelector(".queen-count");
let jackEl = document.querySelector(".jack-count");
let tenEl = document.querySelector(".ten-count");

let modalEl = document.querySelector(".win-modal");
let betModalEl = document.querySelector(".betModal");
let modal = document.getElementById("myModal");

/*----- sounds -----*/
let shuffleSound = new Audio("sounds/shuffle.mp3");
let clickSound = new Audio("sounds/click.mp3");

/*----- event listeners -----*/

dealEl.addEventListener("click", dealCards);
hitEl.addEventListener("click", hit);
standEl.addEventListener("click", stand);
insuranceEl.addEventListener("click", insurance);

chip1El.addEventListener("click", addBet1);
chip2El.addEventListener("click", addBet2);
chip3El.addEventListener("click", addBet3);
chip4El.addEventListener("click", addBet4);
chip5El.addEventListener("click", addBet5);
chip6El.addEventListener("click", addBet6);

/*----- functions -----*/

cashEl.textContent = player.bank;

function dealCards() {
  if (player.cards[1] == null && player.bet > 0) {
    if (cards.length < 5) {
      shuffle();
    }
    player.cards[1] = cards.pop();
    dealer.cards[1] = cards.pop();
    player.cards[2] = cards.pop();
    dealer.cards[2] = cards.pop();
    player.hand.push(player.cards[1]);
    player.hand.push(player.cards[2]);
    dealer.hand.push(dealer.cards[1]);
    dealer.hand.push(dealer.cards[2]);
    console.log("player cards: " + player.cards[1] + ", " + player.cards[2]);
    console.log("dealer cards: " + dealer.cards[1] + ", " + dealer.cards[2]);
    setTimeout(() => {
      clickSound.play();
      playerCard1.classList.remove("hidden");
      playerCard1.classList.add(player.cards[1]);
      playerCard1.classList.remove("back-red");
      render();
    }, 500);
    setTimeout(() => {
      clickSound.play();
      dealerCard1.classList.remove("hidden");
      render();
    }, 1000);
    setTimeout(() => {
      clickSound.play();
      playerCard2.classList.remove("hidden");
      playerCard2.classList.add(player.cards[2]);
      playerCard2.classList.remove("back-red");
      render();
    }, 1500);
    setTimeout(() => {
      clickSound.play();
      dealerCard2.classList.remove("hidden");
      dealerCard2.classList.add(dealer.cards[2]);
      dealerCard2.classList.remove("back-red");
      playerValueEl.textContent = player.total;
      checkAceUp();
      render();
      checkBlackjack(player);
      checkBlackjack(dealer);
    }, 2000);
  }
}

function hit() {
  //if I was using arrays I could make these 5 ifs one for loop, its possible with objects too but I dont know how
  if (
    player.total < 21 &&
    player.cards[1] != null &&
    dealer.turnActive == false
  ) {
    if (cards.length < 5) {
      shuffle();
    }
    if (player.cards[3] == null) {
      player.cards[3] = cards.pop();
      clickSound.play();
      playerCard3.classList.remove("hidden");
      playerCard3.classList.add(player.cards[3]);
      playerCard3.classList.remove("back-red");
      player.hand.push(player.cards[3]);
    } else if (player.cards[4] == null) {
      player.cards[4] = cards.pop();
      clickSound.play();
      playerCard4.classList.remove("hidden");
      playerCard4.classList.add(player.cards[4]);
      playerCard4.classList.remove("back-red");
      player.hand.push(player.cards[4]);
    } else if (player.cards[5] == null) {
      player.cards[5] = cards.pop();
      clickSound.play();
      playerCard5.classList.remove("hidden");
      playerCard5.classList.add(player.cards[5]);
      playerCard5.classList.remove("back-red");
      player.hand.push(player.cards[5]);
    } else if (player.cards[6] == null) {
      player.cards[6] = cards.pop();
      clickSound.play();
      playerCard6.classList.remove("hidden");
      playerCard6.classList.add(player.cards[6]);
      playerCard6.classList.remove("back-red");
      player.hand.push(player.cards[6]);
    } else if (player.cards[7] == null) {
      player.cards[7] = cards.pop();
      clickSound.play();
      playerCard7.classList.remove("hidden");
      playerCard7.classList.add(player.cards[7]);
      playerCard7.classList.remove("back-red");
      player.hand.push(player.cards[7]);
    } else if (player.cards[8] == null) {
      player.cards[8] = cards.pop();
      clickSound.play();
      playerCard8.classList.remove("hidden");
      playerCard8.classList.add(player.cards[8]);
      playerCard8.classList.remove("back-red");
      player.hand.push(player.card8);
    }
    checkBlackjack(player);
    render();
  }
}

function dealerHit() {
  //could make this one for loop with arrays or combine it with the above one for just one function/for loop which would save ~80 lines of code
  if (dealer.total < 21 && dealer.cards[1] != null) {
    if (cards.length < 5) {
      shuffle();
    }
    if (dealer.cards[3] == null) {
      dealer.cards[3] = cards.pop();
      clickSound.play();
      dealerCard3.classList.remove("hidden");
      dealerCard3.classList.add(dealer.cards[3]);
      dealerCard3.classList.remove("back-red");
      dealer.hand.push(dealer.cards[3]);
    } else if (dealer.cards[4] == null) {
      dealer.cards[4] = cards.pop();
      clickSound.play();
      dealerCard4.classList.remove("hidden");
      dealerCard4.classList.add(dealer.cards[4]);
      dealerCard4.classList.remove("back-red");
      dealer.hand.push(dealer.cards[4]);
    } else if (dealer.cards[5] == null) {
      dealer.cards[5] = cards.pop();
      clickSound.play();
      dealerCard5.classList.remove("hidden");
      dealerCard5.classList.add(dealer.cards[5]);
      dealerCard5.classList.remove("back-red");
      dealer.hand.push(dealer.cards[5]);
    } else if (dealer.cards[6] == null) {
      dealer.cards[6] = cards.pop();
      clickSound.play();
      dealerCard6.classList.remove("hidden");
      dealerCard6.classList.add(dealer.cards[6]);
      dealerCard6.classList.remove("back-red");
      dealer.hand.push(dealer.cards[6]);
    } else if (dealer.cards[7] == null) {
      dealer.cards[7] = cards.pop();
      clickSound.play();
      dealerCard7.classList.remove("hidden");
      dealerCard7.classList.add(dealer.cards[7]);
      dealerCard7.classList.remove("back-red");
      dealer.hand.push(dealer.cards[7]);
    } else if (dealer.cards[8] == null) {
      dealer.cards[8] = cards.pop();
      clickSound.play();
      dealerCard8.classList.remove("hidden");
      dealerCard8.classList.add(dealer.cards[8]);
      dealerCard8.classList.remove("back-red");
      dealer.hand.push(dealer.cards[8]);
    }
    checkBlackjack(dealer);
    render();
  }
}
//if you have time try turning the above two functions in to 1 function that takes player for player or dealer

function addHand(player) {
  // this function made with help from martin
  player.total = 0;
  for (let card of player.hand) {
    if (card[1] == "A") {
      console.log("Ace detected");
      player.hasAces += 1;
    }
    player.total += guide[card.substring(1)];
  }
  if (player.total >= 22 && player.hasAces !== 0) {
    console.log("over 21, has aces");
    player.hasAces -= 1;
    player.total -= 10;
    if (player.total >= 22 && player.hasAces !== 0) {
      console.log("over 21, has aces");
      player.hasAces -= 1;
      player.total -= 10;
    }
  }
  if (player.name == "Dealer") {
    player.visibleTotal = player.total - guide[player.hand[0].substring(1)];
  }
}

function checkAceUp() {
  if (dealer.cards[2][1] == "A") {
    modalEl.textContent = "Dealer Ace detected. Insurance?";
    modalEl.classList.remove("hidden");
    dealer.aceUp = true;
    setTimeout(() => modalEl.classList.add("hidden"), 3000);
  }
}

function checkBlackjack(players) {
  addHand(players);
  if (players.total == 21) {
    console.log(`${players.name} has Blackjack! ${players.total}`);
    if (players.name == "Dealer" && player.insurance == true) {
      dealer.visibleTotal = "21";
      dealerCard1.classList.add(dealer.cards[1]);
      dealerCard1.classList.remove("back-red");
      player.total += player.insurance * 2;
      betModalEl.textContent = `+ ${player.insurance * 2}`;
      betModalEl.classList.remove("hidden");
      setTimeout(() => betModalEl.classList.add("hidden"), 3000);
      console.log("Insurance bet winnings paid to player");
    }
    if (players.name == "Player") {
      stand();
      render();
    }
  } else if (players.total > 21) {
    if (players.name == "Player") {
      render();
      console.log("this should be working");
      dealerTurn();
    } // under same function else if players.total > 21
    console.log(`${players.name} busts with ${players.total}`);
  } else if (players.total < 21) {
    console.log(`${players.name} has ${players.total}`);
  }
  render();
}

function checkWinner() {
  player.previousBet = player.bet;
  if (player.total > 21 && dealer.total > 21) {
    modalEl.textContent = "Player and Dealer both Bust";
    betModalEl.textContent = `+ ${player.bet}`;
    player.bank += player.bet;
    player.bet = 0;
    player.wins = true;
  } else if (player.total == 21) {
    modalEl.textContent = `${player.name} wins with Blackjack`;
    betModalEl.textContent = `+ ${player.bet * 2}`;
    player.bank += player.bet * 2;
    player.bet = 0;
  } else if (dealer.total == 21) {
    modalEl.textContent = `${dealer.name} wins with Blackjack `;
    betModalEl.textContent = "";
    player.bet = 0;
  } else if (player.total > 21) {
    modalEl.textContent = `${player.name} busts with ${player.total}`;
    betModalEl.textContent = "";
    player.bet = 0;
  } else if (dealer.total > 21) {
    modalEl.textContent = `${dealer.name} busts with ${dealer.total}`;
    betModalEl.textContent = `+ ${player.bet * 2}`;
    player.bank += player.bet * 2;
    player.bet = 0;
  } else if (player.total == dealer.total) {
    betModalEl.textContent = `+ ${player.bet}`;
    modalEl.textContent = "Push";
    player.bank += player.bet;
    player.bet = 0;
  } else if (player.total > dealer.total) {
    modalEl.textContent = `${player.name} wins with ${player.total}`;
    betModalEl.textContent = `+ ${player.bet * 2}`;
    player.bank += player.bet * 2;
    player.bet = 0;
  } else if (dealer.total > player.total) {
    modalEl.textContent = `${dealer.name} wins with ${dealer.total}`;
    betModalEl.textContent = "";
    player.bet = 0;
  }
  dealer.turnComplete = true;
  console.log("checkwinner happening");
  render();
  //check for loss
  if (player.bank < 1) {
    setTimeout(() => (modal.style.display = "block"), 2000);
  }
}

function stand() {
  if (
    player.cards[1] != null &&
    dealer.cards[1] != null &&
    dealer.turnComplete != true
  ) {
    dealerCard1.classList.add(dealer.cards[1]);
    dealerCard1.classList.remove("back-red");
    dealerValueEl.textContent = dealer.total;
    dealerTurn();
  }
}
function dealerTurn() {
  dealer.turnActive = true;
  if (player.total > 21) {
    console.log("dealer turn, player over 21");
    checkWinner();
    modals();
    setTimeout(() => resetHands(), 3500);
  } else if (dealer.total <= 16) {
    dealerHit();
    console.log("Dealer hitting");
    setTimeout(() => dealerTurn(), 1500);
  } else if (dealer.total >= 17) {
    checkWinner();
    dealer.turnComplete = true;
    console.log("Dealer over 16");
    modals();
    setTimeout(() => resetHands(), 3500);
  }
}
function insurance() {
  if (dealer.aceUp == true && player.insurance == false) {
    if (player.bank > player.bet / 2) {
      player.bank -= player.bet / 2;
      player.insurance = player.bet / 2;
      console.log("insurance bought");
      render(); //somewhere in checkblackjack dealer do something like if insurance != false, total += insurance * 2 or whatever the insurance ratio is
    }
  }
}

function render() {
  playerValueEl.textContent = player.total;
  if (dealer.turnActive != true) {
    dealerValueEl.textContent = dealer.visibleTotal;
  } else {
    dealerValueEl.textContent = dealer.total;
  }
  betEl.textContent = player.bet;
  cashEl.textContent = player.bank;
}

function modals() {
  modalEl.classList.remove("hidden");
  setTimeout(() => modalEl.classList.add("hidden"), 3000);
  betModalEl.classList.remove("hidden");
  setTimeout(() => betModalEl.classList.add("hidden"), 3000);
  // setTimeout(function () {
  //   modalEl.classList.add("hidden");
  // }, 1300);
}

function resetHands() {
  // if (dealer.turnComplete = true){
  // }
  cardCount();
  for (let card in player.cards) {
    player.cards[card] = null; //this line fixed with help of Fil, before I had cards = null instead of player.cards[card]
  }
  for (let card in dealer.cards) {
    dealer.cards[card] = null;
  }
  dealer.hasAces = 0;
  player.hasAces = 0;
  dealer.aceUp = false;
  player.hand = [];
  dealer.hand = [];
  modalEl.classList.remove("hidden");
  player.total = null;
  dealer.total = null;
  dealer.visibleTotal = null;
  dealer.turnComplete = false;
  dealer.turnActive = false;
  player.insurance = false;
  modalEl.classList.add("hidden");
  playerCard1.classList = "card large back-red hidden"; //there is probably a better way to do this in 1 or 2 lines
  playerCard2.classList = "card large back-red hidden";
  playerCard3.classList = "card large back-red hidden";
  playerCard4.classList = "card large back-red hidden";
  playerCard5.classList = "card large back-red hidden";
  playerCard6.classList = "card large back-red hidden";
  playerCard7.classList = "card large back-red hidden";
  playerCard8.classList = "card large back-red hidden";
  dealerCard1.classList = "card large back-red hidden";
  dealerCard2.classList = "card large back-red hidden";
  dealerCard3.classList = "card large back-red hidden";
  dealerCard4.classList = "card large back-red hidden";
  dealerCard5.classList = "card large back-red hidden";
  dealerCard6.classList = "card large back-red hidden";
  dealerCard7.classList = "card large back-red hidden";
  dealerCard8.classList = "card large back-red hidden";
  render();
  //reset hands code here
  //things to reset: hasZero, hand, total, cards, insurance, bets
}

function shuffle() {
  if (cards.length < 52) {
    console.log("time to shuffle");
    cards = deckList;
    cards = cards.sort(() => 0.5 - Math.random());
    shuffleSound.play();
    modalEl.textContent = "Shuffling!";
    modalEl.classList.remove("hidden");
    setInterval(() => modalEl.classList.add("hidden"), 1000);
    count.A = 0;
    count.K = 0;
    count.Q = 0;
    count.J = 0;
    count.ten = 0;
  }
}

function checkLoss() {
  if (player.bank < 1) {
    modal.style.display = "block";
  }
}

function changeDecks(count) {
  deckCount = count;
  cards = [];
  for (i = 0; i < deckCount; i++) {
    suits.forEach((suit) =>
      values.forEach((value) => cards.push(suit + value))
    ); //something like this when you add in deck count
  }
  deckList = cards.slice(); //create array copy of cards to use for shuffling
  cards = cards.sort(() => 0.5 - Math.random());
  console.log("Deck Count changed to: " + deckCount);
}

function addBet1() {
  if (player.bank >= 1) {
    player.bet += 1;
    player.bank -= 1;
    render();
  }
}
function addBet2() {
  if (player.bank >= 5) {
    player.bet += 5;
    player.bank -= 5;
    render();
  }
}
function addBet3() {
  if (player.bank >= 10) {
    player.bet += 10;
    player.bank -= 10;
    render();
  }
}
function addBet4() {
  if (player.bank >= 25) {
    player.bet += 25;
    player.bank -= 25;
    render();
  }
}
function addBet5() {
  if (player.bank >= 50) {
    player.bet += 50;
    player.bank -= 50;
    render();
  }
}
function addBet6() {
  player.bet += player.bank;
  player.bank -= player.bank;
  render();
}

function cardCount() {
  //did this after I should have stopped for the night, might shorten later. ctrl d trick makes this way really fast to write
  if (cards.includes("hK") == false) {
    count.K += 1;
  }
  if (cards.includes("cK") == false) {
    count.K += 1;
  }
  if (cards.includes("dK") == false) {
    count.K += 1;
  }
  if (cards.includes("sK") == false) {
    count.K += 1;
  }
  if (cards.includes("hQ") == false) {
    count.Q += 1;
  }
  if (cards.includes("cQ") == false) {
    count.Q += 1;
  }
  if (cards.includes("dQ") == false) {
    count.Q += 1;
  }
  if (cards.includes("sQ") == false) {
    count.Q += 1;
  }
  if (cards.includes("hJ") == false) {
    count.J += 1;
  }
  if (cards.includes("cJ") == false) {
    count.J += 1;
  }
  if (cards.includes("dJ") == false) {
    count.J += 1;
  }
  if (cards.includes("sJ") == false) {
    count.J += 1;
  }
  if (cards.includes("hA") == false) {
    count.A += 1;
  }
  if (cards.includes("cA") == false) {
    count.A += 1;
  }
  if (cards.includes("dA") == false) {
    count.A += 1;
  }
  if (cards.includes("sA") == false) {
    count.A += 1;
  }
  if (cards.includes("h10") == false) {
    count.ten += 1;
  }
  if (cards.includes("c10") == false) {
    count.ten += 1;
  }
  if (cards.includes("d10") == false) {
    count.ten += 1;
  }
  if (cards.includes("s10") == false) {
    count.ten += 1;
  }
  aceEl.textContent = `A:${count.A}/${deckCount * 4}`;
  kingEl.textContent = `K:${count.K}/${deckCount * 4}`;
  queenEl.textContent = `Q:${count.Q}/${deckCount * 4}`;
  jackEl.textContent = `J:${count.J}/${deckCount * 4}`;
  tenEl.textContent = `10:${count.ten}/${deckCount * 4}`;
}

/*---- plan ---- 

going to try to do this one with objects instead of just arrays
pick # of decks
card counter display
*/
//turn off player hit after they stand
//dealer wins if player busts
