const CHARACTER = {
  velocity: 10,
  damage: 1,
  moves: {
    right: 39,
    bottom: 40,
    left: 37,
    top: 38,
    shoot: 32
  }
}

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
}