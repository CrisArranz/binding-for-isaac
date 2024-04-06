class Isaac extends Character{
  constructor(context, positionX, positionY, width, height) {
    super(context, positionX, positionY, width, height, './assets/image/sprites/isaac.png');
    this.name = 'ISAAC';
    this.lives = 10;
    this.canReceivedDamage = true;
    this.tickReceivedDamage = 0;
  }
}