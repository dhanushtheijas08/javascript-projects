'use strict';

// Variable allocation
let play1 = document.querySelector(".player--0");
let play2 = document.querySelector(".player--1");

let player1 = document.getElementById("score--0"); // Id Selector (getElementById) don't need #
let player2 = document.querySelector("#score--1");

let resetBtn = document.querySelector(".btn--new");
let dice = document.querySelector(".dice");
let roll = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");
let ranDice = ["dice-1.png" ,"dice-2.png" ,"dice-3.png" , "dice-4.png" , "dice-5.png" ,"dice-6.png"];

let score1 = document.querySelector("#current--0");
let score2 = document.querySelector("#current--1");

let tempScore1 = 0;
let tempScore2 = 0;

let perScore1 = 0;
let perScore2 = 0;


player1.textContent = 0;
player2.textContent = 0;
dice.classList.add("hidden");
roll.addEventListener("click" , function()
{
    let rand = Math.floor(Math.random() * ranDice.length);
    console.log(ranDice[rand] , rand+1);
    dice.classList.remove("hidden");
    dice.setAttribute("src" , ranDice[rand]);
    if(rand+1 !== 1)
    {
        if(play1.classList.contains("player--active"))
        {
            tempScore1 = tempScore1 + rand + 1;
            score1.textContent = tempScore1;
        }
        else
        {
            tempScore2 = tempScore2 + rand + 1;
            score2.textContent = tempScore2;
        }
    }
    else
    {
        if(play1.classList.contains("player--active"))
        {
            tempScore1 = tempScore1 + rand + 1;
            perScore1 = perScore1 + tempScore1;
            player1.textContent = perScore1;
            tempScore1 = 0;
            score1.textContent = tempScore1;
            dice.classList.add("hidden");
            play1.classList.remove("player--active");
            play2.classList.add("player--active");
        }
        else
        {
            tempScore2 = tempScore2 + rand + 1;
            perScore2 = perScore2 + tempScore2;
            player2.textContent = perScore2;
            tempScore2 = 0;
            score2.textContent = tempScore2;
            dice.classList.add("hidden");
            play2.classList.remove("player--active");
            play1.classList.add("player--active");
        }
    }
}
);

holdBtn.addEventListener("click" , function()
{
    if(play1.classList.contains("player--active"))
        nextPlay1_2();
    else
        nextPlay2_1();
}
);

function nextPlay1_2() {
    perScore1 = perScore1 + tempScore1;
    player1.textContent = perScore1;
    tempScore1 = 0;
    score1.textContent = tempScore1;
    dice.classList.add("hidden");
    play1.classList.remove("player--active");
    play2.classList.add("player--active");
}

let nextPlay2_1 = function()
{
    perScore2 = perScore2 + tempScore2;
    player2.textContent = perScore2;
    tempScore2 = 0;
    score2.textContent = tempScore2;
    dice.classList.add("hidden");
    play2.classList.remove("player--active");
    play1.classList.add("player--active");
}


resetBtn.addEventListener("click" , function()
{
    tempScore1 = 0;
    tempScore2 = 0;
    perScore1 = 0;
    perScore2 = 0;

    player1.textContent = perScore1;
    score1.textContent = tempScore1;
    player2.textContent = perScore2;
    score2.textContent = tempScore2;

    dice.classList.add("hidden");
    play2.classList.remove("player--active");
    play1.classList.add("player--active");
}
);