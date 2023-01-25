"use strict";

const account1 = {
  owner: "Ram Kumar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Sara",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Dhanush Theijas",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// Variables
let transactionUI = document.querySelector(".movements");
let balance = document.querySelector(".balance__value");
let balanceIn = document.querySelector(".summary__value--in");
let balanceOut = document.querySelector(".summary__value--out");
let balanceinterest = document.querySelector(".summary__value--interest");

let userName = document.querySelector(".login__input--user");
let userPasswd = document.querySelector(".login__input--pin");
let loginBtn = document.querySelector(".login__btn");
let app = document.querySelector(".app");
let currentUser;
let welcomeMsg = document.querySelector(".welcome");

let balanceAmount;
let transationTo = document.querySelector(".form__input--to");
let transationToAmount = document.querySelector(".form__input--amount");
let transationBtn = document.querySelector(".form__btn--transfer");

// Close account
let closeAccUser = document.querySelector(".form__input--user");
let closeAccPass = document.querySelector(".form__input--pin");
let closeAccBtn = document.querySelector(".form__btn--close");

let createUserName = function (allAccounts) {
  allAccounts.forEach((acc) => {
    acc.userName = acc.owner
      .split(" ")
      .map((word) => word.at(0))
      .join("")
      .toLowerCase();
  });
};
createUserName(accounts);
let balanceDetials = function (arr, item, interestRate = 0) {
  let sample = Math.abs(
    arr
      .filter((num) => (item === "in" ? num > 0 : num < 0))
      .reduce((acc, num) => acc + num, 0)
  );
  item === "in"
    ? (balanceIn.textContent = `${Number(sample)}$`)
    : (balanceOut.textContent = `${Number(sample)}$`);
  item === "interest"
    ? (balanceinterest.textContent = `${
        (Number(sample) * interestRate) / 100
      }$`)
    : null;
};
let changeUI = function (arr) {
  transactionUI.textContent = "";
  arr.forEach((num, i) => {
    let statment = num > 0 ? "deposit" : "withdrawal";
    let html = `<div class="movements__row">
    <div class="movements__type movements__type--${statment}">${i} ${statment}</div>
    <div class="movements__value">${Math.abs(num)}$</div>
    </div>`;
    transactionUI.insertAdjacentHTML("afterbegin", html);
  });
};

let loginUser = function (e) {
  e.preventDefault();
  currentUser = accounts.find((account) => account.userName === userName.value);
  if (currentUser?.pin === Number(userPasswd.value)) {
    app.style.opacity = "1";
    welcomeMsg.textContent = `Welcome ${currentUser.owner}`;
    changeUI(currentUser.movements);
    balanceDetials(currentUser.movements, "in");
    balanceDetials(currentUser.movements, "out");
    balanceDetials(currentUser.movements, "interest", currentUser.interestRate);
    balanceAmount =
      parseInt(balanceIn.textContent) - parseInt(balanceOut.textContent);
    balance.textContent = `${balanceAmount}$`;
  }

  userName.value = userPasswd.value = "";
  userPasswd.blur();
};
loginBtn.addEventListener("click", loginUser);

let transationAction = function (e) {
  e.preventDefault();
  let validUserNameIndex = accounts.findIndex(
    (acc) => acc?.userName === transationTo.value
  );
  if (
    transationTo.value !== currentUser.userName &&
    Number(transationToAmount.value) &&
    validUserNameIndex !== -1 &&
    parseInt(balanceAmount) >= Number(transationToAmount.value)
  ) {
    currentUser.movements.push(Number(-transationToAmount.value));
    accounts
      .at(validUserNameIndex)
      .movements.push(Number(transationToAmount.value));
    changeUI(currentUser.movements);
    balanceDetials(currentUser.movements, "in");
    balanceDetials(currentUser.movements, "out");
    balanceDetials(currentUser.movements, "interest", currentUser.interestRate);
    balanceAmount = balanceAmount - Number(transationToAmount.value);
    balance.textContent = `${balanceAmount}$`;
  }
  transationTo.value = transationToAmount.value = "";
  transationToAmount.blur();
};

transationBtn.addEventListener("click", transationAction);

let loanAmount = document.querySelector(".form__input--loan-amount");
let loanBtn = document.querySelector(".form__btn--loan");

loanBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentUser.movements.push(parseInt(loanAmount.value));
  console.log(loanAmount.value);
  changeUI(currentUser.movements);
  balanceDetials(currentUser.movements, "in");
  balanceDetials(currentUser.movements, "out");
  balanceDetials(currentUser.movements, "interest", currentUser.interestRate);
  balanceAmount =
    parseInt(balanceIn.textContent) - parseInt(balanceOut.textContent);
  balance.textContent = `${balanceAmount}$`;
  loanAmount.blur();
});

closeAccBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let closeIndex = accounts.findIndex(
    (acc) =>
      currentUser.owner === acc.owner && acc.userName === closeAccUser.value
  );
  accounts.splice(closeIndex, 1);
  app.style.opacity = "0";
  welcomeMsg.textContent = "Log in to get started";
});

let sortBtn = document.querySelector(".btn--sort");
sortBtn.addEventListener("click", () => {
  let newMovement = [...currentUser.movements];
  newMovement.sort();
  changeUI(newMovement);
});

console.log(accounts);
