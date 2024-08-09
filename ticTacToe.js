//runner / game manager file
let gameBoard;
let gameSize = 400;
let boardSlots = 3;
let yourTurn = false;
let turnCount;

//create variables to easily access DOM elements
let text, yestBtn, noBtn;

/*P5JS FUNCTIONS*/
//setup the canvas, DOM access variables, and finally begin pregame setup
function setup() { //called by the p5js library (once)
  //create a canvas and place it into the correct element
  let cnv = createCanvas(gameSize, gameSize);
  cnv.parent("canvasTarget");

  //access the DOM element IDs
  text = document.getElementById("displayText");
  yesBtn = document.getElementById("affirmative");
  noBtn = document.getElementById("negatory");

  //begin the game
  gameBoard = new Board(boardSlots, gameSize);
  preGame();
}
//draw the game
function draw() { //called by the p5js library (repeatedly)
  background(0);
  gameBoard.draw();
}

/*GAME STATES: pre-game, ongoing, post-game*/
//display pre-game text and options
function preGame() {
  //reset the game board
  gameBoard.reset();
  //display the DOM elements
  text.innerHTML = "Let's play a game of Tic-Tac-Toe! Would you like to go first?";
  showButtons();
  yesBtn.onclick = function() { beginGame(true) };
  noBtn.onclick = function() { beginGame(false) };
}
//begin the game loop
function beginGame(beginningTurn) {
  hideDOM();
  yourTurn = beginningTurn;
  turnCount = 0;
  if(!yourTurn) {
    opponentPlays();
  }
}
//end the game
function endGame(playerWon) {
  text.innerHTML = (playerWon === undefined) ? "Well, it's a tie. " 
                               : (playerWon) ? "Congratulations, you won. " 
                                             : "Unfortunately, you lost. ";
  text.innerHTML += "Would you like to play again?";
  showButtons();
  yesBtn.onclick = function() { preGame(); };
  noBtn.onclick = function() { 
    document.getElementById("canvasTarget").innerHTML = "Thanks for playing.";
    hideDOM();
  };
}

/*PLAYER AND COMPUTER TURNS*/
//player turn; mouse activated
function mouseClicked() { //called by the p5js library (on mouse click)
  if(yourTurn) {
    //if the mouse is within the game board
    if(mouseX > 0 && mouseX < gameSize && mouseY > 0 && mouseY < gameSize) {
      if(gameBoard.place(mouseX, mouseY, 'X')) {
        //update turn variables
        turnCount++;
        yourTurn = false;

        //ensure the game isn't over due to turns or a win, then hand the turn over
        if(turnCount < boardSlots * boardSlots) { //turns remain
          if(gameBoard.isWin(mouseX, mouseY)) { //player win
            endGame(true);
          } else { opponentPlays(); } //computer turn
        } else { //The player played last. Either the player wins, or it is a tie
          if(gameBoard.isWin(mouseX, mouseY)) { //player win
            endGame(true);
          } else { endGame(); } //tie
        }
      }
    }
  }
}
//computer turn; immediately called after player turn (or beginning the game)
function opponentPlays() {
    //computer player's placement logic. TODO - replace with smarter logic
    let targetX = random(gameSize);
    let targetY = random(gameSize);
    //attempt to place until a valid move is found
    while(!gameBoard.place(targetX, targetY, 'O')) { 
      targetX = random(gameSize);
      targetY = random(gameSize);
    }
    //update turn count
    turnCount++;

    //ensure the game isn't over due to turns or a win, then hand the turn over
    if(turnCount < boardSlots * boardSlots) { //turns remain
        if(gameBoard.isWin(targetX, targetY)) { //computer win
          endGame(false);
        } else { yourTurn = true; } //player turn
    } else { //The computer played last. Either the computer wins, or it is tie
      if(gameBoard.isWin(targetX, targetY)) { //computer win
        endGame(false);
      } else { endGame(); } //tie
    }
}

/*REPEATED DOM INTERACTION FUNCTIONS*/
//hide the DOM elements
function hideDOM() {
  text.innerHTML = "";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
}
//show the buttons
function showButtons() {
  yesBtn.style.display = "inline";
  noBtn.style.display = "inline";
}