class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext('2d');
    this.intervalId = null;
    this.fps = 60;


    this.player = new Isaac(this.context, this.context.canvas.width / 2 - 50, this.context.canvas.height / 2 - 50, 100, 100);
    this.enemy = new Fly(this.context, 0, this.context.canvas.height / 2 - 25, 25, 25, 5);
    //this.background = new Background(this.context, 0, 0, this.context.canvas.width, this.context.canvas.height);
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
    //this.background.draw();
    this.player.draw();
    this.enemy.draw();
  }

  move() {
    this.player.move();
    this.enemy.move(this.player);
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode);
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode);
  }
}