class Game {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.welcomeScreen = document.querySelector(".welcome-layout");
    this.endScreen = document.querySelector(".end-screen");
    this.honey = null;
    this.enemies = [];
    this.enemyInterval = null;
    this.movementInterval = null;
  }

  startGame() {
    this.welcomeScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.honey = new Honey();

    this.enemyInterval = setInterval(() => {
      this.spawnEnemy;
    }, 1000);
    this.movementInterval = setInterval(() => {
      this.enemies.forEach((enemy) => enemy.move());
    }, 30);
  }
  animate() {}
  spawnEnemy() {
    this.enemies.push(new Enemy());
  }
}
