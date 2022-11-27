"use strict";

const squares = document.querySelectorAll(".symbol");
const container = document.querySelector(".container");
const winScreen = document.querySelector(".win-screen");
const reset = document.querySelector(".reset");
const turnScreen = document.querySelector(".turn");
const opac = document.querySelectorAll(".opac");

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

squares.forEach((e, idx) => {
  e.addEventListener("click", function () {
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
    }
  });
});

reset.addEventListener("click", function () {
  xArr = [];
  oArr = [];
  squares.forEach((e) => {
    e.innerHTML = "";
    xturn = true;
    opac.forEach((e) => {
      e.classList.remove("win");
    });
    winScreen.classList.remove("show");
    winScreen.innerHTML = "";
    win = false;
    turnScreen.innerHTML = `X's TURN`;
  });
});

function placeSymbol(e) {
  if (e.innerHTML === "") {
    if (xturn) {
      e.innerHTML = `<img src="/x1.png" alt="">`;
    } else {
      e.innerHTML = `<img src="/o4.png" alt="">`;
    }
  }
}

function checkWin() {
  winningConditions.forEach((e) => {
    const XInt = e.filter((a) => xArr.includes(a));
    const OInt = e.filter((a) => oArr.includes(a));
    if (XInt.length === 3) {
      showResult("X WON");
      win = true;
    } else if (OInt.length === 3) {
      showResult("O WON");
      win = true;
    } else if (xArr.length === 5 && win === false) {
      showResult("DRAW");
    }
  });
}

function showResult(x) {
  winScreen.classList.add("show");
  winScreen.innerHTML = `<span>${x}</span>`;
  opac.forEach((e) => {
    e.classList.add("win");
  });
}
