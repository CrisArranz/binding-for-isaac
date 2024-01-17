class Enemy extends Animate {
  constructor(context, positionX, positionY, width, height, velocity) {
    super(context, positionX, positionY, width, height);
    this.velocity = velocity;
    this.vx = velocity;
    this.vy = velocity;
  }


  draw(){
    super.draw();
  }


  move(player) {
    if (this.positionX > player.positionX + player.width / 2) {
      this.vx = -this.velocity;
    }
    if (this.positionY > player.positionY + player.height / 2) {
      this.vy = -this.velocity;
    }
    if (this.positionX < player.positionX + player.width / 2) {
      this.vx = this.velocity;
    }
    if (this.positionY < player.positionY + player.height / 2) {
      this.vy = this.velocity;
    }

    if (this.positionX === player.positionX + player.width / 2) {
      this.vx = 0;
    }

    if (this.positionY === player.positionY + player.height / 2) {
      this.vy = 0;
    }

    this.positionX += this.vx;
    this.positionY += this.vy;
  }
}