const welcomeScreen = document.querySelector(".welcome-screen");
const gameScreen = document.querySelector(".game-screen");
const endScreen = document.querySelector(".end-screen");
const startButton = document.querySelector(".start-btn");

let game;

window.addEventListener("load", () => {
  startButton.addEventListener("click", () => {
    game = new Game();
    game.startGame();
  });
  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "ArrowLeft") {
      game.honey.moveLeft();
    }
    if (e.key === "ArrowRight") {
      game.honey.moveRight();
    }
  });
});
