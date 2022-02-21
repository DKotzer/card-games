/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

let warEl = document.querySelector(".war-container");

/*----- event listeners -----*/
warEl.addEventListener("click", warGame);
warEl.addEventListener("mouseover", warHover);

/*----- functions -----*/

function warGame() {
  location.href = "index.html";
}
