let sp1 = document.querySelector("#sp1"); // X
let sp2 = document.querySelector("#sp2"); // O
let clear = document.querySelector("#clear"); // clear button
let computer = document.querySelector("#computer"); // computer button
let record = document.querySelector("#score"); // Scoreboard button
let prev = document.getElementById("prev"); // Previous page button

// Check if the elements exist before adding event listeners
if (record) {
    record.addEventListener("click", () => {
        window.open( "TTTpage2.html","_blank"); // Redirect to the scoreboard page
    });
}

if (prev) {
    prev.addEventListener("click", () => {
        window.open( "game.html","_blank"); // Redirect to the game page
    });
}


if (computer) {
    let computerCheck = false; // Flag to track if computer mode is enabled

    computer.addEventListener("click", () => {
        // Toggle computer mode on and off
        computerCheck = !computerCheck;

        // Update button style and text to indicate the mode
        if (computerCheck) {
            computer.style.cssText = "background:lightcoral";
            computer.innerText = "Computer Mode Off"; // Change button text to Manual Mode when in computer mode
        } else {
            computer.style.cssText = "background:greenyellow";
            computer.innerText = "Computer Mode On"; // Change button text to Computer Mode when in manual mode
        }
    });
}

let boxes = document.querySelectorAll(".b1");
let resetBtn = document.querySelector("#resbtn");
let msg = document.querySelector(".msg");

if (boxes.length > 0) {
    let turn0 = true;
    let winnerX = 0;
    let winnerO = 0;

    const wining_pattern = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const show_winner = (winner) => {
        setTimeout(() => {
            let down = true;
            msg.innerText = `CONGRATS! WINNER IS ${winner} PLAYER`;
            if (down) {
                msg.style.cssText = "height:500px";
                down = false;
            }
        }, 500);
    };

    const check_winner = () => {
        for (let pattern of wining_pattern) {
            if (
                boxes[pattern[0]].innerText === "X" &&
                boxes[pattern[1]].innerText === "X" &&
                boxes[pattern[2]].innerText === "X"
            ) {
                let winner = "X";
                show_winner(winner);
                winnerX++;
               if(sp1){ sp1.innerText = winnerX;}
                return; // Stop checking further patterns
            } else if (
                boxes[pattern[0]].innerText === "O" &&
                boxes[pattern[1]].innerText === "O" &&
                boxes[pattern[2]].innerText === "O"
            ) {
                let winner = "O";
                show_winner(winner);
                winnerO++;

                if(sp2){sp2.innerText = winnerO;}
                return; // Stop checking further patterns
            }
        }
        let isdraw = true;
        boxes.forEach((box) => {
            if (box.innerText == "") {
                isdraw = false;
            }
        });
        if (isdraw) {
            msg.innerText = "OOPS! MATCH DRAW";
            msg.style.cssText = "height:500px";
        }
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            // Player X's turn
            if (turn0) {
                box.innerText = "X";
                box.disabled = true; // Disable clicked box
                turn0 = false; // Switch turn to O
                check_winner(); // Check if X has won
            }
            // Player O's turn
            else {
                box.innerText = "O";
                box.disabled = true; // Disable clicked box
                turn0 = true; // Switch turn to X
                check_winner(); // Check if O has won
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            boxes.forEach((box) => {
                box.innerText = ""; // Clear box text
                box.disabled = false; // Enable all boxes
                msg.innerText = "";
                msg.style.cssText = "height:20px";
            });
            turn0 = true; // Reset turn to Player O
        });
    }
}
