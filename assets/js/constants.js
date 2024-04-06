const CHARACTER = {
  velocity: 10,
  damage: 1,
  moves: {
    directions: {
      right: 39,
      bottom: 40,
      left: 37,
      top: 38,
    },
    shoot: {
      special: 32,
      rightShoot: 68,
      bottomShoot: 83,
      leftShoot: 65,
      topShoot: 87,
    }
  }
};

const CANVAS_DIMENSIONS = {
  width: 1080,
  height: 780
}

const SPRITES_TICKS = 10;
const ENEMY_ADD_TICK = 20;

const ENEMY_CONFIG_START_POSITION = {
  velocityX: {
    up: 0,
    down: 0,
    left: 5,
    right: -5
  },
  velocityY: {
    up: 5,
    down: -5,
    left: 0,
    right: 0
  },
  positionX: {
    up: CANVAS_DIMENSIONS.width / 2,
    down: CANVAS_DIMENSIONS.width / 2,
    left: 0,
    right: CANVAS_DIMENSIONS.width
  },
  positionY: {
    up: 0,
    down: CANVAS_DIMENSIONS.height,
    left: CANVAS_DIMENSIONS.height / 2,
    right: CANVAS_DIMENSIONS.height / 2
  }
};

const BACKGROUND = {
  limits: 75
};

const ENEMY = {
  spider: {
    velocity: 5,
    damage: 1,
    life: 1,
    dimension: {
      width: 50,
      height: 50,
      horizontalFrames: 4
    },
  },
  fly: {
    velocity: 3,
    damage: 0.5,
    life: 2,
    dimension: {
      width: 45,
      height: 45,
      horizontalFrames: 3
    },
  },
  mushroom: {
    velocity: 1,
    damage: 2,
    life: 1,
    dimension: {
      width: 60,
      height: 70,
      horizontalFrames: 3
    },
  },
  boss: {
    velocity: 1.5,
    damage: 3,
    life: 10,
    dimension: {
      width: 100,
      height: 100,
      horizontalFrames: 1
    },
  },
};

const ENEMY_CONFIG_KEYS = {
  directions: Object.keys(ENEMY_CONFIG_START_POSITION.velocityX),
  type: Object.keys(ENEMY).filter(e => e !== 'boss')
}