class Spider extends Enemy {
  constructor(context, positionX, positionY, width, height, velocityX, velocityY, level) {
    super(context,
      positionX,
      positionY,
      width,
      height,
      './assets/image/sprites/spider.png',
      ENEMY.spider.dimension.horizontalFrames,
      velocityX,
      velocityY,
      level,
      ENEMY.spider.velocity
    );
  }
}