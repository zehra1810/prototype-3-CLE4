import * as PIXI from "pixi.js";
import { Game } from "./game";
import backgroundSound from "url:./sound/dinosound.mp3"

export class Player extends PIXI.Sprite {

  //GLOBALS
  private speed: number = 0;
  private game: Game;
  private loader: PIXI.Loader;
  private hitbox: PIXI.Rectangle
  public backgroundSound: HTMLAudioElement

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {

    super(texture);
    this.game = game;
    this.pivot.set(0.5)

    this.x = 600
    this.y = 450
    this.scale.set(0.60, 0.60);

    this.hitbox = new PIXI.Rectangle(180, 50, 90, 50)
   
    let area = this.getBounds()
    let greenBox = new PIXI.Graphics()
    greenBox.drawRect(100, 50, area.width, area.height)
    this.addChild(greenBox)

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

    this.loader = new PIXI.Loader()
    this.loader.add("backgroundSound", backgroundSound)
    this.loader.load(() => this.bgSound())

  }

  bgSound() {
    this.backgroundSound = this.loader.resources["backgroundSound"].data!
  }

  //KEYBOARD
  onKeyDown(e: KeyboardEvent): any {
    if (e.key === "ArrowLeft") {
      this.speed = -7;
    }
    if (e.key === "ArrowRight") {
      this.speed = 7;
    }
  }
  onKeyUp(e: KeyboardEvent): any {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.speed = 0;
      //play bg sound
      this.backgroundSound.play()
    }
  }

  //ANIMATION
  public update() {
    this.x += this.speed;

    this.keepInScreen();
  }

  //BOUNDS
  getBounds(): PIXI.Rectangle {
    return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = this.game.pixi.screen.right;
    }
  }


}
