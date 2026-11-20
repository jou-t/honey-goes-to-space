class Game {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.welcomeScreen = document.querySelector(".welcome-layout");
    this.endScreen = document.querySelector(".end-screen");
    this.honey = null;
    this.enemies = [];
    this.enemyInterval = null;
    this.lifeContainer = document.querySelector(".lives");
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
        this.honey.drawHoney();
        enemy.move();
        this.checkCollision(this.honey, enemy, i);
      });
    }, 14);
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

      this.lives -= 1;
      const hearts = this.lifeContainer.querySelectorAll("img");
      hearts[this.lives].hidden = true;
      if (this.lives <= 0) {
        clearInterval(this.enemyInterval);
        clearInterval(this.movementInterval);
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "flex";
  }
}
