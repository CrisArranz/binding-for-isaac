class Enemy extends Animate {
  constructor(context, positionX, positionY, width, height, sprite, numberHorizontalFrames, velocityX, velocityY, level, velocity, damage, lives) {
    super(context, positionX, positionY, width, height, sprite, numberHorizontalFrames);
    this.vx = velocityX;
    this.vy = velocityY;
    this.velocity = velocity;

    this.damage = damage;
    this.lives = lives;

    this.point = 100 * level;

    this.isAlive = true;

    this.inBattleground = false;

    this.moveAudio = new Audio("./assets/audio/sprites/enemies_move.wav");
    this.moveAudio.volume = 0.1;

    this.deadAudio = new Audio("./assets/audio/sprites/enemies_dead.wav");
    this.deadAudio.volume = 0.1;

    this.tickAudio = 0;
  }

  draw(){
    super.draw();
    this.playAudio();
  }

  chasePlayer(player, level) {
    if (this.positionX > (player.positionX + player.width / 2 - this.width / 2)) {
      this.vx = -this.velocity - Math.floor(level / 5);
    }
    if (this.positionX < (player.positionX + player.width / 2 - this.width / 2)) {
      this.vx = this.velocity + Math.floor(level / 5);
    }
    if (this.positionY > (player.positionY + player.height / 2 - this.height / 2)) {
      this.vy = -this.velocity - Math.floor(level / 5);
    }
    if (this.positionY < (player.positionY + player.height / 2 - this.height / 2)) {
      this.vy = this.velocity + Math.floor(level / 5);
    }
  }

  onBattleground() {
    return this.positionX + this.width < this.context.canvas.width && this.positionX > 0 && this.positionY > 0 && this.positionY + this.height < this.context.canvas.height;
  }

  playAudio() {
    if (this.tickAudio > ENEMY_PLAY_AUDIO_MOVEMENT_TICK) {
      this.tickAudio = 0;
      this.moveAudio.play();
    }

    this.tickAudio++;
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