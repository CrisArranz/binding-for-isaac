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

const BACKGROUND = {
  limits: 75
};

const ENEMY = {
  spider: {
    velocity: 1.5,
    damage: 1,
    life: 1
  },
  fly: {
    velocity: 3,
    damage: 0.5,
    life: 2
  },
  boss: {
    velocity: 1,
    damage: 3,
    life: 10
  },
};