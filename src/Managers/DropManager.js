import { Objects } from '../Components/Objects.js';

class DropManager {
    constructor(scene, materialManager, platformImpostor, game) {
        this.scene = scene;
        this.game = game;
        this.materialManager = materialManager;
        this.loadedMonkeyModel = null;
        this.scaleFactor = 2; // Define scaleFactor as a class propertys
        //  this.loadMonkeyModel(); // Load the model when the class is instantiated
        this.platformImpostor = platformImpostor; // Add this line
        this.objects = new Objects(this.scene, this.materialManager, this.game);

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

    dropCookie(playerDropped) {
        const cookie = this.objects.createCookie(playerDropped);

        return cookie;
   
    }

    dropDonut() {
        const donut = this.objects.createDonut();
        //const donut = this.objects.createCupcake();
        return donut;
   
    }

}

export { DropManager };