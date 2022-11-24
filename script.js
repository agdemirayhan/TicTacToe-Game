"use strict";

const body = document.querySelector("body");
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".symbol");
const container = document.querySelector(".container");
const winScreen = document.querySelector(".win-screen");
const reset = document.querySelector(".reset");
const turnScreen = document.querySelector(".turn");

// board.addEventListener("click", function () {
//   // console.log(board.getBoundingClientRect().left);
//   // console.log(board.getBoundingClientRect().top);
//   // console.log(board.getBoundingClientRect().width);
// });

// board.addEventListener("click", function (e) {
//   const onBoardCoordsX = e.clientX - board.getBoundingClientRect().left;
//   const onBoardCoordsY = e.clientY - board.getBoundingClientRect().top;
//   console.log(onBoardCoordsX, onBoardCoordsY);
//   console.log(`X : ${Math.floor(onBoardCoordsX / 200) + 1}`);
//   console.log(`Y : ${Math.floor(onBoardCoordsY / 200) + 1}`);
//   // placeSymbol();
// });

let xturn = true;
let xArr = [];
let oArr = [];
let win = false;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

console.log(winningConditions);

function placeSymbol(e) {
  if (e.innerHTML === "") {
    if (xturn) {
      e.innerHTML = `<img src="/x.png" alt="">`;
    } else {
      e.innerHTML = `<img src="/o4.png" alt="">`;
    }
  }
}

squares.forEach((e, idx) => {
  e.addEventListener("click", function () {
    // placeSymbol(e);
    if (e.innerHTML === "" && win === false) {
      placeSymbol(e);
      if (xturn) {
        xArr.push(idx);
        checkWin();
        xturn = false;
        turnScreen.innerHTML = `O's TURN`;
      } else if (!xturn) {
        oArr.push(idx);
        checkWin();
        xturn = true;
        turnScreen.innerHTML = `X's TURN`;
      }
      console.log(xArr);
      console.log(oArr);
    }
  });
});

function checkWin() {
  winningConditions.forEach((e) => {
    const XInt = e.filter((a) => xArr.includes(a));
    const OInt = e.filter((a) => oArr.includes(a));
    if (XInt.length === 3) {
      winScreen.classList.add("show");
      winScreen.innerHTML = `<span>X WON</span>`;
      win = true;
      container.classList.add("win");
    } else if (OInt.length === 3) {
      winScreen.classList.add("show");
      winScreen.innerHTML = `<span>O WON</span>`;
      win = true;
      container.classList.add("win");
    } else if (xArr.length === 5 && win === false) {
      winScreen.classList.add("show");
      winScreen.innerHTML = `<span>DRAW</span>`;
      container.classList.add("win");
    }
  });
}

reset.addEventListener("click", function () {
  xArr = [];
  oArr = [];
  squares.forEach((e) => {
    e.innerHTML = "";
    xturn = true;
    container.classList.remove("win");
    winScreen.classList.remove("show");
    winScreen.innerHTML = "";
    win = false;
    turnScreen.innerHTML = `X's TURN`;
  });
});
