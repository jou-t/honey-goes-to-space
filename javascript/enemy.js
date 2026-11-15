class Enemy {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.element = document.createElement("div");

    this.y = 0;
    this.x = Math.floor(Math.random() * 800);
    this.width = 50;
    this.height = 50;
    const images = [
      "./images/enemy_saucer.png",
      "./images/enemy_fighter.png",
      "./images/enemy_mothership.png",
    ];
    this.image = images[Math.floor(Math.random() * images.length)];

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.backgroundImage = `url("${this.image}")`;
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "cover";

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.y += 3;
    this.element.style.top = `${this.y}px`;
  }
}
