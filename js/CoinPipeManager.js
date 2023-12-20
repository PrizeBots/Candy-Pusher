class CoinPipeManager {
    constructor(scene, materialManager, dropManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.dropManager = dropManager;
        this.coinPipeSpeed = 0.5;
        this.coinPipeLimit = 25;
        this.coinPipeDirection = 1;

        this.createCoinPipe();
    }

    createCoinPipe() {
        const pipeSize = { height: 10, diameter: 5 };
        this.coinPipe = BABYLON.MeshBuilder.CreateCylinder("coinPipe", pipeSize, this.scene);
        this.coinPipe.position = new BABYLON.Vector3(0, 30, -10); // Set initial position
        this.coinPipe.material = this.materialManager.getMaterial("someMaterial"); // Set the material

        // You can add physics to the coin pipe if required
        // this.coinPipe.physicsImpostor = new BABYLON.PhysicsImpostor(...);
    }

    updateCoinPipe() {
        // Update the position of the coin pipe
        this.coinPipe.position.x += this.coinPipeSpeed * this.coinPipeDirection;
        if (this.coinPipe.position.x > this.coinPipeLimit || this.coinPipe.position.x < -this.coinPipeLimit) {
            this.coinPipeDirection *= -1;
        }
    }

    dropCoinFromPipe() {
        const coin = this.dropManager.dropCoin();
        coin.position = this.coinPipe.position.clone();
    }
}

export { CoinPipeManager };
