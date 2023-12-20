class GameObjectManager {
    constructor(scene, materialManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.pusher = null;
        this.pusherSpeed = 0.1;
        this.pusherDirection = 1;
        this.pusherLimitFront = 0;
        this.pusherLimitBack = -30;
    }
    createTriangleWall(position, rotation) {
        const wallSize = { width: 40, height: 10, depth: 20 };
        const wall = BABYLON.MeshBuilder.CreateBox("platform", wallSize, this.scene);

        wall.position = position;
        wall.rotation = rotation;
        //wall.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
        wall.rotation.y = Math.PI / 2
        wall.material = this.materialManager.getMaterial("wallMaterial");
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(
            wall,
            BABYLON.PhysicsImpostor.CylinderImpostor,
            { mass: 0, restitution: 0.9 },
            this.scene
        );

        return wall;
    }

    createWalls() {
        const wallDistance= 30;
        const leftWallPosition = new BABYLON.Vector3(-wallDistance, 0, 0);
        const leftWallRotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0);
        this.createTriangleWall(leftWallPosition, leftWallRotation);

        const rightWallPosition = new BABYLON.Vector3(wallDistance, 0, 0);
        const rightWallRotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0);
        this.createTriangleWall(rightWallPosition, rightWallRotation);
    }
    createPlatform() {
        const platformSize = { width: 40, height: 20, depth: 40 };
        const platform = BABYLON.MeshBuilder.CreateBox("platform", platformSize, this.scene);
        platform.position.y = -10;
        platform.material = this.materialManager.getMaterial("wallMaterial");
        platform.physicsImpostor = new BABYLON.PhysicsImpostor(
            platform,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 1, kinematic: true  },
            this.scene
        );

        return platform;
    }

    createPusher() {
        const pusherSize = { width: 40, height: 10, depth: 20 };
        const pusher = BABYLON.MeshBuilder.CreateBox("pusher", pusherSize, this.scene);
        pusher.position.y = 5;
        pusher.position.z = -25;
        pusher.material = this.materialManager.getMaterial("pusherMaterial");
        pusher.physicsImpostor = new BABYLON.PhysicsImpostor(
            pusher,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 1, friction: 1,kinematic: true },
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
