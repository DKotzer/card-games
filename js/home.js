/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/

let warEl = document.querySelector(".war-container");
let blackjackEl = document.querySelector(".blackjack-container");

/*----- event listeners -----*/
warEl.addEventListener("click", warGame);
blackjackEl.addEventListener("click", blackjackGame);

/*----- functions -----*/

function warGame() {
  location.href = "war.html";
}

function blackjackGame() {
  location.href = "blackjack.html";
}
