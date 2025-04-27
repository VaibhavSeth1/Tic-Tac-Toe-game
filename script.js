document.addEventListener("DOMContentLoaded", () => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const resetBtn = document.getElementById("reset-btn");
  const status = document.getElementById("status");

  const turnSound = document.getElementById("turn-sound");
  const winSound = document.getElementById("win-sound");
  const loseSound = document.getElementById("lose-sound");

  let currentPlayer = "X";
  let gameOver = false;

  const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin() {
    return WIN_COMBOS.some((combo) =>
      combo.every(
        (i) => cells[i].querySelector("span").textContent === currentPlayer
      )
    );
  }

  function handleClick(e) {
    const cell = e.currentTarget;
    const span = cell.querySelector("span");
    if (gameOver || span.textContent) return;

    // Remove any previous win/lose color
    status.classList.remove("win", "lose");

    // Mark cell
    span.textContent = currentPlayer;
    if (turnSound) {
      turnSound.currentTime = 0;
      turnSound.play();
    }

    // Win check
    if (checkWin()) {
      gameOver = true;
      status.textContent = `Player ${currentPlayer} Wins!`;
      status.classList.add("win");
      if (winSound) winSound.play();
      return;
    }

    // Draw check
    if (cells.every((c) => c.querySelector("span").textContent)) {
      gameOver = true;
      status.textContent = `It's a Draw!`;
      status.classList.add("lose");
      if (loseSound) loseSound.play();
      return;
    }

    // Next player's turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }

  function resetGame() {
    cells.forEach((c) => (c.querySelector("span").textContent = ""));
    currentPlayer = "X";
    gameOver = false;
    status.textContent = `Player ${currentPlayer}'s Turn`;
    status.classList.remove("win", "lose");
  }

  cells.forEach((c) => c.addEventListener("click", handleClick));
  resetBtn.addEventListener("click", resetGame);
});
