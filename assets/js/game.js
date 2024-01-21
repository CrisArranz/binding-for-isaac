class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext('2d');
    this.intervalId = null;
    this.fps = 60;

    this.level = 1;


    this.player = new Isaac(this.context, this.context.canvas.width / 2 - 50, this.context.canvas.height / 2 - 50, 100, 100);
    this.enemies = [new Fly(this.context, 0, this.context.canvas.height / 2 - 25, 25, 25, 5, this.level)];
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
    this.enemies.forEach(enemy => enemy.draw());
  }

  move() {
    this.player.move();
    this.enemies.forEach(enemy => enemy.move(this.player, this.level));
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode);
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode);
  }
}