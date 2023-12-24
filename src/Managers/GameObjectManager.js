import { Platform } from '../Components/Platform.js';
class GameObjectManager {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.game = game;
        this.materialManager = materialManager;
        this.pusher = null;
        this.pusherSpeed = 0.25;
        this.pusherDirection = 1;
        this.pusherLimitFront = -10;
        this.pusherLimitBack = -40;
    }

    createCapturePlane() {
        const capturePlane = BABYLON.MeshBuilder.CreateGround("capturePlane", { width: 100, height: 40, depth: 0 }, this.scene);
        capturePlane.position.y = -10;
        capturePlane.position.z = 48;
        capturePlane.isVisible = true;
        capturePlane.physicsImpostor = new BABYLON.PhysicsImpostor(
            capturePlane,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, kinematic: false },
            this.scene
        );
        capturePlane.physicsImpostor.registerOnPhysicsCollide(this.scene.getPhysicsEngine().getImpostors(), (main, collided) => {
            collided.object.dispose();
            console.log("capturePlane");
            

        });
        return capturePlane;
    }

    createGoalPlane() {
        const goalPlane = BABYLON.MeshBuilder.CreateGround("goalPlane", { width: 40, height: 30, depth: 0 }, this.scene);
        goalPlane.position.y = -20;
        goalPlane.position.z = 80;
        goalPlane.isVisible = true;
        goalPlane.physicsImpostor = new BABYLON.PhysicsImpostor(
            goalPlane,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, kinematic: false },
            this.scene
        );
        goalPlane.physicsImpostor.registerOnPhysicsCollide(this.scene.getPhysicsEngine().getImpostors(), (main, collided) => {
            if (collided.object.name === "cookie") {
                this.game.getSound.play(); // Now 'this.game' should be defined
                collided.object.dispose(); // Remove the cookie
                this.game.uiManager.incrementCookieCount(); // Call the method on the UIManager instance
            }
        });
        return goalPlane;
    }
    createPlatform() {
        const platformCreator = new Platform(this.scene, this.materialManager);
        const customPlatform = platformCreator.create();
        return customPlatform;
    }
    createPusher() {
        const pusherSize = { width: 40, height: 5, depth: 50 };
        const pusher = BABYLON.MeshBuilder.CreateBox("pusher", pusherSize, this.scene);
        pusher.position.y = 1;
        pusher.position.z = -25;
        pusher.material = this.materialManager.getMaterial("pusherMaterial");
        pusher.physicsImpostor = new BABYLON.PhysicsImpostor(
            pusher,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, friction: .5, kinematic: true },
            this.scene
        );
        this.pusher = pusher;
        return pusher;
    }

    updatePusher() {
        if (this.pusher) {
            this.pusher.position.z += this.pusherSpeed * this.pusherDirection;
            if (this.pusher.position.z >= this.pusherLimitFront || this.pusher.position.z <= this.pusherLimitBack) {
                this.pusherDirection *= -1;
            }
        }
    }
}

export { GameObjectManager };
