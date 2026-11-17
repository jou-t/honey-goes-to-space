class Game {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.welcomeScreen = document.querySelector(".welcome-layout");
    this.endScreen = document.querySelector(".end-screen");
    this.honey = null;
    this.enemies = [];
    this.enemyInterval = null;
    this.movementInterval = null;
    this.lives = 3;
  }

  startGame() {
    this.welcomeScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.honey = new Honey();

    this.enemyInterval = setInterval(() => {
      this.spawnEnemy();
    }, 1000);

    this.movementInterval = setInterval(() => {
      this.enemies.forEach((enemy) => enemy.move());
      this.enemies.forEach((enemy, i) => {
        if (enemy.y >= 630) {
          this.enemies.splice(i, 1);
          enemy.element.remove();
        }
        enemy.move();
        this.checkCollision(this.honey, enemy, i);
      });
    }, 80);
  }

  spawnEnemy() {
    this.enemies.push(new Enemy());
  }

  checkCollision(honey, enemy, enemyIndex) {
    if (
      honey.x < enemy.x + enemy.width &&
      honey.x + honey.width > enemy.x &&
      honey.y < enemy.y + enemy.height &&
      honey.y + honey.height > enemy.y
    ) {
      this.enemies.splice(enemyIndex, 1);
      enemy.element.remove();
      return true;
    }
  }
}
