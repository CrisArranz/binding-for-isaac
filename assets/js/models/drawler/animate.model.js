class Animate extends Picasso {
  constructor(context, positionX, positionY, width, height, sprite, numberHorizontalFrames) {
    super(context, positionX, positionY, width, height, sprite, numberHorizontalFrames);
    this.animationTick = 0;
  }

  draw() {
    super.draw();
    this.animate();
  }

  animate() {
    this.animationTick++;

    if (this.animationTick > SPRITES_TICKS) {
      this.animationTick = 0;
      this.sprite.horizontalFramesIndex++;

      if (this.sprite.horizontalFramesIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFramesIndex = 0;
      }
    }
  }

  isCollision(objectNoIdentify) {
    return this.positionX + this.width >= objectNoIdentify.positionX && 
      this.positionX <= objectNoIdentify.positionX + objectNoIdentify.width && 
      this.positionY + this.height >= objectNoIdentify.positionY && 
      this.positionY <= objectNoIdentify.positionY + objectNoIdentify.height;
  }
}