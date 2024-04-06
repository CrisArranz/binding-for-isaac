class Mushroom extends Enemy {
  constructor(context, positionX, positionY, width, height, velocityX, velocityY, level) {
    super(context,
      positionX,
      positionY,
      width,
      height,
      './assets/image/sprites/mushroom.png',
      ENEMY.mushroom.dimension.horizontalFrames,
      velocityX,
      velocityY,
      level,
      ENEMY.mushroom.velocity
    );
  }
}