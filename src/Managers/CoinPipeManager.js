class CoinPipeManager {
    constructor(scene, materialManager, dropManager, UIManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.dropManager = dropManager;
        this.UIManager = UIManager;
        this.cookieCount = 100; // Start with 100 cookies

        this.maxDrops = 6;
        this.availableDrops = this.maxDrops;
        this.dropCooldown = 1000; // 3 seconds in milliseconds
        this.cooldownTimer = null;
        this.coinPipeSpeed = 0.5;
        this.coinPipeLimit = 25;
        this.coinPipeDirection = 1;
        this.createCoinPipe();
        this.UIManager.updateDropCounter(this.availableDrops); // Update UI
        this.UIManager.updateCookieCounter(this.cookieCount); // Initialize cookie counter in UI


    }

    createCoinPipe() {
        const pipeSize = { height: 10, diameter: 5 };
        this.coinPipe = BABYLON.MeshBuilder.CreateCylinder("coinPipe", pipeSize, this.scene);
        this.coinPipe.position = new BABYLON.Vector3(0, 30, 0); // Set initial position
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
        if (this.availableDrops > 0 && this.cookieCount > 0) {
            const coin = this.dropManager.dropCoin();
            coin.position = this.coinPipe.position.clone();
            this.consumeDrop();
            this.consumeCookie(); // Deduct a cookie
        }
    }
    consumeDrop() {
        this.availableDrops -= 1;
        this.UIManager.updateDropCounter(this.availableDrops); // Update UI

        // Clear existing timer and start a new one
        clearTimeout(this.cooldownTimer);
        this.cooldownTimer = setTimeout(() => {
            this.incrementDrop();
        }, this.dropCooldown);
    }
    incrementDrop() {
        if (this.availableDrops < this.maxDrops) {
            this.availableDrops += 1;
            this.UIManager.updateDropCounter(this.availableDrops); // Update UI
            this.cooldownTimer = setTimeout(() => {
                this.incrementDrop();
            }, 500); // Increment drop every 0.5 seconds
        }
    }
    consumeCookie() {
        this.cookieCount -= 1; // Deduct one cookie
        this.UIManager.updateCookieCounter(this.cookieCount); // Update UI
    }
    resetDrops() {
        this.availableDrops = this.maxDrops;
        this.UIManager.updateDropCounter(this.availableDrops); // Update UI
    }
}

export { CoinPipeManager };
