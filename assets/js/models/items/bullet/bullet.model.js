class Bullet extends Animate {
  constructor(context, positionX, positionY, width, height, direction, sprite) {
    super(context, positionX, positionY, width, height, sprite);
    this.v = 10;
    this.direction = direction;
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
}