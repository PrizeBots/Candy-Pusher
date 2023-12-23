import { SceneManager } from './Managers/SceneManager.js';
import { MaterialManager } from './Managers/MaterialManager.js';
import { GameObjectManager } from './Managers/GameObjectManager.js';
import { DropManager } from './Managers/DropManager.js';
import { CoinPipeManager } from './Managers/CoinPipeManager.js';
import { UIManager } from './Managers/UIManager.js'; // Add this line at the top with other imports

class Game {
    constructor(canvasId) {

        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame(); // Call a function to start the game
            });
        }
            // Define a function to start the game and show/hide elements

        // Unlock audio context on first user interaction
        window.addEventListener('click', () => {
            this.thudSound.play();
            this.thudSound.pause();
        }, { once: true });
        window.addEventListener('keydown', (event) => this.onKeyDown(event));

        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.sceneManager = new SceneManager(this.engine, this.canvas);
        this.scene = this.sceneManager.getScene();
        this.uiManager  = new UIManager(); 

        this.materialManager = new MaterialManager(this.scene);
        this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager,this.uiManager);


        // this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager);
        // this.gameObjectManager.loadCustomPlatform(); 


        const platform = this.gameObjectManager.createPlatform();
        const platformImpostor = platform.physicsImpostor;
        this.dropManager = new DropManager(this.scene, this.materialManager, platformImpostor, this);
        this.coinPipeManager = new CoinPipeManager(this.scene, this.materialManager, this.dropManager, this.uiManager);

        const pusher = this.gameObjectManager.createPusher();

        this.gameObjectManager.createGoalPlane(this.uiManager);

        // Start the game loop
        this._startGameLoop();
        this._setupDropCoinButton();
        this.thudSound = new BABYLON.Sound("thud", "../assets/sound/thud.mp3", this.scene, this.doAThing, {
            autoplay: false,
            volume:1,
            loop: false
        });

    }
    startGame() {
        // Hide the start button
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.style.display = 'none';
        }

        // Show the canvas and other game elements
        const canvas = document.getElementById('renderCanvas');
        const yourTestButton = document.getElementById('yourTestButtonId');
        const dropCoinButton = document.getElementById('dropCoinButton');
        const dropBonusButton = document.getElementById('dropBonusButton');
        const coinCount = document.getElementById('coinCount');
        const prizePool = document.getElementById('prizePool');

        if (canvas) {
            canvas.style.display = 'block';
        }
        if (yourTestButton) {
            yourTestButton.style.display = 'block';
        }
        if (dropCoinButton) {
            dropCoinButton.style.display = 'block';
        }
        if (dropBonusButton) {
            dropBonusButton.style.display = 'block';
        }
        if (coinCount) {
            coinCount.style.display = 'block';
        }
        if (prizePool) {
            prizePool.style.display = 'block';
        }
    }
    doAThing(){
        console.log('did a thing')
    }
    onKeyDown(event) {
        console.log("onKeyDown onKeyDown");
        // Play the sound when the 'P' key is pressed
        if (event.key === 'p' || event.key === 'P') {
            console.log("Playing sound");
            this.thudSound.play();
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
                this.coinPipeManager.dropCoinFromPipe(); // Drop a coin from the pipe
                //this.dropManager.dropMonkeyModel(); // Drop the monkey model

            });
        }
    }
}

// This line should be outside the class definition.
const game = new Game('renderCanvas');

export { Game };
