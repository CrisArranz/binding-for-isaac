class Bullet extends Animate {
  constructor(context, positionX, positionY, width, height) {
    super(context, positionX, positionY, width, height);
    this.vx = 10;
  }


  move() {
    this.positionX += this.vx;
  }

  isVisible() {
    return this.positionX < this.context.canvas.width 
      && this.positionX + this.width > 0 
      && this.positionY < this.context.canvas.height 
      && this.positionY + this.height > 0
  }
}