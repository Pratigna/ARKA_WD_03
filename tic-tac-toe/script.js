

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const statusText = document.getElementById("game-status");
    const restartButton = document.getElementById("restart-btn");
    const playerXScore = document.getElementById("playerX-score");
    const playerOScore = document.getElementById("playerO-score");
    const drawScore = document.getElementById("draw-score");

    const cells = [];
    let currentPlayer = "X";
    let gameActive = true;

    
    let scores = {
        X: 0,
        O: 0,
        Draws: 0,
    };

    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
            cells.push(cell);

        
            cell.addEventListener("click", handleCellClick);
        }
    }

    
    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (cell.classList.contains("taken") || !gameActive) return;

        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        
        if (currentPlayer === "X") {
            cell.classList.add("x-style");
        } else {
            cell.classList.add("o-style");
        }

        if (checkWin()) {
            scores[currentPlayer]++;
            updateScores();
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (isDraw()) {
            scores.Draws++;
            updateScores();
            statusText.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    
    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    
    function isDraw() {
        return cells.every(cell => cell.classList.contains("taken"));
    }

    
    function updateScores() {
        playerXScore.textContent = scores.X;
        playerOScore.textContent = scores.O;
        drawScore.textContent = scores.Draws;
    }

    
    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken", "x-style", "o-style");
        });
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = "Player X's Turn";
    }

    
    createBoard();
    restartButton.addEventListener("click", restartGame);
});
