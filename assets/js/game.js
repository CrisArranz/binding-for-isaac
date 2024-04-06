class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext('2d');
    this.intervalId = null;
    this.fps = 60;

    this.level = 1;

    this.score = 0;

    this.addEnemyTick = 0;
    this.numberEnemies = 0;
    this.numberMaxEnemiesPerLevel = 0;

    this.background = new Background(this.context, 0, 0, this.context.canvas.width, this.context.canvas.height);
    this.player = new Isaac(this.context, this.context.canvas.width / 2 - 50, this.context.canvas.height / 2 - 50, 100, 100);
    this.enemies = [];

    this.nextLevel = true;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.coolDownDamagePlayer();
      this.checkCollision();
      this.addEnemies();
      if (this.nextLevel) {
        this.nextLevel = false;
        this.player.weapon = [];
        this.numberEnemies = 0;
        this.numberMaxEnemiesPerLevel = 5 * this.level;
      }
    }, 1000 / this.fps)
  }

  addEnemies() {
    if (this.addEnemyTick > ENEMY_ADD_TICK) {
      this.addEnemyTick = 0;
      if (this.numberEnemies < this.numberMaxEnemiesPerLevel) {
        this.numberEnemies++;
        const direction = ENEMY_CONFIG_KEYS.directions[Math.floor(Math.random() * ENEMY_CONFIG_KEYS.directions.length)];
        if (this.numberEnemies === this.numberMaxEnemiesPerLevel){
          this.enemies.push(new Boss(this.context, ENEMY_CONFIG_START_POSITION.positionX[direction] - ENEMY.boss.dimension.width / 2, ENEMY_CONFIG_START_POSITION.positionY[direction] - (ENEMY.boss.dimension.height / 2), ENEMY.boss.dimension.width, ENEMY.boss.dimension.width, ENEMY_CONFIG_START_POSITION.velocityX[direction], ENEMY_CONFIG_START_POSITION.velocityY[direction], this.level),)
        } else {
          const typeEnemy = ENEMY_CONFIG_KEYS.type[Math.floor(Math.random() * ENEMY_CONFIG_KEYS.type.length)];
          switch(typeEnemy) {
            case 'fly':
              this.enemies.push(new Fly(this.context, ENEMY_CONFIG_START_POSITION.positionX[direction] - ENEMY.fly.dimension.width / 2, ENEMY_CONFIG_START_POSITION.positionY[direction] - (ENEMY.fly.dimension.height / 2), ENEMY.fly.dimension.width, ENEMY.fly.dimension.width, ENEMY_CONFIG_START_POSITION.velocityX[direction], ENEMY_CONFIG_START_POSITION.velocityY[direction], this.level),)
              break;
            case 'spider':
              this.enemies.push(new Spider(this.context, ENEMY_CONFIG_START_POSITION.positionX[direction] - ENEMY.spider.dimension.width / 2, ENEMY_CONFIG_START_POSITION.positionY[direction] - (ENEMY.spider.dimension.height / 2), ENEMY.spider.dimension.width, ENEMY.spider.dimension.width, ENEMY_CONFIG_START_POSITION.velocityX[direction], ENEMY_CONFIG_START_POSITION.velocityY[direction], this.level),)
              break;
            case 'mushroom':
              this.enemies.push(new Mushroom(this.context, ENEMY_CONFIG_START_POSITION.positionX[direction] - ENEMY.mushroom.dimension.width / 2, ENEMY_CONFIG_START_POSITION.positionY[direction] - (ENEMY.mushroom.dimension.height / 2), ENEMY.mushroom.dimension.width, ENEMY.mushroom.dimension.width, ENEMY_CONFIG_START_POSITION.velocityX[direction], ENEMY_CONFIG_START_POSITION.velocityY[direction], this.level),)
              break;
          }
        }
      }
    }
    this.addEnemyTick++;
  }

  checkCollision() {
    this.enemies.forEach((enemy) => {
      if (this.player.canReceivedDamage && this.player.isCollision(enemy)) {
        this.player.lives = this.player.lives - enemy.damage;
        this.player.canReceivedDamage = false;
      }
    });

    if (this.player.lives <= 0) {
      this.stop();
    }
    this.player.weapon.forEach(bullet => {
      this.enemies.forEach((enemy, _i, enemies) => {
        if (enemy.isCollision(bullet)) {
          enemy.lives -= bullet.damage;
          if (enemy.lives <= 0) {
            enemy.isAlive = false;
            this.score += enemy.point;
          }
          bullet.hasImpact();
          if (enemies.every(enemy => enemy.lives <= 0)) {
            this.level++;
            this.nextLevel = true;
          }
        }
      })
    });
  }

  coolDownDamagePlayer() {
    if (!this.player.canReceivedDamage) {
      this.player.tickReceivedDamage++;
      if (this.player.tickReceivedDamage > CHARACTER.tickReceivedDamage) {
        this.player.tickReceivedDamage = 0;
        this.player.canReceivedDamage = true;
      }
    }
  }

  clearEnemies() {
    this.enemies = this.enemies.filter((enemy) => enemy.isAlive);
  }

  clear() {
    this.player.clear();
    this.clearEnemies();
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  draw() {
    this.background.draw();
    if (!this.player.canReceivedDamage) {
      if (this.player.tickReceivedDamage % 5 === 0) {
        this.player.draw();
      }
    } else {
      this.player.draw();
    }
    this.enemies.forEach(enemy => enemy.draw());
  }

  move() {
    this.player.move();
    this.enemies.forEach(enemy => enemy.move(this.player, this.level));
  }

  stop() {
    clearInterval(this.intervalId);
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode);
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode);
  }
}