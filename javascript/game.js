class Game {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.welcomeScreen = document.querySelector(".welcome-layout");
    this.endScreen = document.querySelector(".end-screen");
    this.honey = null;
  }

  startGame() {
    this.welcomeScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.honey = new Honey();
  }
}
