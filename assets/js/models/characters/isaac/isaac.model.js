class Isaac extends Character{
  constructor(context, positionX, positionY, width, height) {
    super(context, positionX, positionY, width, height, './assets/image/sprites/isaac.png');
    this.name = 'ISAAC';
    this.lives = 10;
    this.canReceivedDamage = true;
    this.tickReceivedDamage = 0;
  }

  showLives() {
    for (let i = 0; i < this.lives; i++) {
      this.context.drawImage(this.imageLives, 5 + (i * 25), 5, 25, 25);  
    }
  }
}