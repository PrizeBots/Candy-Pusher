class DropManager {
    constructor(scene, materialManager) {
        this.scene = scene;
        this.materialManager = materialManager;
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
            { mass: 1, restitution: 0.1 }, 
            this.scene
        );

        return coin;
    }
}

export { DropManager };
