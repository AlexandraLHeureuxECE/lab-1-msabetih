const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function updateStatus(text) {
  statusEl.textContent = text;
}

function setEndState(type) {
  statusEl.classList.remove('win', 'draw');
  resetBtn.classList.remove('attention');
  if (type) {
    statusEl.classList.add(type);
    resetBtn.classList.add('attention');
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

function handleCellClick(e) {
  const index = Number(e.currentTarget.dataset.index);
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.classList.add(currentPlayer === 'X' ? 'x' : 'o');
  e.currentTarget.disabled = true;

  const winnerCombo = checkWinner();
  if (winnerCombo) {
    gameOver = true;
    winnerCombo.forEach((i) => cells[i].classList.add('winner'));
    updateStatus(`Player ${currentPlayer} wins!`);
    setEndState('win');
    return;
  }

  if (!board.includes('')) {
    gameOver = true;
    updateStatus('Draw game.');
    setEndState('draw');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'winner');
  });
  setEndState(null);
  updateStatus("Player X's turn");
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
