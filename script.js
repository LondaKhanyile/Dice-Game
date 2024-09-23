let gameState = {
    players: [
        { id: 1, score: 0, currentTurnScore: 0 },
        { id: 2, score: 0, currentTurnScore: 0 }
    ],
    currentPlayerIndex: 0,
    targetScore: 50,
    isGameOver: false
};

const rollBtn = document.getElementById('roll-btn');
const holdBtn = document.getElementById('hold-btn');
const newGameBtn = document.getElementById('new-game-btn');
const diceOutput = document.getElementById('dice-output');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const currentPlayerDisplay = document.getElementById('current-player');
const messageDisplay = document.getElementById('message');

function switchPlayer() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % 2;
    currentPlayerDisplay.textContent = gameState.currentPlayerIndex + 1;
    gameState.players[gameState.currentPlayerIndex].currentTurnScore = 0;
}

function updateScores() {
    player1Score.textContent = gameState.players[0].score;
    player2Score.textContent = gameState.players[1].score;
}

function checkWin() {
    if (gameState.players[gameState.currentPlayerIndex].score >= gameState.targetScore) {
        messageDisplay.textContent = `Player ${gameState.currentPlayerIndex + 1} wins!`;
        gameState.isGameOver = true;
    }
}

rollBtn.addEventListener('click', () => {
    if (gameState.isGameOver) return;

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = dice1 + dice2;

    diceOutput.textContent = `${dice1} + ${dice2} = ${diceSum}`;
    gameState.players[gameState.currentPlayerIndex].currentTurnScore += diceSum;

    if (diceSum === 7) {
        messageDisplay.textContent = `Player ${gameState.currentPlayerIndex + 1} rolled a 7! Score resets.`;
        gameState.players[gameState.currentPlayerIndex].score = 0;
        updateScores();
        switchPlayer();
    } else {
        messageDisplay.textContent = '';
    }
});

holdBtn.addEventListener('click', () => {
    if (gameState.isGameOver) return;

    gameState.players[gameState.currentPlayerIndex].score += gameState.players[gameState.currentPlayerIndex].currentTurnScore;
    updateScores();
    checkWin();
    if (!gameState.isGameOver) switchPlayer();
});

newGameBtn.addEventListener('click', () => {
    gameState = {
        players: [
            { id: 1, score: 0, currentTurnScore: 0 },
            { id: 2, score: 0, currentTurnScore: 0 }
        ],
        currentPlayerIndex: 0,
        targetScore: 50,
        isGameOver: false
    };
    diceOutput.textContent = '-';
    messageDisplay.textContent = '';
    updateScores();
    currentPlayerDisplay.textContent = '1';
});
