import { SceneManager } from './SceneManager.js';
import { MaterialManager } from './MaterialManager.js';
import { GameObjectManager } from './GameObjectManager.js';
// ... other imports ...

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.sceneManager = new SceneManager(this.engine, this.canvas);
        this.scene = this.sceneManager.getScene();

        this.materialManager = new MaterialManager(this.scene);
        this.gameObjectManager = new GameObjectManager(this.scene, this.materialManager);

        // Create platform and pusher
        const platform = this.gameObjectManager.createPlatform();
        const pusher = this.gameObjectManager.createPusher();

      // Start the game loop
      this._startGameLoop();
    }
    _startGameLoop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }}

// This line should be outside the class definition.
const game = new Game('renderCanvas');

export { Game };
