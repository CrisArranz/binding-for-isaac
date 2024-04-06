class Boss extends Enemy {
  constructor(context, positionX, positionY, width, height, velocityX, velocityY, level) {
    super(
      context,
      positionX,
      positionY,
      width,
      height,
      './assets/image/sprites/boss.png',
      ENEMY.boss.dimension.horizontalFrames,
      velocityX,
      velocityY,
      level,
      ENEMY.boss.velocity,
      ENEMY.boss.damage,
      ENEMY.boss.lives
    );
  }
}