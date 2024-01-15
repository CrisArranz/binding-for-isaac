class Isaac extends Character{
  constructor(context, positionX, positionY, width, height) {
    super(context, positionX, positionY, width, height);
    this.name = 'ISAAC';
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    this.positionX += this.vx;
    this.positionY += this.vy;
    this.checkLimits();
    this.bullets.forEach(bullet => bullet.move());
  }

  clear() {
    this.clearBullets();
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bullet => bullet.isVisible())
  }

  checkLimits() {
    if (this.positionX + this.width >= this.context.canvas.width) {
      this.positionX = this.context.canvas.width - this.width;
    }

    if (this.positionX <= 0) {
      this.positionX = 0;
    }

    if (this.positionY + this.height >= this.context.canvas.height) {
      this.positionY = this.context.canvas.height - this.height;
    }

    if (this.positionY <= 0) {
      this.positionY = 0;
    }
  }

  onKeyDown(keyCode) {
    switch(keyCode){
      case CHARACTER.moves.right:
        this.vx = CHARACTER.velocity;
        break;
      case CHARACTER.moves.left:
        this.vx = -CHARACTER.velocity;
        break;
      case CHARACTER.moves.top:
        this.vy = -CHARACTER.velocity;
        break;
      case CHARACTER.moves.bottom:
        this.vy = CHARACTER.velocity;
        break;
      case CHARACTER.moves.shoot:
        this.weapon.push(new Bullet(this.context, this.positionX + (this.width / 2), this.positionY + (this.height / 2), 5, 5));
        break;
    }
  }

  onKeyUp(keyCode) {
    switch(keyCode){
      case CHARACTER.moves.right:
      case CHARACTER.moves.left:
        this.vx = 0;
        break;
      case CHARACTER.moves.top:
      case CHARACTER.moves.bottom:
        this.vy = 0;
        break;
    }
  }
}