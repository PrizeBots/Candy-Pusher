// Walls.js
class Walls {
    constructor(scene, game, materialManager) {
        this.game = game;
        this.scene = scene;
        this.materialManager = materialManager;
        this.wallDownPosition = -15;
        this.wallUpPosition = 7;
        this.wallSpeed = 0.05;
        this.wallDirection = 1;
        this.wallTimer = null;
        this.wallsUp = false;
        this.wallsDown = false;
        this.wallTime = 20000;
        this.wallMoving = false;
        //Walls
        const wallHeight = 30;
        const wallDepth = 20;
        const wallWidth = 3;
        const slopeAngle = 10;
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
        if (!this.wallsUp) {
            console.log('walls up!')
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
                    value: this.leftWall.position.y
                },
                {
                    frame: raiseDuration,
                    value: this.wallUpPosition
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

            this.wallsUp = true;
            this.wallsDown = false;
        }
    }

    lowerWallsWithTween() {
        if (!this.wallsDown) {
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
                    value: this.leftWall.position.y
                },
                {
                    frame: lowerDuration,
                    value: this.wallDownPosition
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

            this.wallsUp = false;
            this.wallsDown = true;
        }
    }

    // raiseWalls() {
    //     if (this.leftWall.position.y < this.wallUpPosition) {
    //         this.leftWall.position.y += this.wallSpeed;
    //         this.rightWall.position.y += this.wallSpeed;
    //         this.wallMoving = true;
    //     } else {
    //         this.leftWall.position.y = this.wallUpPosition;
    //         this.rightWall.position.y = this.wallUpPosition;
    //         if (this.wallMoving) {
    //             this.game.wallMoveFinishSound.play();
    //             this.wallMoving = false;
    //         }
    //         this.wallTimer = setTimeout(() => {
    //             this.wallsUp = false;
    //             this.wallsDown = true;
    //         }, this.wallTime);
    //     }
    // }
    // lowerWalls() {
    //     if (!this.wallMoving) {
    //         this.wallMoving = true;
    //         this.game.wallMoveSound.play();
    //     }
    //     if (this.leftWall.position.y > this.wallDownPosition) {
    //         this.leftWall.position.y -= this.wallSpeed;
    //         this.rightWall.position.y -= this.wallSpeed;

    //     } else {
    //         this.leftWall.position.y = this.wallDownPosition;
    //         this.rightWall.position.y = this.wallDownPosition;
    //         this.wallsDown = false;
    //     }
    // }


}
export { Walls };
