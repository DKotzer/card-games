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

//shuffling the deck, feels like it does a bad job sometimes
cards = cards.sort(() => 0.5 - Math.random());

console.log(cards);

/*----- app's state (variables) -----*/

const deck = [];

/*----- cached element references -----*/

let btnEl = document.getElementById("draw-card-btn");

/*----- event listeners -----*/

btnEl.addEventListener("click", handleClick);

/*----- functions -----*/

function handleClick() {
  console.log(`player card: ${cards[0]}`);
  let playerCard = cards.shift();
  console.log(`cpu card: ${cards[0]}`);
  deck.push(playerCard);
  let cpuCard = cards.shift();
  deck.push(cpuCard);
  console.log(`deck:[ ${deck} ]`);
}
