// Platform.js
export class Platform {
    constructor(scene, materialManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        
    }

    create() {
        // Create main platform
        const mainPlatformSize = { width: 50, height: 2, depth: 120 };
        const mainPlatform = BABYLON.MeshBuilder.CreateBox("mainPlatform", mainPlatformSize, this.scene);
        mainPlatform.position.y = -1;
        mainPlatform.position.z = 10;
        mainPlatform.material = this.materialManager.getMaterial("platformMaterial");
        // Add physics impostor to the main platform
        mainPlatform.physicsImpostor = new BABYLON.PhysicsImpostor(
            mainPlatform,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.1 },
            this.scene
        );

        // Create pusher pit
        const sideSlopeWidth = 5;
        const sideSlopeHeight = 30;
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
        const slopesPhysicsOptions = { mass: 0, restitution: 0.1, friction: 0.1 };
        leftSlope.physicsImpostor = new BABYLON.PhysicsImpostor(leftSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);
        rightSlope.physicsImpostor = new BABYLON.PhysicsImpostor(rightSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);
        backSlope.physicsImpostor = new BABYLON.PhysicsImpostor(backSlope, BABYLON.PhysicsImpostor.BoxImpostor, slopesPhysicsOptions, this.scene);

        //Walls
        const wallHeight = 30;
        const wallDepth = 20;
        const wallWidth =6;
        const rightWall = this.createWall({
            width: wallWidth,
            height: wallHeight,
            depth: wallDepth,
            position: {
                x: -27,
                y: -5,
                z:25
            },
            rotation: {
                x: .1,
                y: -Math.PI / 4,
                z: Math.PI / slopeAngle
            }
        });
        // Create right wall
        const leftWall = this.createWall({
            width: wallWidth,
            height: wallHeight,
            depth: wallDepth,
            position: {
                x: 27,
                y: -5,
                z: 25
            },
            rotation: {
                x: .1,
                y: Math.PI / 4,
                z: -Math.PI / slopeAngle
            }
        });
        // const rightWall2 = this.createWall({
        //     width: wallWidth,
        //     height: wallHeight,
        //     depth: wallDepth,
        //     position: {
        //         x: -27,
        //         y: -5,
        //         z: 50
        //     },
         
        // });
        // // Create right wall
        // const leftWall2 = this.createWall({
        //     width: wallWidth,
        //     height: wallHeight,
        //     depth: wallDepth,
        //     position: {
        //         x: 30,
        //         y: -5,
        //         z: 50
        //     },
      
        // });
        ///leftWall.rotation.y = Math.PI / 4;
        // Parent the walls to the main platform for easy manipulation as a single entity
        mainPlatform.addChild(leftWall);
        mainPlatform.addChild(rightWall);
        mainPlatform.addChild(backSlope);
        mainPlatform.addChild(leftSlope);
        mainPlatform.addChild(rightSlope);

        return mainPlatform;
    }
    createWall(options) {
        const wall = BABYLON.MeshBuilder.CreateBox("wall", {
            width: options.width,
            height: options.height,
            depth: options.depth
        }, this.scene);

        wall.position.x = options.position.x;
        wall.position.y = options.position.y + options.height / 2; // Center vertically
        wall.position.z = options.position.z;
        if (options.rotation) {
            wall.rotation.x = options.rotation.x || 0;
            wall.rotation.y = options.rotation.y || 0;
            wall.rotation.z = options.rotation.z || 0;
        }
        wall.material = this.materialManager.getMaterial("wallMaterial");

        wall.physicsImpostor = new BABYLON.PhysicsImpostor(
            wall,
            BABYLON.PhysicsImpostor.BoxImpostor,
     
            { mass: 0, restitution: 0.1, friction: 0.1 }
        );

        return wall;
    }
}
