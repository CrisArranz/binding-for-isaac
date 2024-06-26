class Bullet extends Animate {
  constructor(context, positionX, positionY, width, height, direction, sprite = './assets/image/items/bullet.png') {
    super(context, positionX, positionY, width, height, sprite);
    this.v = BULLETS_CONFIG.velocity;
    this.direction = direction;
    this.impact = false;
    this.damage = 1;

    this.normalShootAudio = new Audio("./assets/audio/sprites/normal_shoot.wav");
    this.normalShootAudio.volume = 0.1;

    this.specialShootAudio = new Audio("./assets/audio/sprites/special_shoot.wav");
    this.specialShootAudio.volume = 0.1;

    if (this.direction.special) {
      this.specialShootAudio.play();
    } else {
      this.normalShootAudio.play();
    }
  }


  move() {
    if (this.direction.rigth) {
      this.positionX += this.v;
    }
    if (this.direction.left) {
      this.positionX -= this.v;
    }
    if (this.direction.bottom) {
      this.positionY += this.v;
    }
    if (this.direction.top) {
      this.positionY -= this.v;
    }
  }

  isVisible() {
    return this.positionX < this.context.canvas.width 
      && this.positionX + this.width > 0 
      && this.positionY < this.context.canvas.height 
      && this.positionY + this.height > 0
  }

  hasImpact() {
    this.impact = true;
  }
}