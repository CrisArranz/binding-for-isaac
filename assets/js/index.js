document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("start-button").addEventListener("click", (_) => {
    document.getElementById("homepage").classList.add("inactive");
    document.getElementById("canvas-binding-of-isaac").classList.remove("inactive")
    startGame();
  })
});

function endGame() {
  document.getElementById("homepage").classList.remove("inactive");
  document.getElementById("canvas-binding-of-isaac").classList.add("inactive")
}


function startGame() {
  const game = new Game('canvas-binding-of-isaac');
  game.start(endGame);

  document.addEventListener('keydown', ({ keyCode }) => game.onKeyDown(keyCode));
  document.addEventListener('keyup', ({ keyCode }) => game.onKeyUp(keyCode));
}