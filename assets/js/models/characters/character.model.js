class Character extends Animate {
  constructor(context, positionX, positionY, width, height) {
    super(context, positionX, positionY, width, height);
    this.vx = CHARACTER.velocity;
    this.vy = CHARACTER.velocity;

    this.weapon = [];
  }

  draw(){
    super.draw();
    this.weapon.forEach(bullet => bullet.draw())
  }
}