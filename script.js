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

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function handleCellClick(e) {
  const index = Number(e.currentTarget.dataset.index);
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.disabled = true;

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    updateStatus(`Player ${winner} wins!`);
    return;
  }

  if (!board.includes('')) {
    gameOver = true;
    updateStatus('Draw game.');
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
  });
  updateStatus("Player X's turn");
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
