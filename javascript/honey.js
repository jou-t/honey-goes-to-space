class Honey {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen");
    this.element = document.createElement("div");

    this.x = 300;
    this.y = 350;
    this.width = 150;
    this.height = 165;
    this.image = "./images/honey transparent.png";

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.backgroundImage = `url("${this.image}")`;
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "cover";

    this.element.style.animation = "honey-float 2s ease-in-out infinite";

    this.gameScreen.appendChild(this.element);
  }

  moveUp() {
    if (this.y >= 0) {
      this.y -= 16;
    }
  }

  moveDown() {
    if (this.y <= 530) {
      this.y += 16;
    }
  }

  moveLeft() {
    if (this.x >= 10) {
      this.x -= 16;
    }
  }

  moveRight() {
    if (this.x <= 800) {
      this.x += 16;
    }
  }

  drawHoney() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
