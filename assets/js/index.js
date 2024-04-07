document.addEventListener('DOMContentLoaded', () => {

  const openingMusic = new Audio("./assets/audio/game-music.mp3");
  openingMusic.volume = 0.2;

  document.getElementById("start-button").addEventListener("click", (_) => {
    document.getElementById("homepage").classList.add("inactive");
    document.getElementById("canvas-binding-of-isaac").classList.remove("inactive");
    startGame();
  });

  document.getElementById("volume-on").addEventListener("click", (_) => {
    document.getElementById("volume-on").classList.add("inactive");
    document.getElementById("volume-off").classList.remove("inactive");
    openingMusic.pause();
  });

  document.getElementById("volume-off").addEventListener("click", (_) => {
    document.getElementById("volume-off").classList.add("inactive");
    document.getElementById("volume-on").classList.remove("inactive");
    openingMusic.play();
  });
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