//winning conditions for handleResultValidation function
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//store Game Status element to use later
const statusDisplay = document.querySelector('.game--status');

//declare variables to track game state

//gameActive will pause game in case of an end scenario
let gameActive = true;

//store current player
let currentPlayer = "X"

//store current game state here
//form of empty strings in an array
//allow for easy tracking and validating cells
let gameState = ["", "", "", "", "", "", "", "", ""];

//declaring messages for the display
const winningMessage = () => `Player ${currentPlayer} has won!`;//display the player has won
const drawMessage = () => `Game ended in a draw!`;//display the game ended as a draw
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`;//display player's turn

//set initial message to inform players to know who's turn it is
statusDisplay.innerHTML = currentPlayerTurn();

//functions
function handleCellPlayed(clickedCell, clickedCellIndex) {
    //update internal game to reflect the played move
    //update the UI to reflect move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
    //simply changes the current player
    //updates the game status

    currentPlayer = currentPlayer === "X" ? "O" : "X"; //using ternary operator
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage()
        gameActive = false;
        return;
    }

    //will check if there are values in our game state array
    //that are still not populated with player sign

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //if we get here, no one won the game yet
    //there are more moves to be played
    //so we continue by changing the current player

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent){
    //save the clicked HTML in variable for later
    const clickedCell = clickedCellEvent.target;

    //grab 'data-cell-index' attribute from clicked cell to identify where cell is on our grid
    //NOTE: will return string value -> will parse it into an Integer value
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    //check if call has already been played
    //or if game has been paused
    //if either is true, game will ignore the click
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    //if everything is in order we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//event listeners for the game cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);