class MaterialManager {
    constructor(scene) {
        this.scene = scene;
        this.wallMaterial = null;
        this.pusherMaterial = null;
        this.coinMaterials = {};
        this.objectMaterials = {};
        this._createMaterials();
    }

    _createMaterials() {
        // CollisionBoxMaterial 
        this.collisionBoxMaterial = new BABYLON.StandardMaterial("collisionBoxMaterial", this.scene);
        this.collisionBoxMaterial.diffuseColor = new BABYLON.Color3(0.196, 0.784, 0.196);
        // Wall Material
        this.wallMaterial = new BABYLON.StandardMaterial("wallMaterial", this.scene);
        this.wallMaterial.diffuseColor = new BABYLON.Color3(0, 0.31, 0.31);
        // Wall Material
        this.pusherMaterial = new BABYLON.StandardMaterial("pusherMaterial", this.scene);
        this.pusherMaterial.diffuseColor = new BABYLON.Color3(2, 0.31, 0.31);
        // Coin Materials
        // Gold Material
        this.coinMaterials['gold'] = new BABYLON.StandardMaterial("coinGoldMat", this.scene);
        this.coinMaterials['gold'].diffuseColor = new BABYLON.Color3(1, 0.843, 0); // Gold color

        // Red Material
        this.coinMaterials['red'] = new BABYLON.StandardMaterial("coinRedMat", this.scene);
        this.coinMaterials['red'].diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color

        // Blue Material
        this.coinMaterials['blue'] = new BABYLON.StandardMaterial("coinBlueMat", this.scene);
        this.coinMaterials['blue'].diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue color

        // Donut Material
        this.objectMaterials['donut'] = new BABYLON.StandardMaterial("donut", this.scene);
        this.objectMaterials['donut'].diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
    }
    getMaterial(name) {
        if (this.coinMaterials[name]) {
            return this.coinMaterials[name];
        }
        if (this.objectMaterials[name]) {
            return this.objectMaterials[name];
        }
        if (name === 'wallMaterial') {
            return this.wallMaterial;
        }
        if (name === 'pusherMaterial') {
            return this.pusherMaterial;
        }
        if (name === 'collisionBoxMaterial') {
            return this.collisionBoxMaterial;
        }
        return null; // Or a default material
    }
}

export { MaterialManager };
