// Platform.js
import { Walls } from './Walls.js';

export class Platform {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
        this.create();
        this.walls = new Walls(this.scene,this.game, this.materialManager);
    }
    create() {
        // Create main platform
        const mainPlatformSize = { width: 40, height: 2, depth: 100 };
        const mainPlatform = BABYLON.MeshBuilder.CreateBox("mainPlatform", mainPlatformSize, this.scene);
        mainPlatform.position.y = -1;
        mainPlatform.position.z = 20;
        mainPlatform.material = this.materialManager.getMaterial("collisionBoxMaterial");
        // Add physics impostor to the main platform
        mainPlatform.physicsImpostor = new BABYLON.PhysicsImpostor(
            mainPlatform,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, friction: 0.05 },
            this.scene
        );
        // Create pusher pit
        const sideSlopeWidth = 3;
        const sideSlopeHeight = 90;
        const sideSlopeDepth = 70;
        const slopeAngle = 10;
        const backSlope = BABYLON.MeshBuilder.CreateBox("backSlope", {
            width: sideSlopeWidth,
            height: sideSlopeHeight,
            depth: sideSlopeDepth
        }, this.scene);
        backSlope.position.x = 0;
        backSlope.position.y = 10;
        backSlope.rotation.y = Math.PI / 2;
        backSlope.position.z = -22;
        backSlope.rotation.z = -Math.PI / slopeAngle;

        const rightSlope = BABYLON.MeshBuilder.CreateBox("rightSlope", {
            width: sideSlopeWidth,
            height: sideSlopeHeight,
            depth: sideSlopeDepth
        }, this.scene);
        rightSlope.position.x = -20;
        rightSlope.position.y = 10;
        rightSlope.position.z = -15;
        rightSlope.rotation.z = Math.PI / slopeAngle; // 45-degree rotation for the slope
        const leftSlope = BABYLON.MeshBuilder.CreateBox("leftSlope", {
            width: sideSlopeWidth,
            height: sideSlopeHeight,
            depth: sideSlopeDepth
        }, this.scene);
        leftSlope.position.x = 20;
        leftSlope.position.y = 10;
        leftSlope.position.z = -15;
        leftSlope.rotation.z = -Math.PI / slopeAngle; // -45-degree rotation for the slope

        // Add physics impostors to the slopes
        const slopesPhysicsOptions = { mass: 0, restitution: 0.1, friction: 0 };
        leftSlope.physicsImpostor = new BABYLON.PhysicsImpostor(leftSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);
        rightSlope.physicsImpostor = new BABYLON.PhysicsImpostor(rightSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);
        backSlope.physicsImpostor = new BABYLON.PhysicsImpostor(backSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);
        return mainPlatform;
    }
}