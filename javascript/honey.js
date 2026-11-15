class Honey {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.element = document.createElement("div");

    this.x = 600;
    this.y = 530;
    this.width = 150;
    this.height = 150;
    this.image = "./images/honey transparent.png";

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

  moveLeft() {
    if (this.x >= 10) {
      this.x -= 12;
      this.element.style.left = `${this.x}px`;
    }
  }

  moveRight() {
    if (this.x <= 800) {
      this.x += 12;
      this.element.style.left = `${this.x}px`;
    }
  }
}
