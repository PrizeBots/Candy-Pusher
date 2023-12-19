class GameObjectManager {
    constructor(scene, materialManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.pusher = null;
        this.pusherSpeed = 0.1;
        this.pusherDirection = 1;
        this.pusherLimitFront = -20;
        this.pusherLimitBack = -30;
    }

    createPlatform() {
        const platformSize = { width: 40, height: 20, depth: 40 };
        const platform = BABYLON.MeshBuilder.CreateBox("platform", platformSize, this.scene);
        platform.position.y = -10;
        platform.material = this.materialManager.getMaterial("wallMaterial");
        platform.physicsImpostor = new BABYLON.PhysicsImpostor(
            platform, 
            BABYLON.PhysicsImpostor.BoxImpostor, 
            { mass: 0, restitution: 1 }, 
            this.scene
        );

        return platform;
    }

    createPusher() {
        const pusherSize = { width: 40, height: 10, depth: 20 };
        const pusher = BABYLON.MeshBuilder.CreateBox("pusher", pusherSize, this.scene);
        pusher.position.y = 0.1;
        pusher.position.z = -25;
        pusher.material = this.materialManager.getMaterial("pusherMaterial");
        pusher.physicsImpostor = new BABYLON.PhysicsImpostor(
            pusher, 
            BABYLON.PhysicsImpostor.BoxImpostor, 
            { mass: 0, restitution: 0.1, kinematic: true }, 
            this.scene
        );

        return pusher;
    }

    // ... You can add more methods for creating other game objects
}

export { GameObjectManager };
