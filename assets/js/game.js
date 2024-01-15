class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext('2d');
    this.intervalId = null;
    this.fps = 60;


    this.player = new Isaac(this.context, 10, 10, 100, 100);
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
    }, 1000 / this.fps)
  }

  clear() {
    this.player.clear();
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  draw() {
    this.player.draw();
  }

  move() {
    this.player.move();
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode);
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode);
  }
}