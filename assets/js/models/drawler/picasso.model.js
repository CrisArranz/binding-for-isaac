class Picasso {
  constructor(context, positionX, positionY, width, height) {
    this.context = context;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}