// Platform.js


export class Platform {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
        this.wallDownPosition = -15;
        this.wallUpPosition = 7;
        this.wallSpeed = 0.05;
        this.wallDirection = 1;
        this.wallTimer = null;
        this.wallsUp = false;
        this.wallsDown = false;
        this.wallTime = 20000;
        this.wallMoving = false;
        this.create();
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

        //Walls
        const wallHeight = 30;
        const wallDepth = 20;
        const wallWidth = 3;
        const goalBackboard = this.createWall({
            width: wallWidth,
            height: wallHeight * 2,
            depth: wallDepth * 3,
            position: {
                x: 0,
                y: -20,
                z: 110
            },
            rotation: {
                x: 0,
                y: 300,
                z: 0
            }
        });
        goalBackboard.isVisible = false;
        const rightSlantWall = this.createWall({
            width: wallWidth,
            height: wallHeight,
            depth: wallDepth,
            position: {
                x: -27,
                y: -5,
                z: 25
            },
            rotation: {
                x: .1,
                y: -Math.PI / 4,
                z: Math.PI / slopeAngle
            }
        });
        // Create right wall
        const leftSlantWall = this.createWall({
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

        //Wall Up Walls
        this.rightWall = this.createWall({
            width: wallWidth,
            height: wallHeight / 2,
            depth: wallDepth * 2,
            position: {
                x: -22,
                y: this.wallDownPosition,
                z: 47
            },

        });

        // Create right wall
        this.leftWall = this.createWall({
            width: wallWidth,
            height: wallHeight / 2,
            depth: wallDepth * 2,
            position: {
                x: 22,
                y: this.wallDownPosition,
                z: 47
            },
        });
        this.leftWall.mass = 1;
        this.rightWall.mass = 2;

        //Goal Walls
        const rightGoalWall = this.createWall({
            width: wallWidth,
            height: wallHeight / 2,
            depth: wallDepth * 2,
            position: {
                x: -23,
                y: -15,
                z: 90
            },
        });
        // Create right wall
        const leftGoalWall = this.createWall({
            width: wallWidth,
            height: wallHeight / 2,
            depth: wallDepth * 2,
            position: {
                x: 23,
                y: -15,
                z: 90
            },
        });
        const centerGoalWall = this.createWall({
            width: wallWidth,
            height: wallHeight / 2,
            depth: wallDepth * 2,
            position: {
                x: 0,
                y: -18,
                z: 65
            },
            rotation: {
                x: 0,
                y: 300,
                z: 0
            }
        });
        // Parent the walls to the main platform for easy manipulation as a single entity
        mainPlatform.addChild(goalBackboard);
        // mainPlatform.addChild(leftWall);
        // mainPlatform.addChild(rightWall);
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
        wall.material = this.materialManager.getMaterial("collisionBoxMaterial");
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(
            wall,
            BABYLON.PhysicsImpostor.BoxImpostor,

            { mass: 0, restitution: 0.1, friction: 0 }
        );
        return wall;
    }
    raiseWallsWithTween() {
        console.log('tweeening!!')
        const raiseDuration = 1000; // Duration of the raise animation in milliseconds
    
        // Create animation keyframes for raising walls
        const raiseAnimation = new BABYLON.Animation(
            "raiseWallsAnimation",
            "position.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    
        // Define the keyframes
        const raiseKeyframes = [
            {
                frame: 0,
                value: this.leftWall.position.y // Starting position
            },
            {
                frame: raiseDuration,
                value: this.wallUpPosition // Ending position
            }
        ];
    
        // Set the animation keyframes
        raiseAnimation.setKeys(raiseKeyframes);
    
        // Attach the animation to both walls
        this.leftWall.animations.push(raiseAnimation);
        this.rightWall.animations.push(raiseAnimation);
    
        // Play the animation
        this.scene.beginAnimation(this.leftWall, 0, raiseDuration, false);
        this.scene.beginAnimation(this.rightWall, 0, raiseDuration, false);
    }
    
    lowerWallsWithTween() {
        const lowerDuration = 1000; // Duration of the lower animation in milliseconds
    
        // Create animation keyframes for lowering walls
        const lowerAnimation = new BABYLON.Animation(
            "lowerWallsAnimation",
            "position.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    
        // Define the keyframes
        const lowerKeyframes = [
            {
                frame: 0,
                value: this.leftWall.position.y // Starting position
            },
            {
                frame: lowerDuration,
                value: this.wallDownPosition // Ending position
            }
        ];
    
        // Set the animation keyframes
        lowerAnimation.setKeys(lowerKeyframes);
    
        // Attach the animation to both walls
        this.leftWall.animations.push(lowerAnimation);
        this.rightWall.animations.push(lowerAnimation);
    
        // Play the animation
        this.scene.beginAnimation(this.leftWall, 0, lowerDuration, false);
        this.scene.beginAnimation(this.rightWall, 0, lowerDuration, false);
    }
    
    
    raiseWalls() {
        if (this.leftWall.position.y < this.wallUpPosition) {
            this.leftWall.position.y += this.wallSpeed;
            this.rightWall.position.y += this.wallSpeed;
            this.wallMoving = true;
        } else {
            this.leftWall.position.y = this.wallUpPosition;
            this.rightWall.position.y = this.wallUpPosition;
            if (this.wallMoving) {
                this.game.wallMoveFinishSound.play();
                this.wallMoving = false;
            }
            this.wallTimer = setTimeout(() => {
                this.wallsUp = false;
                this.wallsDown = true;
            }, this.wallTime);
        }
    }
    lowerWalls() {
        if (!this.wallMoving) {
            this.wallMoving = true;
            this.game.wallMoveSound.play();
        }
        if (this.leftWall.position.y > this.wallDownPosition) {
            this.leftWall.position.y -= this.wallSpeed;
            this.rightWall.position.y -= this.wallSpeed;

        } else {
            this.leftWall.position.y = this.wallDownPosition;
            this.rightWall.position.y = this.wallDownPosition;
            this.wallsDown = false;
        }
    }
}