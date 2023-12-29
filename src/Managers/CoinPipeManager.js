class CoinPipeManager {
    constructor(scene, materialManager, dropManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.dropManager = dropManager;
        this.game = game;
        this.maxDrops = 6;
        this.availableDrops = this.maxDrops;
        this.dropCooldown = 1000; // 3 seconds in milliseconds
        this.cooldownTimer = null;
        this.coinPipeSpeed = 0.25;
        this.coinPipeLimit = 20;
        this.coinPipeDirection = 1;
        this.createCoinPipe();
        this.game.uiManager.updateDropCounter(this.availableDrops); // Update UI
        this.game.uiManager.updateCookieCounter(this.cookieCount); // Initialize cookie counter in UI
    }

    createCoinPipe() {
        const pipeSize = { height: 30, diameter: 10 };
        this.coinPipe = BABYLON.MeshBuilder.CreateCylinder("coinPipe", pipeSize, this.scene);
        this.coinPipe.position = new BABYLON.Vector3(0, 50, 0); // Set initial position
        this.coinPipe.material = this.materialManager.getMaterial("someMaterial"); // Set the material
    }

    updateCoinPipe() {
        this.coinPipe.position.x += this.coinPipeSpeed * this.coinPipeDirection;
        if (this.coinPipe.position.x > this.coinPipeLimit || this.coinPipe.position.x < -this.coinPipeLimit) {
            this.coinPipeDirection *= -1;
        }
    }

    dropCoinFromPipe() {
        if (this.availableDrops > 0 && this.game.cookieCount > 0) {
           var dropPoint = new BABYLON.Vector3(this.coinPipe.position.x, this.coinPipe.position.y-16, this.coinPipe.position.z);
       //     var dropPoint = this.coinPipe.position.clone();
           
            const cookie = this.dropManager.dropCookie(true, dropPoint);
            this.game.poofSound.play();
            this.consumeDrop();
            this.game.cookieCount -= 1; // Deduct one cookie
            this.game.uiManager.updateCookieCounter(this.game.cookieCount); // Update UI
        }
    }
    consumeDrop() {
        this.availableDrops -= 1;
        this.game.uiManager.updateDropCounter(this.availableDrops); // Update UI
        // Clear existing timer and start a new one
        clearTimeout(this.cooldownTimer);
        this.cooldownTimer = setTimeout(() => {
            this.incrementDrop();
        }, this.dropCooldown);
    }
    incrementDrop() {
        if (this.availableDrops < this.maxDrops) {
            this.availableDrops += 1;
            this.game.uiManager.updateDropCounter(this.availableDrops); // Update UI
            this.cooldownTimer = setTimeout(() => {
                this.incrementDrop();
            }, 500); // Increment drop every 0.5 seconds
        }
    }
 
    resetDrops() {
        this.availableDrops = this.maxDrops;
        this.game.uiManager.updateDropCounter(this.availableDrops); // Update UI
    }
}

export { CoinPipeManager };
