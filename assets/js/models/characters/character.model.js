class Character extends Animate {
  constructor(context, positionX, positionY, width, height, sprite) {
    super(context, positionX, positionY, width, height, sprite);
    this.vx = 0;
    this.vy = 0;
    this.canSpecialAttack = false;
    this.imageSpecialAttack = new Image();
    this.imageSpecialAttack.src="./assets/image/miscellaneous/special_attack.png";
    this.weapon = [];

    this.imageLives = new Image();
    this.imageLives.src = './assets/image/items/heart.png';

    this.damageAudio = new Audio("./assets/audio/sprites/player_damage.wav");
    this.damageAudio.volume = 0.1;

    this.deadAudio = new Audio("./assets/audio/sprites/player_dead.wav");
    this.deadAudio.volume = 0.1;
  }

  draw(){
    super.draw();
    this.weapon.forEach(bullet => bullet.draw());
  }

  onKeyDown(keyCode) {
    const { right, left, top, bottom } = CHARACTER.moves.directions;
    const { special, rightShoot, leftShoot, topShoot, bottomShoot } = CHARACTER.moves.shoot;
    switch(keyCode){
      case right:
        this.vx = CHARACTER.velocity;
        break;
      case left:
        this.vx = -CHARACTER.velocity;
        break;
      case top:
        this.vy = -CHARACTER.velocity;
        break;
      case bottom:
        this.vy = CHARACTER.velocity;
        break;
      case special:
        if (this.canSpecialAttack) {
          this.canSpecialAttack = false;
          this.weapon.push(
            new Bullet(
              this.context,
              this.positionX + (this.width / 2 - 10),
              this.positionY + (this.height / 2 - 15),
              BULLETS_CONFIG.width,
              BULLETS_CONFIG.height,
              { rigth: true, special: true }
            )
          );
          this.weapon.push(
            new Bullet(
              this.context,
              this.positionX + (this.width / 2 - 10),
              this.positionY + (this.height / 2 - 15),
              BULLETS_CONFIG.width,
              BULLETS_CONFIG.height,
              { left: true, special: true }
            )
          );
          this.weapon.push(
            new Bullet(
              this.context,
              this.positionX + (this.width / 2 - 10),
              this.positionY + (this.height / 2 - 25),
              BULLETS_CONFIG.width,
              BULLETS_CONFIG.height,
              { top: true, special: true }
            )
          );
          this.weapon.push(
            new Bullet(
              this.context,
              this.positionX + (this.width / 2 - 10),
              this.positionY + (this.height / 2 - 25),
              BULLETS_CONFIG.width,
              BULLETS_CONFIG.height,
              { bottom: true, special: true }
            )
          );
        }
        break;
      case rightShoot:
        this.weapon.push(
          new Bullet(
            this.context,
            this.positionX + (this.width / 2 - 10),
            this.positionY + (this.height / 2 - 15),
            BULLETS_CONFIG.width,
            BULLETS_CONFIG.height,
            { rigth: true }
          )
        );
        break;
      case leftShoot:
        this.weapon.push(
          new Bullet(
            this.context,
            this.positionX + (this.width / 2 - 10),
            this.positionY + (this.height / 2 - 15),
            BULLETS_CONFIG.width,
            BULLETS_CONFIG.height,
            { left: true }
          )
        );
        break;
      case topShoot:
        this.weapon.push(
          new Bullet(
            this.context,
            this.positionX + (this.width / 2 - 10),
            this.positionY + (this.height / 2 - 25),
            BULLETS_CONFIG.width,
            BULLETS_CONFIG.height,
            { top: true }
          )
        );
        break;
      case bottomShoot:
        this.weapon.push(
          new Bullet(
            this.context,
            this.positionX + (this.width / 2 - 10),
            this.positionY + (this.height / 2 - 25),
            BULLETS_CONFIG.width,
            BULLETS_CONFIG.height,
            { bottom: true }
          )
        );
        break;
    }
  }

  onKeyUp(keyCode) {
    const { right, left, top, bottom } = CHARACTER.moves.directions;
    switch(keyCode){
      case right:
      case left:
        this.vx = 0;
        break;
      case top:
      case bottom:
        this.vy = 0;
        break;
    }
  }

  move() {
    this.positionX += this.vx;
    this.positionY += this.vy;
    this.checkLimits();
    this.weapon.forEach(bullet => bullet.move());
  }

  clear() {
    this.clearBullets();
  }

  clearBullets() {
    this.weapon = this.weapon.filter(bullet => bullet.isVisible() && !bullet.impact)
  }

  checkLimits() {
    if (this.positionX + this.width >= this.context.canvas.width - BACKGROUND.limits) {
      this.positionX = this.context.canvas.width - this.width - BACKGROUND.limits;
    }

    if (this.positionX <= BACKGROUND.limits) {
      this.positionX = BACKGROUND.limits;
    }

    if (this.positionY + this.height >= this.context.canvas.height - BACKGROUND.limits) {
      this.positionY = this.context.canvas.height - this.height - BACKGROUND.limits;
    }

    if (this.positionY <= BACKGROUND.limits) {
      this.positionY = BACKGROUND.limits;
    }
  }
}