class Heart extends NoAnimate {
  constructor(context, positionX, positionY, width, height, sprite = './assets/image/items/heart.png') {
    super(context, positionX, positionY, width, height, sprite);
    this.impact = false;
    this.heal = 1;
  }

  hasImpact() {
    this.impact = true;
  }
}