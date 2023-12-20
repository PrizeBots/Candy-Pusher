class DropManager {
    constructor(scene, materialManager, platformImpostor, gameInstance) {
        this.scene = scene;
        this.game = gameInstance;
        this.materialManager = materialManager;
        this.loadedMonkeyModel = null;
        this.scaleFactor = 2; // Define scaleFactor as a class propertys
        //  this.loadMonkeyModel(); // Load the model when the class is instantiated
        this.platformImpostor = platformImpostor; // Add this line

    }

    loadMonkeyModel() {
        BABYLON.SceneLoader.ImportMesh("", "assets/", "monkey.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                this.loadedMonkeyModel = meshes[0];
                this.loadedMonkeyModel.isVisible = false; // Hide it initially
                this.loadedMonkeyModel.scaling = new BABYLON.Vector3(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            }
        });
    }

    dropMonkeyModel() {
        if (this.loadedMonkeyModel) {
            const monkeyClone = this.loadedMonkeyModel.clone("monkeyClone");
            monkeyClone.isVisible = true;
            monkeyClone.position = new BABYLON.Vector3(0, 40, 110); // Try a different position
            const boundingBox = BABYLON.MeshBuilder.CreateBox("boundingBox", {
                width: this.scaleFactor * 2,  // Adjusted size
                height: this.scaleFactor * 2,
                depth: this.scaleFactor * 2
            }, this.scene);
            boundingBox.isVisible = false;
            boundingBox.position = monkeyClone.position;
            boundingBox.physicsImpostor = new BABYLON.PhysicsImpostor(
                boundingBox,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 1, restitution: 0.1 },
                this.scene
            );
            boundingBox.addChild(monkeyClone);
            return boundingBox;
        }
    }

    dropCoin() {
        const coinDiameter = 8; // Set the diameter of the coin
        const coinHeight = 2; // Set the height of the coin
        const coinMaterial = this.materialManager.getMaterial("gold"); // Get gold material

        const coin = BABYLON.MeshBuilder.CreateCylinder("coin", {
            diameter: coinDiameter,
            height: coinHeight
        }, this.scene);

        coin.material = coinMaterial;
        coin.position = new BABYLON.Vector3(0, 40, 0); // Set initial position

        coin.physicsImpostor = new BABYLON.PhysicsImpostor(
            coin,
            BABYLON.PhysicsImpostor.CylinderImpostor,
            { mass: 1, friction: 1, restitution: 0.1 },
            this.scene
        );
        // Register collision event only with the platform
        coin.physicsImpostor.registerOnPhysicsCollide([this.platformImpostor], () => {
            if (!coin.hasCollided) {
                console.log('THUD!')
                this.game.thudSound.play(); // Now 'this.game' should be defined
                coin.hasCollided = true; // Set a flag to ensure sound is played only once
            }
        });


        return coin;
    }
}

export { DropManager };
