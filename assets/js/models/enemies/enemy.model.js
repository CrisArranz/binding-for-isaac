class Enemy extends Animate {
  constructor(context, positionX, positionY, width, height, velocity, level) {
    super(context, positionX, positionY, width, height);
    this.vx = velocity;
    this.vy = velocity;

    this.point = 100 * level;

    this.isAlive = true;

    this.inBattleground = false;
  }

  draw(){
    super.draw();
  }

  chasePlayer(player, level) {
    if (this.positionX > (player.positionX + player.width / 2 - this.width / 2)) {
      this.vx = -3 - Math.floor(level / 5);
    }
    if (this.positionX < (player.positionX + player.width / 2 - this.width / 2)) {
      this.vx = 3 + Math.floor(level / 5);
    }
    if (this.positionY > (player.positionY + player.height / 2 - this.height / 2)) {
      this.vy = -3 - Math.floor(level / 5);
    }
    if (this.positionY < (player.positionY + player.height / 2 - this.height / 2)) {
      this.vy = 3 + Math.floor(level / 5);
    }
  }

  onBattleground() {
    return this.positionX + this.width < this.context.canvas.width && this.positionX > 0 && this.positionY > 0 && this.positionY + this.height < this.context.canvas.height;
  }

  isCollision(bullet) {
    return this.positionX + this.width >= bullet.positionX && this.positionX <= bullet.positionX + bullet.width && this.positionY + this.height >= bullet.positionY && this.positionY <= bullet.positionY + bullet.h;
  }


  move(player, level) {
    if (this.inBattleground) {      
      this.chasePlayer(player, level);
      if (this.positionX - (player.positionX + player.width / 2 - this.width / 2) < 3 && (player.positionX + player.width / 2 - this.width / 2) - this.positionX < 3) {
        this.vx = 0;
      }
  
      if (this.positionY - (player.positionY + player.height / 2 - this.height / 2) < 3 && (player.positionY + player.height / 2 - this.height / 2) - this.positionY < 3) {
        this.vy = 0;
      }
      if (this.positionX + this.width > this.context.canvas.width) {
        this.positionX = this.context.canvas.width - this.w;
      }
  
      if (this.positionX <= 0) {
        this.positionX = 0;
      }
  
      if (this.positionY + this.height > this.context.canvas.height) {
        this.positionY = this.context.canvas.height - this.h;
      }
  
      if (this.positionY <= 0) {
        this.positionY = 0;
      }

    } else {
      this.inBattleground = this.onBattleground();
    }

    this.positionX += this.vx;
    this.positionY += this.vy;
  }
}