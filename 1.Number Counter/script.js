let text = document.querySelector(".text");
let decBtn = document.querySelector(".btn-1");
let resetBtn = document.querySelector(".btn-2");
let incBtn = document.querySelector(".btn-3");
let count = 0;

let increase = () => text.textContent = ++count;
let reset = () => text.textContent = count = 0;
let decrease = () => text.textContent = count?--count:0

incBtn.addEventListener("click",increase)
resetBtn.addEventListener("click",reset)
decBtn.addEventListener("click",decrease)
