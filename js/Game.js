import { SceneManager } from './SceneManager.js';
import { MaterialManager } from './MaterialManager.js';
import { GameObjectManager } from './GameObjectManager.js';
import { DropManager } from './DropManager.js';
import { CoinPipeManager } from './CoinPipeManager.js';


class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.sceneManager = new SceneManager(this.engine, this.canvas);
        this.scene = this.sceneManager.getScene();

        this.materialManager = new MaterialManager(this.scene);
        this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager);
        this.dropManager = new DropManager(this.scene, this.materialManager);
        this.coinPipeManager = new CoinPipeManager(this.scene, this.materialManager, this.dropManager);

        // Create platform and pusher
        const platform = this.gameObjectManager.createPlatform();
        const pusher = this.gameObjectManager.createPusher();
        this.gameObjectManager.createWalls(); 

        // Start the game loop
        this._startGameLoop();
        this._setupDropCoinButton();

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
            });
        }
    }
}

// This line should be outside the class definition.
const game = new Game('renderCanvas');

export { Game };
