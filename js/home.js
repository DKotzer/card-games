/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

let warEl = document.querySelector(".war-container");
let blackjackEl = document.querySelector(".blackjack-container");
let videoPokerEl = document.querySelector(".videoPoker-container");

/*----- event listeners -----*/
warEl.addEventListener("click", warGame);
blackjackEl.addEventListener("click", blackjackGame);
videoPokerEl.addEventListener("click", videoPokerGame);

/*----- functions -----*/

function warGame() {
  location.href = "index.html";
}

function blackjackGame() {
  location.href = "blackjack.html";
}

function videoPokerGame() {
  location.href = "blackjack.html";
}
