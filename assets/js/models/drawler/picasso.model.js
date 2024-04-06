class Picasso {
  constructor(context, positionX, positionY, width, height, sprite, numberFrames = 1) {
    this.context = context;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.sprite.horizontalFrames = numberFrames;
    this.sprite.horizontalFramesIndex = 0;
    this.sprite.verticalFrames = 1;
    this.sprite.vertitalFramesIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.context.drawImage(
        this.sprite,
        this.sprite.horizontalFramesIndex * this.sprite.frameWidth,
        this.sprite.vertitalFramesIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  }
}