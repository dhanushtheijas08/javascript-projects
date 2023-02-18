"use strict";

// Random
let letter = "abcdefghijklmnopqrstuvwxyz".split("");
let num = "1234567890".split("");
let sp = "!@#$%^&*()_+=-`~[{]}|?/>.<,'".split("");

// To find the range
let range = document.querySelector(".range");
let text = document.querySelector(".text");
range.addEventListener("input", function () {
  text.textContent = range.value;
});

// To shuffle the list
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// To Generate random numbers
let randNum = function (len) {
  let randVal = Math.round(Math.random() * len);
  return randVal;
};

let password = document.querySelector(".passwd");
let submitBtn = document.querySelector(".btn-submit");
let copyBtn = document.querySelector(".copy-btn");
let inputNumber = document.querySelector("#num");
let inputSpecialChar = document.querySelector("#sp-char");

submitBtn.addEventListener("click", function () {
  if (inputNumber.value < 0 || inputSpecialChar.value < 0) return;

  let generatedPassword = (password.value = "");
  for (let i = 0; i < range.value; i++)
    generatedPassword = generatedPassword + letter[randNum(letter.length - 1)];

  for (let i = 0; i < inputNumber.value; i++)
    generatedPassword = generatedPassword + num[randNum(num.length - 1)];

  for (let i = 0; i < inputSpecialChar.value; i++)
    generatedPassword = generatedPassword + sp[randNum(sp.length - 1)];

  generatedPassword = generatedPassword.split("");
  shuffleArray(generatedPassword);
  generatedPassword = generatedPassword.join("");
  password.value = generatedPassword;
});

let cleanInput = function (e) {
  e.target.value = "";
};
inputNumber.addEventListener("click", cleanInput);
inputSpecialChar.addEventListener("click", cleanInput);

// Copy to clipbord
let copyContent = async () => {
  try {
    await navigator.clipboard.writeText(password.value);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
copyBtn.addEventListener("click", copyContent);
