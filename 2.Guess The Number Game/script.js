'use strict';
let highScore = 0, score = 20;
let gNum = Math.floor(Math.random() * 11);
document.querySelector(".check").addEventListener('click', function () {
    const inNum = Number(document.querySelector(".guess").value);
    // Invalid Input
    if (!inNum)
        document.querySelector(".message").textContent = "Enter a Valid Number 🤷‍♂️";
    
    // Corretct Number
    else if (gNum === inNum) 
    {
        document.querySelector(".message").style.display="none";
        document.querySelector("h1").textContent = "You Won 🏆"
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").textContent = "🥇";

        // High Score
        if(highScore < score)
        {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    }

    // Wrong Number
    else 
    {
        document.querySelector(".message").textContent = "Try Again";
        console.log(gNum);

        document.querySelector(".message").textContent = (gNum > inNum) ?"Too Low" : "Too High";
        if(score <= 0)
        {
            score = 0;
            document.querySelector(".score").textContent = score;
            document.querySelector(".message").textContent = "You Lost 😑";
            document.querySelector(".number").textContent = gNum;
            document.querySelector(".number").style.backgroundColor = "#60b347";
            document.querySelector("h1").textContent = "Correct Number is 🤡"
        }
        else
        {
            document.querySelector(".score").textContent = score--;
            document.querySelector(".message").textContent = (gNum > inNum) ?"Too Low" : "Too High";
        }
    }
}
);

// Again Button
document.querySelector(".again").addEventListener("click" , function()
{
    score = 20;
    gNum = Math.floor(Math.random() * 11);
    console.log("Score : " + score);
    document.querySelector(".score").textContent = 20;
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector("h1").textContent = "Guess My Number!";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.backgroundColor = "#eee";
    document.querySelector(".guess").value = " ";
}
);

