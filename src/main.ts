import * as PIXI from 'pixi.js';
import Textures from './assets';

const app = new PIXI.Application({
  width: 600,
  height: 550,
});

//@ts-ignore
document.body.appendChild(app.view);

const bg = new PIXI.Sprite(Textures.bg);

bg.y = app.view.height - 644;
app.stage.addChild(bg);

const uDied = new PIXI.Text('You died', { align: 'center' });
uDied.x = app.view.width / 2;
uDied.y = 100;

class Player extends PIXI.Sprite {
  constructor() {
    super(Textures.player);

    this.x = 100;
    this.y = app.view.height / 2;
    this.height = 50;

    this.gravity = 1;
    this.ySpeed = 0;

    this.addEventListeners();
  }

  gravity: number;
  ySpeed: number;

  addEventListeners() {
    window.addEventListener('keydown', ({ key, repeat }) => {
      if (key == ' ' && !repeat) {
        this.ySpeed = -10;
      }
    });

    app.stage.on('mousedown', () => {
      this.ySpeed = -10;
    });
  }

  async update() {
    this.ySpeed += this.gravity;
    if (this.ySpeed > 10) this.ySpeed = 10;
    this.y += this.ySpeed;
    if (this.hasDied()) {
      app.stage.addChild(uDied);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      app.stage.removeChild(uDied);
      this.y = app.view.height / 2;
      pipes.forEach((pipe) => pipe.remove());
      pipes = [];
    }
  }

  hasDied() {
    return (
      this.y > app.view.height - this.height ||
      pipes.filter(
        (pipe) =>
          this.x < pipe.x + pipe.width &&
          this.x + this.width > pipe.x &&
          this.y < pipe.y + pipe.height &&
          this.height + this.y > pipe.y
      ).length > 0
    );
  }
}

class Pipe extends PIXI.Sprite {
  constructor(y: number, texture: PIXI.Texture) {
    super(texture);
    this.y = y;
    this.x = app.view.width + 87;
    this.width = 87;
    this.height = 793;
  }

  update() {
    this.x -= 5;
    if (this.x < -87) this.remove();
  }

  remove() {
    app.stage.removeChild(this);
  }
}

class PipeBottom extends Pipe {
  constructor(y: number) {
    super(y, Textures.pipeTop);
  }
}

//@ts-ignore
class PipeTop extends Pipe {
  constructor(y: number) {
    super(y, Textures.pipeBottom);
  }
}

let pipes: Pipe[] = [];

const player = new Player();
app.stage.addChild(player);

async function frame() {
  await player.update();
  pipes.forEach((pipe) => pipe.update());
  requestAnimationFrame(frame);
}

frame();

setInterval(() => {
  const bottom = new PipeBottom(
    app.view.height - Math.floor(Math.random() * 400)
  );
  const top = new PipeTop(bottom.y - 793 - 150);
  app.stage.addChild(bottom, top);
  pipes.push(bottom, top);
}, 1500);
