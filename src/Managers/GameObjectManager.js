import { Platform } from '../Components/Platform.js';
class GameObjectManager {
    constructor(scene, materialManager, UIManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.pusher = null;
        this.pusherSpeed = 0.25;
        this.pusherDirection = 1;
        this.pusherLimitFront = -10;
        this.pusherLimitBack = -40;
    }

    createGoalPlane(UIManager) {
        const goalPlane = BABYLON.MeshBuilder.CreateGround("goalPlane", { width: 40, height: 30, depth: 0 }, this.scene);
        goalPlane.position.y = -20;
        goalPlane.position.z = 100;
        goalPlane.isVisible = true;

        goalPlane.physicsImpostor = new BABYLON.PhysicsImpostor(
            goalPlane,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, kinematic: true },
            this.scene
        );
        goalPlane.physicsImpostor.registerOnPhysicsCollide(this.scene.getPhysicsEngine().getImpostors(), (main, collided) => {
            if (collided.object.name === "cookie") {
                collided.object.dispose(); // Remove the cookie
                UIManager.incrementCookieCount(); // Call the method on the UIManager instance
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
        
        // Create a larger invisible box for the physics impostor
        const pusherPhysicsSize = { width: 50, height: 10, depth: 70 };
        
        // Adjust the position to match the pusher
        const pusherPhysicsPosition = new BABYLON.Vector3(0, 1, -25);
        
        // Create the physics impostor using the larger size and position
        pusher.physicsImpostor = new BABYLON.PhysicsImpostor(
            pusher,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.1, friction: 0.05, kinematic: true, size: pusherPhysicsSize, position: pusherPhysicsPosition },
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
