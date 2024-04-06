class Fly extends Enemy {
  constructor(context, positionX, positionY, width, height, velocityX, velocityY, level) {
    super(context,
      positionX,
      positionY,
      width,
      height,
      './assets/image/sprites/fly.png',
      ENEMY.fly.dimension.horizontalFrames,
      velocityX,
      velocityY,
      level,
      ENEMY.fly.velocity,
      ENEMY.fly.damage,
      ENEMY.fly.lives
    );
  }
}