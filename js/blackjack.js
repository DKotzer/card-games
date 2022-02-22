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
  hasAce: false,
  bank: 100,
  bet: 0,
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
  hasAce: false,
  name: "Dealer",
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
hitEl.addEventListener("click", hit, "player");

/*----- functions -----*/

function dealCards() {
  if (player.cards[1] == null){
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
    }, 500);
    setTimeout(() => {
      clickSound.play();
      dealerCard1.classList.remove("hidden");
    }, 1000);
    setTimeout(() => {
      clickSound.play();
      playerCard2.classList.remove("hidden");
      playerCard2.classList.add(player.cards[2]);
      playerCard2.classList.remove("back-red");
    }, 1500);
   setTimeout(() => {
      clickSound.play();
      dealerCard2.classList.remove("hidden");
      dealerCard2.classList.add(dealer.cards[2]);
      dealerCard2.classList.remove("back-red");
      checkAceUp();
      checkBlackjack(player);
      checkBlackjack(dealer);
      
    }, 2000);
    
  }

}

function hit() {
  if (player.total < 21)  {
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
  }
}

function dealerHit() {
  if (dealer.total < 21)  {
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
  } 
}
//if you have time try turning the above two functions in to 1 function that takes player for player or dealer


function addHand(player) {  //with help from martin 
  player.total = 0;
  for (let card of player.hand) {
    // if card[1]
    console.log(guide[card.substring(1)]);  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    player.total += guide[card.substring(1)];
  }
  return;
 } 

function checkAce (player) {
  for (let card of player.hand) {
    console.log(card[1]);
  }
}

function checkAceUp() {
  if (dealer.cards[2][1] == "A" ){
    console.log("give player insurance option")
  }
}

function checkBlackjack(player) {
  addHand(player);
  if(player.total == 21){
    console.log(`${player.name} has Blackjack! ${player.total}`)
  } else if(player.total > 21){
    console.log(`${player.name} busts with ${player.total}`)
  } else if(player.total < 21){
    console.log(`${player.name} has ${player.total}`)
  } //else if(player.total > 21) && player.hand.values(player).includes('A')
}

function resetHands(){
  //reset hands code here
}

function stand(){
  //stand code here
}

function insurance(){
  //insurance code here
}

function betstuff(){
  //probably break betting stuff in to multiple functions
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
