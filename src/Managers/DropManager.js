import { Objects } from '../Components/Objects.js';

class DropManager {
    constructor(scene, materialManager, platformImpostor, game, pusher) {
        this.scene = scene;
        this.game = game;
        this.materialManager = materialManager;
        this.loadedMonkeyModel = null;
        this.scaleFactor = 2; // Define scaleFactor as a class propertys
        //  this.loadMonkeyModel(); // Load the model when the class is instantiated
        this.platformImpostor = platformImpostor; // Add this line
        this.pusher = pusher;
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

    dropCookie(playerDropped, dropPos) {
     //   console.log('drop cookie at : ',dropPos)
        const cookie = this.objects.createCookie(playerDropped, dropPos, this.platformImpostor, this.pusher);
        
        if (!this.droppingCookies) {
            this.droppingCookies = true; // Set the flag to prevent multiple invocations
          
            // Ensure the flag is reset when the promise is resolved
            cookie.then((result) => {
                this.droppingCookies = false;
                // Handle the result or any other logic here
            }).catch((error) => {
                // Handle errors gracefully
                console.error(error);
                this.droppingCookies = false; // Ensure the flag is reset in case of errors
            });
            return cookie;
        }
    }

    dropDonut() {
        const donut = this.objects.createDonut();
        return donut;
    }
    dropCupcake() {
        const cupcake = this.objects.createCupcake();
        return cupcake;
    }
    dropChocolateBar(){
        const chocolateBar = this.objects.createChocolateBar();
        return chocolateBar;
    }
    dropPie(){
        const pie = this.objects.createPie();
        return pie;
    }
    dropCola(){
        const cola = this.objects.createCola();
        return cola;
    }
    dropCake(){
        const cake = this.objects.createCake();
        return cake;
    }
}

export { DropManager };
