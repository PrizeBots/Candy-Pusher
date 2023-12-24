import { SceneManager } from './Managers/SceneManager.js';
import { MaterialManager } from './Managers/MaterialManager.js';
import { GameObjectManager } from './Managers/GameObjectManager.js';
import { DropManager } from './Managers/DropManager.js';
import { CoinPipeManager } from './Managers/CoinPipeManager.js';
import { LevelManager } from './Managers/LevelManager.js';
import { UIManager } from './Managers/UIManager.js'; // Add this line at the top with other imports

class Game {
    constructor(canvasId) {
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
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.cookieCount = 100;

        this.sceneManager = new SceneManager(this.engine, this.canvas);
        this.scene = this.sceneManager.getScene();
        this.uiManager  = new UIManager(this); 

        this.materialManager = new MaterialManager(this.scene);
        this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager,this)
        // this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager);
        // this.gameObjectManager.loadCustomPlatform(); 
        const platform = this.gameObjectManager.createPlatform();
        const platformImpostor = platform.physicsImpostor;
        this.dropManager = new DropManager(this.scene, this.materialManager, platformImpostor, this);
        this.coinPipeManager = new CoinPipeManager(this.scene, this.materialManager, this.dropManager, this);
        const pusher = this.gameObjectManager.createPusher();
        this.gameObjectManager.createGoalPlane();
        this.gameObjectManager.createCapturePlane();
        // Start the game loop
        this._startGameLoop();
        this._setupDropCoinButton();
        this.thudSound = new BABYLON.Sound("thud", "../assets/sound/thud.mp3", this.scene, this.doAThing, {
            autoplay: false,
            volume:1,
            loop: false
        });
        this.getSound = new BABYLON.Sound("get", "../assets/sound/get.mp3", this.scene,{
            autoplay: false,
            volume:1,
            loop: false
        });
        this.levelManager = new LevelManager(this.scene, this);
        this.levelManager.levelSystem();
    }

    doAThing(){
        console.log('did a thing')
    }
    onKeyDown(event) {
        console.log("onKeyDown onKeyDown");
        // Play the sound when the 'P' key is pressed
        if (event.key === 'q' ) {
            this.thudSound.play();
            this.getSound.play();
        }
    }

    _startGameLoop() {
        this.engine.runRenderLoop(() => {
            this.gameObjectManager.updatePusher(); // Update the pusher's position
            this.coinPipeManager.updateCoinPipe(); // Update the coin pipe's position
            this.scene.render();
        });
    }
    _setupDropCoinButton() {
        const dropCoinButton = document.getElementById('dropCoinButton');
        if (dropCoinButton) {
            dropCoinButton.addEventListener('click', () => {
                this.coinPipeManager.dropCoinFromPipe(true); 
                //this.dropManager.dropMonkeyModel(); // Drop the monkey model

            });
        }
        const dropDonutButton = document.getElementById('dropDonutButton');
        if (dropDonutButton) {
            dropDonutButton.addEventListener('click', () => {
                this.dropManager.dropDonut(); 

            });
        }
    }
}

// This line should be outside the class definition.
const game = new Game('renderCanvas');

export { Game };
