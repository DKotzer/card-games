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
};

const guide = {
  //from martin
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

let modalEl = document.querySelector(".win-modal");

// let playerCard1 = document.querySelector("#player-card-1");

/*----- sounds -----*/
let shuffleSound = new Audio("sounds/shuffle.mp3");
let clickSound = new Audio("sounds/click.mp3");

/*----- event listeners -----*/

dealEl.addEventListener("click", dealCards);
hitEl.addEventListener("click", hit);
standEl.addEventListener("click", stand);

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
    player.cards[1] = cards.pop();
    dealer.cards[1] = cards.pop();
    player.cards[2] = cards.pop();
    dealer.cards[2] = cards.pop();
    player.hand.push(player.cards[1]);
    player.hand.push(player.cards[2]);
    dealer.hand.push(dealer.cards[1]);
    dealer.hand.push(dealer.cards[2]);
    console.log(player.cards[1] + player.cards[2]);
    console.log(dealer.cards[1] + dealer.cards[2]);
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
  if (player.total < 21 && player.cards[1] != null) {
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
    console.log("give player insurance option");
  }
}

function checkBlackjack(player) {
  addHand(player);
  if (player.total == 21) {
    console.log(`${player.name} has Blackjack! ${player.total}`);
    if (player.name == "Dealer") {
      dealerCard1.classList.add(dealer.cards[1]);
      dealerCard1.classList.remove("back-red");
    }
  } else if (player.total > 21) {
    console.log(`${player.name} busts with ${player.total}`);
  } else if (player.total < 21) {
    console.log(`${player.name} has ${player.total}`);
  } //else if(player.total > 21) && player.hand.values(player).includes('A')
  render();
}

function checkWinner() {
  if (player.total > 21 && dealer.total > 21) {
    modalEl.textContent = "Player and Dealer both Bust";
    player.bank += player.bet;
  } else if (player.total > 21) {
    modalEl.textContent = `${player.name} busts with ${player.total}`;
    player.bet = 0;
  } else if (dealer.total > 21) {
    modalEl.textContent = `${dealer.name} busts with ${dealer.total}`;
    player.bank += player.bet * 2;
  } else if (player.total == dealer.total) {
    modalEl.textContent = "Push";
    player.bank += player.bet;
    player.bet = 0;
  } else if (player.total > dealer.total) {
    modalEl.textContent = `${player.name} wins with ${player.total}`;
    player.bank += player.bet * 2;
    player.bet = 0;
  } else if (dealer.total > player.total) {
    modalEl.textContent = `${dealer.name} wins with ${dealer.total}`;
    player.bet = 0;
  } else {
    console.log("something went wrong");
  }

  console.log("checkwinner happening");
  render();
}

function resetHands() {
  // if (dealer.turnComplete = true){
  // }
  for (let card in player.cards) {
    player.cards[card] = null;
  }

  dealer.turnActive = false;
  modalEl.classList.remove("hidden");

  //reset hands code here
  //things to reset: hasZero, hand, total, cards, insurance, bets
}

function stand() {
  if (player.cards[1] != null && dealer.cards[1] != null) {
    dealerCard1.classList.add(dealer.cards[1]);
    dealerCard1.classList.remove("back-red");
    dealerValueEl.textContent = dealer.total;
    if (dealer.turnComplete != true) {
      console.log("standing");
      setInterval(dealerTurn, 1500);
      //ask for help here
    }
  }
}

function dealerTurn() {
  if (dealer.total <= 16) {
    dealer.turnActive = true;
    dealerHit();
    console.log("Dealer hitting");
  } else {
    checkWinner();
    dealer.turnComplete = true;
    console.log("Dealer over 16");
    dealer.turnActive = false;
    modal();
  }
}

function insurance() {
  //insurance code here
}

function betstuff() {
  //probably break betting stuff in to multiple functions
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

function modal() {
  modalEl.classList.remove("hidden");
  // setTimeout(() => modalEl.classList.add("hidden"), 2000);
  // setTimeout(function () {
  //   modalEl.classList.add("hidden");
  // }, 1300);
}

// for (let i = 0; i < player.hand.length; i++) {
//   if (player.hand[i][2] != undefined) {
//     player.total = player.total + (player.hand[i][1] + player.hand[i][2]);
//   }
//   // neither of these work.
//   for (let i = 0; i < player.hand.length; i++) {
//     if (player.cards[i][2] != undefined) {
//       player.total = player.total + (player.cards[i][1] + player.cards[i][2]);
//     }
//   }

// function addHand (player){
//     for (i=0; i < player.hand.length; i++) {

//         let
//         if (player.cardi != undefined) {
//           playerNum += playerCard[2];
//         }

//         let cpuNum = cpuCard[1];
//         if (cpuCard[2] != undefined) {
//           cpuNum += cpuCard[2];
//         }
//     }

// }

/*---- plan ---- 

going to try to do this one with objects instead of just arrays
pick # of decks
card counter display
*/
