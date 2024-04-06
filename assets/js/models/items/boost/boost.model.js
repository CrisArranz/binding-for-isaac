class Boost extends NoAnimate {
  constructor(context, positionX, positionY, width, height, sprite = './assets/image/items/boost.png') {
    super(context, positionX, positionY, width, height, sprite);
    this.impact = false;
  }

  hasImpact() {
    this.impact = true;
  }
}