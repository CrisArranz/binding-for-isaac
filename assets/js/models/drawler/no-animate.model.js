class NoAnimate extends Picasso {
  constructor(context, positionX, positionY, width, height, sprite) {
    super(context, positionX, positionY, width, height, sprite);
  }

  draw() {
    super.draw();
  }
}