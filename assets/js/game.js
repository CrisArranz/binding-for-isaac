class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext('2d');
    this.intervalId = null;
    this.fps = 60;

    this.level = 1;
    this.nextLevel = true;
    this.nextLevelOpacity = 0;
    this.nextLevelTransition = 1;
    this.nextLevelHasTransition = true;

    this.score = 0;

    this.addEnemyTick = ENEMIES_START_VALUES;
    this.numberEnemies = ENEMIES_START_VALUES;
    this.numberMaxEnemiesPerLevel = ENEMIES_START_VALUES;

    this.addHeartTick = ITEMS_START_VALUES.heart;
    this.numberHeart = ITEMS_START_VALUES.heart;
    this.numberMaxHeartPerLevel = ITEMS_MAX_PER_LEVEL.heart;

    this.addBoostTick = ITEMS_START_VALUES.boost;
    this.numberBoost = ITEMS_START_VALUES.boost;
    this.numberMaxBoostPerLevel = ITEMS_MAX_PER_LEVEL.boost;

    this.background = new Background(this.context, 0, 0, this.context.canvas.width, this.context.canvas.height);
    this.player = new Isaac(this.context, this.context.canvas.width / 2 - 50, this.context.canvas.height / 2 - 50, 100, 100);
    this.enemies = [];
    this.hearts = [];
    this.boosts = [];

    this.endOpacity = 0;
    this.endTransition = 1;
    this.endHasTransition = true;
  }

  start(endGame) {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.coolDownDamagePlayer();
      this.checkCollision(endGame);
      this.addEnemies();
      this.addItems();
      if (this.nextLevel) {
        this.nextLevel = false;
        this.player.weapon = [];
        this.numberEnemies = ENEMIES_START_VALUES;
        this.numberHeart = ITEMS_START_VALUES.heart;
        this.numberBoost = ITEMS_START_VALUES.boost;
        this.numberMaxEnemiesPerLevel = 3 * this.level;
        this.nextLevelTransition = 1;
        this.nextLevelHasTransition = true;
        this.nextLevelOpacity = 0;
      }
    }, 1000 / this.fps)
  }

  addItems() {
    this.addHearts();
    this.addBoosts();
  }

  addHearts() {
    if (this.addHeartTick > ITEMS_ADD_TICK.heart) {
      this.addHeartTick = 0;
      if (this.numberHeart < this.numberMaxHeartPerLevel) {
        this.numberHeart++;
        const randomPositionX = Math.floor(Math.random() * (CANVAS_DIMENSIONS.width - BACKGROUND.limits * 2) + BACKGROUND.limits);
        const randomPositionY = Math.floor(Math.random() * (CANVAS_DIMENSIONS.height - BACKGROUND.limits * 2) + BACKGROUND.limits)
        this.hearts.push(new Heart(this.context, randomPositionX, randomPositionY, 25, 25))
      }
    }
    this.addHeartTick++;
  }

  addBoosts() {
    if (this.addBoostTick > ITEMS_ADD_TICK.boost) {
      this.addBoostTick = 0;
      if (this.numberBoost < this.numberMaxBoostPerLevel) {
        this.numberBoost++;
        const randomPositionX = Math.floor(Math.random() * (CANVAS_DIMENSIONS.width - BACKGROUND.limits * 2) + BACKGROUND.limits);
        const randomPositionY = Math.floor(Math.random() * (CANVAS_DIMENSIONS.height - BACKGROUND.limits * 2) + BACKGROUND.limits)
        this.boosts.push(new Boost(this.context, randomPositionX, randomPositionY, 25, 25))
      }
    }
    this.addBoostTick++;
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

  checkCollision(endGame) {
    this.checkCollisionEnemies();
    this.checkCollisionWeapon();
    this.checkCollisionItems();
    this.endGame(endGame);
  }

  checkCollisionEnemies() {
    this.enemies.forEach((enemy) => {
      if (this.player.canReceivedDamage && this.player.isCollision(enemy)) {
        this.player.lives = this.player.lives - enemy.damage;
        this.player.canReceivedDamage = false;
      }
    });
  }

  checkCollisionWeapon() {
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

  checkCollisionItems() {
    this.checkCollisionHearts();
    this.checkCollisionBoosts();
  }

  checkCollisionHearts() {
    this.hearts.forEach(heart => {
      if (!heart.impact && this.player.isCollision(heart)) {
        this.player.lives += heart.heal;
        heart.hasImpact();
      }
    });
  }

  checkCollisionBoosts() {
    this.boosts.forEach(boost => {
      if (!boost.impact && this.player.isCollision(boost) && !this.player.canSpecialAttack) {
        this.player.canSpecialAttack = true;
        boost.hasImpact();
      }
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

  clearItems() {
    this.hearts = this.hearts.filter(heart => !heart.impact);
    this.boosts = this.boosts.filter(boost => !boost.impact);
  }

  endGame(endGame) {
    if (this.player.lives <= 0) {
      this.clear();
      this.draw();
      this.stop();
      this.showEnd(endGame);
    }
  }

  clear() {
    this.player.clear();
    this.clearEnemies();
    this.clearItems();
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  draw() {
    this.background.draw();
    this.showScore();
    this.hearts.forEach(heart => heart.draw());
    this.boosts.forEach(boost => boost.draw());
    if (!this.player.canReceivedDamage) {
      if (this.player.tickReceivedDamage % 5 === 0) {
        this.player.draw();
      }
    } else {
      this.player.draw();
    }
    if (this.player.lives > 0) {
      this.player.showLives();
    }
    this.showLevel();
    this.enemies.forEach(enemy => enemy.draw());
  }

  move() {
    this.player.move();
    this.enemies.forEach(enemy => enemy.move(this.player, this.level));
  }

  showLevel() {
    if (this.nextLevelOpacity > 1 && this.nextLevelHasTransition) {
      this.nextLevelTransition = -1;
      this.nextLevelHasTransition = false;
    }

    this.nextLevelOpacity += 0.01 * this.nextLevelTransition;
    
    this.context.save();
    this.context.fillStyle = `rgba(255, 255, 255, ${this.nextLevelOpacity})`;
    this.context.font = '5rem binding-isaac';
    this.context.fillText(`Level: ${this.level.toString().padStart(2, '0')}`, this.context.canvas.width / 2 - 165, this.context.canvas.height / 2 + 25);
    this.context.restore();
  }

  showScore() {
    this.context.save();
    this.context.fillStyle = 'rgba(255, 255, 255, 0.95)';
    this.context.font = '2rem binding-isaac';
    this.context.fillText(`Score: ${this.score.toString().padStart(6, '0')}`, this.context.canvas.width - 250, 25);
    this.context.restore();
  }

  showEnd(endGame) {
    const intervalIdEnd = setInterval(() => {
      if (this.endOpacity > 1 && this.endHasTransition) {
        this.endTransition = -1;
        this.endHasTransition = false;
        clearInterval(intervalIdEnd)
        this.clear();
        endGame && endGame();
      }
  
      this.endOpacity += 0.01 * this.endTransition;
      
      this.context.save();
      this.context.fillStyle = `rgba(255, 255, 255, ${this.endOpacity})`;
      this.context.font = '9rem binding-isaac';
      this.context.fillText(`You're DEAD`, this.context.canvas.width / 2 - 420, 200);
      this.context.restore();
    }, 1000 / this.fps)
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