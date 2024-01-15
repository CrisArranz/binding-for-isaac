document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('canvasBindingOfIsaac');
  game.start();

  document.addEventListener('keydown', ({ keyCode }) => game.onKeyDown(keyCode))
  document.addEventListener('keyup', ({ keyCode }) => game.onKeyUp(keyCode))
})