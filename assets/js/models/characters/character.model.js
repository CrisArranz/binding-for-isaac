class Character extends Animate {
  constructor(context, positionX, positionY, width, height, sprite) {
    super(context, positionX, positionY, width, height, sprite);
    this.vx = 0;
    this.vy = 0;
    this.weapon = [];
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
        //this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5, { special: true }));
        break;
      case rightShoot:
        this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5, { rigth: true }));
        break;
      case leftShoot:
        this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5, { left: true }));
        break;
      case topShoot:
        this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5, { top: true }));
        break;
      case bottomShoot:
        this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5, { bottom: true }));
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
    this.weapon = this.weapon.filter(bullet => bullet.isVisible())
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