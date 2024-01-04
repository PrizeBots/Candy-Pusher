import { SceneManager } from './Managers/SceneManager.js';
import { MaterialManager } from './Managers/MaterialManager.js';
import { GameObjectManager } from './Managers/GameObjectManager.js';
import { Objects } from './Components/Objects.js';
import { Platform } from './Components/Platform.js';
import { DropManager } from './Managers/DropManager.js';
import { CoinPipeManager } from './Managers/CoinPipeManager.js';
import { LevelManager } from './Managers/LevelManager.js';
import { UIManager } from './Managers/UIManager.js';
import { SoundManager } from './Managers/SoundManager.js';
import { CookieMakerManager } from './Managers/CookieMakerManager.js';
class Game {
    constructor(canvasId) {
        this.debugMode = true;
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame(); // Call a function to start the game
            });
        }
        window.addEventListener('click', () => {
            this.thudSound.play();
            this.thudSound.pause();
        }, { once: true });
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true, { antialias: true, allowSleep: true, sleepTimeLimit: 2 });
        this.cookieCount = 20;
        this.cupcakeCount = 0;
        this.donutCount = 0;
        this.chocolateCount = 0;
        this.pieCount = 0;
        this.colaCount = 0;
        this.cakeCount = 0;
        this.score = 0;
        this.sugar = 0;
        this.wallTokens = 3;
        this.wallsUp = false;
        this.wallsDown = false;
        this.sceneManager = new SceneManager(this.engine, this.canvas);
        this.scene = this.sceneManager.getScene();
        this.uiManager = new UIManager(this);
        this.cookieMaker = new CookieMakerManager(this);
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.jingle2 = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C4 to E4
        this.soundManager = new SoundManager(this);
        this.materialManager = new MaterialManager(this.scene);
        this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager, this)
        this.platform = new Platform(this.scene, this.materialManager, this);

        const platform = this.platform.create();
        const platformImpostor = platform.physicsImpostor;

        const pusher = this.gameObjectManager.createPusher();
        const pusherImpostor = pusher.physicsImpostor;

        this.gameObjectManager.createGoalPlane();
        this.gameObjectManager.createCapturePlane();
        this.gameObjectManager.loadPlatformModel();
        this.dropManager = new DropManager(this.scene, this.materialManager, platformImpostor, this, pusherImpostor);
        this.coinPipeManager = new CoinPipeManager(this.scene, this.materialManager, this.dropManager, this);
        // Start the game loop
        this._startGameLoop();
        this._setupButtons();
        const levelManager = new LevelManager(this.scene, this);
        ///init level 1
        levelManager.levelSystem((cookies) => {
        });

    }

    doAThing() {
        console.log('did a thing')
    }
    onKeyDown(event) {
        console.log("onKeyDown onKeyDown");
        // Play the sound when the 'P' key is pressed
        if (event.key === 'q') {
            this.thudSound.play();
            this.getSound.play();
        }
    }
    _startGameLoop() {
        this.engine.runRenderLoop(() => {
            //  this.gameObjectManager.updatePusher(); // Update the pusher's position
            this.coinPipeManager.updateCoinPipe(); // Update the coin pipe's position
            this.scene.render();
        });
    }
    _setupButtons() {
        const dropCookieButton = document.getElementById('dropCookieButton');
        if (dropCookieButton) {
            dropCookieButton.addEventListener('click', () => {
                this.coinPipeManager.dropCoinFromPipe(true);
            });
        }
        const makeCookieButton = document.getElementById('makeCookieButton');
        if (makeCookieButton) {
            makeCookieButton.addEventListener('click', () => {
                this.cookieMaker.makeCookie();
                this.clickSound.play();
            });
        }
        const dropDonutButton = document.getElementById('dropDonutButton');
        if (dropDonutButton) {
            dropDonutButton.addEventListener('click', () => {
                this.dropManager.dropDonut(true);
            });
        }
        const dropCupcakeButton = document.getElementById('dropCupcakeButton');
        if (dropCupcakeButton) {
            dropCupcakeButton.addEventListener('click', () => {
                this.dropManager.dropCupcake(true);
            });
        }
        const dropChocolateBarButton = document.getElementById('dropChocolateBarButton');
        if (dropChocolateBarButton) {
            dropChocolateBarButton.addEventListener('click', () => {
                    this.dropManager.dropChocolateBar(true);
            });
        }
        const dropPieButton = document.getElementById('dropPieButton');
        if (dropPieButton) {
            dropPieButton.addEventListener('click', () => {
                    this.dropManager.dropPie(true);
            });
        }
        const dropColaButton = document.getElementById('dropColaButton');
        if (dropColaButton) {
            dropColaButton.addEventListener('click', () => {
                    this.dropManager.dropCola(true);
            });
        }
        const dropCakeButton = document.getElementById('dropCakeButton');
        if (dropCakeButton) {
            dropCakeButton.addEventListener('click', () => {
                    this.dropManager.dropCake(true);
            });
        }
        ///Wall Up
        const wallButton = document.getElementById('wallButton');
        if (wallButton) {
            wallButton.addEventListener('click', () => {
                if (!this.platform.walls.wallsUp) {
                    this.wallMoveSound.play();
                    this.platform.walls.raiseWallsWithTween();
                    setTimeout(() => {
                        this.platform.walls.wallRaised();
                    }, this.platform.walls.wallTime);
                }
            });
        }
        const bigPushButton = document.getElementById('bigPushButton');
        if (bigPushButton) {
            bigPushButton.addEventListener('click', () => {
                this.gameObjectManager.pusher.bigPush();
            });
        }
        const toggleCameraLockButton = document.getElementById('toggleCameraLockButton');
        if (toggleCameraLockButton) {
            toggleCameraLockButton.addEventListener('click', () => {
                this.sceneManager.cameraLock();
            });
        }
    }
}
const game = new Game('renderCanvas');
export { Game };
