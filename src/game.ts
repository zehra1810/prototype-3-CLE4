//IMPORT
//PIXI JS
import * as PIXI from "pixi.js";

//IMPORT IMAGES
import robotImage from "./images/robot.png";
import forestImage from "./images/forest.jpg";
import playerImage from "./images/player.png";
import letterIImage from "./images/letterI.png";
import letterJImage from "./images/LetterJ.png";
import letterKImage from "./images/letterK.png";
import letterLImage from "./images/letterL.png";
import letterMImage from "./images/letterM.png";
import letterNImage from "./images/letterN.png";
import letterOImage from "./images/letterO.png";
import gameOverScreen from "./images/gameoverscreen.png"
import levelEndScreen from "./images/levelendscreen.png"

//IMPORT CLASSES
import { Robot } from "./robot";
import { Player } from "./player";
import { LetterI } from "./letterI";
import { LetterJ } from "./letterJ";
import { LetterK } from "./letterK";
import { LetterL } from "./letterL";
import { LetterM } from "./letterM";
import { LetterN } from "./letterN";
import { LetterO } from "./letterO";

//IMPORT SOUND
import ISound from "url:./sound/I.mp3";
import JSound from "url:./sound/J.mp3";
import KSound from "url:./sound/K.mp3";
import LSound from "url:./sound/L.mp3";
import MSound from "url:./sound/M.mp3";
import NSound from "url:./sound/N.mp3";
import OSound from "url:./sound/O.mp3";
import goedzoSound from "url:./sound/src_sound_goedzo.mp3"

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public robots: Robot[] = [];
  public loader: PIXI.Loader;
  public player!: Player;
  public letterI: LetterI;
  public letterJ: LetterJ;
  public letterK: LetterK;
  public letterL: LetterL;
  public letterM: LetterM;
  public letterN: LetterN;
  public letterO: LetterO;
  public displaybg: PIXI.Graphics

  public ISound: HTMLAudioElement
  public JSound: HTMLAudioElement
  public KSound: HTMLAudioElement
  public LSound: HTMLAudioElement
  public MSound: HTMLAudioElement
  public NSound: HTMLAudioElement
  public OSound: HTMLAudioElement
  public goedzoSound: HTMLAudioElement

  public score : number;
  public scoreBoard : PIXI.Text;
  public scoreText : PIXI.Text;
  public playerHealth : PIXI.Sprite;
  public enemyHealth : PIXI.Sprite
  public gameOverButton : PIXI.Sprite;
  public levelEndButton: PIXI.Sprite;

  //CONSTRUCTOR
  constructor() {

    //VAR
    this.score = 100
;
    //PIXI CANVAS 
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      forceCanvas: true
    });
    document.body.appendChild(this.pixi.view);

    //LOADER
    this.loader = new PIXI.Loader();
    this.loader
      .add("robotTexture", robotImage)
      .add("forestTexture", forestImage)
      .add("playerTexture", playerImage)
      .add("letterITexture", letterIImage)
      .add("letterJTexture", letterJImage)
      .add("letterKTexture", letterKImage)
      .add("letterLTexture", letterLImage)
      .add("letterMTexture", letterMImage)
      .add("letterNTexture", letterNImage)
      .add("letterOTexture", letterOImage)
      .add("gameOverScreen", gameOverScreen)
      .add("levelEndScreen", levelEndScreen)

      .add("ISound", ISound)
      .add("JSound", JSound)
      .add("KSound", KSound)
      .add("LSound", LSound)
      .add("MSound", MSound)
      .add("NSound", NSound)
      .add("OSound", OSound)
      .add("levelEndSound", goedzoSound)

      
    this.loader.load(() => this.loadCompleted());

  }

  //LOAD COMPLETED
  loadCompleted() {

    //BACKGROUND
    let background = new PIXI.Sprite(this.loader.resources["forestTexture"].texture!);
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);

    //LETTERS SOUND
    this.ISound = this.loader.resources["ISound"].data!;

    this.JSound = this.loader.resources["JSound"].data!;

    this.KSound = this.loader.resources["KSound"].data!;

    this.LSound = this.loader.resources["LSound"].data!;

    this.MSound = this.loader.resources["MSound"].data!;

    this.NSound = this.loader.resources["NSound"].data!;

    this.OSound = this.loader.resources["OSound"].data!;

    this.goedzoSound = this.loader.resources["levelEndSound"].data!


    //ENEMIES
    for (let i = 0; i < 3; i++) {
      let robot = new Robot(this.loader.resources["robotTexture"].texture!, this);
      this.robots.push(robot);
      this.pixi.stage.addChild(robot);
    }

    //PLAYER HERO
    this.player = new Player(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.player); 
    this.letterI = new LetterI(this.loader.resources["letterITexture"].texture!, this);
    this.pixi.stage.addChild(this.letterI); 
    this.letterJ = new LetterJ(this.loader.resources["letterJTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterJ); 
    this.letterK = new LetterK(this.loader.resources["letterKTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterK); 
    this.letterL = new LetterL(this.loader.resources["letterLTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterL);
    this.letterM = new LetterM(this.loader.resources["letterMTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterM);
    this.letterN = new LetterN(this.loader.resources["letterNTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterN);
    this.letterO = new LetterO(this.loader.resources["letterOTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterO);

     //Background bar for displaying letters
     this.displaybg = new PIXI.Graphics
     this.displaybg.beginFill(0x118444)
     this.displaybg.drawRect(1420, 0, 150, 800)
     this.displaybg.endFill()
     this.pixi.stage.addChild(this.displaybg)
    
     this.scoreBoard = new PIXI.Text(`${this.score}`);
     this.scoreBoard.anchor.set(0.5, 0);
     this.scoreBoard.x = 1475;
     this.scoreBoard.y = 465;
     this.pixi.stage.addChild(this.scoreBoard);

     this.scoreText = new PIXI.Text("Score");
     this.scoreText.anchor.set(0.5, 0);
     this.scoreText.x = 1475;
     this.scoreText.y = 440;
     this.pixi.stage.addChild(this.scoreText);

     this.playerHealth = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!)
     this.playerHealth.scale.set(0.10, 0.10)
     this.playerHealth.x = 1450;
     this.playerHealth.y = 520;
     this.pixi.stage.addChild(this.playerHealth)

     this.enemyHealth = new PIXI.Sprite(this.loader.resources["robotTexture"].texture!)
     this.enemyHealth.scale.set(0.07, 0.07)
     this.enemyHealth.x = 1440
     this.enemyHealth.y = 660
     this.pixi.stage.addChild(this.enemyHealth)

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {

    //UPDATE ANIMATIONS
    this.player.update();
    this.letterI.update();
    this.letterJ.update();
    this.letterK.update();
    this.letterL.update();
    this.letterM.update();
    this.letterN.update();
    this.letterO.update();
    

    //ENEMY/PLAYER COLLISION DETECTION
    for (const robot of this.robots) {
      robot.update(delta);
      if (this.collision(this.player, robot)) {
        robot.tint = 0x630000;

        this.score -= 1;
        this.scoreBoard.text = `${this.score}`;

        setTimeout(function () {
          robot.tint = 0xFFFFFF;
        }, 1000);

      }
    }

    //COLLISION WITH LETTER I
    if (this.collision(this.player, this.letterI)) {

      this.letterI.width = 57;
      this.letterI.height = 57;
      this.letterI.position.set(1450, 32.5);
      this.letterI.speed = 0
      this.pixi.stage.removeChild(this.letterI);

      let displayLetterI = new LetterI(this.loader.resources["letterITexture"].texture!, this);
      displayLetterI.width = 57;
      displayLetterI.height = 57;
      displayLetterI.position.set(1450, 22.5);
      this.pixi.stage.addChild(displayLetterI);

      //PLAY SOUND
      this.ISound.play();

    }

    //COLLISION WITH LETTER J
    if (this.collision(this.player, this.letterJ)) {

      this.letterJ.width = 57;
      this.letterJ.height = 57;
      this.letterJ.position.set(1450, 32.5);
      this.letterJ.speed = 0
      this.pixi.stage.removeChild(this.letterJ);

      let displayLetterJ = new LetterJ(this.loader.resources["letterJTexture"].texture!, this);
      displayLetterJ.width = 57;
      displayLetterJ.height = 57;
      displayLetterJ.position.set(1450, 82.5);
      this.pixi.stage.addChild(displayLetterJ);

      //PLAY SOUND
      this.JSound.play();
    }

    //COLLISION WITH LETTER K
    if (this.collision(this.player, this.letterK)) {

      this.letterK.width = 57;
      this.letterK.height = 57;
      this.letterK.position.set(1450, 32.5);
      this.letterK.speed = 0
      this.pixi.stage.removeChild(this.letterK);

      let displayLetterK = new LetterK(this.loader.resources["letterKTexture"].texture!, this);
      displayLetterK.width = 57;
      displayLetterK.height = 57;
      displayLetterK.position.set(1450, 142.5);
      this.pixi.stage.addChild(displayLetterK);

      //PLAY SOUND
      this.KSound.play();

    }

    //COLLISION WITH LETTER I
    if (this.collision(this.player, this.letterL)) {

      this.letterL.width = 57;
      this.letterL.height = 57;
      this.letterL.position.set(1450, 32.5);
      this.letterL.speed = 0
      this.pixi.stage.removeChild(this.letterL);

      let displayLetterL = new LetterL(this.loader.resources["letterLTexture"].texture!, this);
      displayLetterL.width = 57;
      displayLetterL.height = 57;
      displayLetterL.position.set(1450, 202.5);
      this.pixi.stage.addChild(displayLetterL);

      //PLAY SOUND
      this.LSound.play();

    }

    //COLLISION WITH LETTER M
    if (this.collision(this.player, this.letterM)) {

      this.letterM.width = 57;
      this.letterM.height = 57;
      this.letterM.position.set(1450, 32.5);
      this.letterM.speed = 0
      this.pixi.stage.removeChild(this.letterM);

      let displayLetterM = new LetterM(this.loader.resources["letterMTexture"].texture!, this);
      displayLetterM.width = 57;
      displayLetterM.height = 57;
      displayLetterM.position.set(1450, 262.5);
      this.pixi.stage.addChild(displayLetterM);

      //PLAY SOUND
      this.MSound.play();

    }

    //COLLISION WITH LETTER N
    if (this.collision(this.player, this.letterN)) {

      this.letterN.width = 57;
      this.letterN.height = 57;
      this.letterN.position.set(1450, 32.5);
      this.letterN.speed = 0
      this.pixi.stage.removeChild(this.letterN);

      let displayLetterN = new LetterN(this.loader.resources["letterNTexture"].texture!, this);
      displayLetterN.width = 57;
      displayLetterN.height = 57;
      displayLetterN.position.set(1450, 322.5);
      this.pixi.stage.addChild(displayLetterN);

      //PLAY SOUND
      this.NSound.play();

    }

    //COLLISION WITH LETTER O
    if (this.collision(this.player, this.letterO)) {

      this.letterO.width = 57;
      this.letterO.height = 57;
      this.letterO.position.set(1450, 32.5);
      this.letterO.speed = 0
      this.pixi.stage.removeChild(this.letterO);

      let displayLetterO = new LetterO(this.loader.resources["letterOTexture"].texture!, this);
      displayLetterO.width = 57;
      displayLetterO.height = 57;
      displayLetterO.position.set(1450, 382.5);
      this.pixi.stage.addChild(displayLetterO);

      //PLAY SOUND
      this.OSound.play();

      //ROEP LEVELEND FUNCTIE OP
      this.levelEnd();

    }

    //HEALTHBAR
    //ALS HEALTH -25 WORDT, DAN KOMT ENEMY DICHTER BIJ PLAYER BIJ DE HEALTHBAR
    if (this.score === 75) {
      this.enemyHealth.y = 625;
    }

    if (this.score === 50) {
      this.enemyHealth.y = 590
    }

    if (this.score === 25) {
      this.enemyHealth.y = 555
    }

    if (this.score === 0) {
      this.enemyHealth.y = 520
      this.gameOverScreen();
    }
    
  }

   //COLLISION Basis
   collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  //GAME OVER SCREEN ALS SCORE = 0
  gameOverScreen() {
    this.pixi.stop()
    this.gameOverButton = new PIXI.Sprite(this.loader.resources["gameOverScreen"].texture!) // jouw eigen sprite hier
    this.gameOverButton.width = 750
    this.gameOverButton.height = 500
    this.gameOverButton.x = 350
    this.gameOverButton.y = 100
    this.gameOverButton.interactive = true
    this.gameOverButton.buttonMode = true
    this.gameOverButton.on('pointerdown', () => this.resetGame())

    this.pixi.stage.addChild(this.gameOverButton)
  }

  //RESET GAME SCREEN
  private resetGame(){
    // verwijder de game over button
    this.gameOverButton.destroy() 
    //player x and y
    this.player.x = 600;
    this.player.y = 450;

    //letters x and y
    this.letterI.x = 400
    this.letterI.y = -100

    this.letterJ.x = 800
    this.letterJ.y = -400

    this.letterK.x = 100
    this.letterK.y = -700

    this.letterL.x = 200
    this.letterL.y = -1200

    this.letterM.x = 700
    this.letterM.y = -1500

    this.letterN.x = 400
    this.letterN.y = -1800

    this.letterO.x = 900
    this.letterO.y = -2100

    //score 100
    this.score = 100;
   
    // herstart pixi
    this.pixi.start()
}

  //LEVEL END SCREEN ALS ALLE LETTERS ZIJN VERZAMELD
  levelEnd() {
    this.pixi.stop()
    this.levelEndButton = new PIXI.Sprite(this.loader.resources["levelEndScreen"].texture!) //jouw eigen sprite hier
    this.levelEndButton.width = 750
    this.levelEndButton.height = 500
    this.levelEndButton.x = 350
    this.levelEndButton.y = 100
    //this.levelEndButton.interactive = true
    //this.levelEndButton.on('pointerdown', () => this.gameEndScreen())

    this.pixi.stage.addChild(this.levelEndButton)
    this.goedzoSound.play()

  }

}

