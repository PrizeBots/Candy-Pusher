// Walls.js
class Walls {
    constructor(scene, game, materialManager) {
        this.game = game;
        this.scene = scene;
        this.materialManager = materialManager;
        this.wallDownPosition = -15;
        this.wallUpPosition = 15;
        this.wallSpeed = 0.18;
        this.wallDirection = 1;
        this.wallTimer = null;
        this.wallsUp = false;
        this.wallTime = 10000;
        this.wallMoving = false;
        this.frameRate = 60;
        this.DesignWalls();
    }
    DesignWalls() {
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
        this.leftWallParent = new BABYLON.Mesh("leftWallParent", this.scene);
        this.rightWallParent = new BABYLON.Mesh("rightWallParent", this.scene);

        // Add wall meshes as children
        this.leftWallParent.addChild(this.leftWall);
        this.rightWallParent.addChild(this.rightWall);
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
            this.wallsUp = true;
            console.log('walls up11');
            const raiseAnimation = new BABYLON.Animation(
                "raiseAnimation",
                "position.y",
                this.frameRate,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                BABYLON.Animation.EASINGMODE_EASEINOUT
            );
            const keyFrames = [];
            keyFrames.push({
                frame: 0,
                value: 0
            });
            keyFrames.push({
                frame: this.frameRate,
                value: this.wallUpPosition
            });
            raiseAnimation.setKeys(keyFrames);
            this.leftWallParent.animations.push(raiseAnimation);
            this.rightWallParent.animations.push(raiseAnimation);
            // raiseAnimation.onAnimationEnd = () => {
            //     console.log('Left wall animation finished.');
            //     this.wallRaised();
            // };
            var leftWallUp = this.scene.beginAnimation(this.leftWallParent, 0, this.frameRate, false, this.wallSpeed);
            var rightWallUp = this.scene.beginAnimation(this.rightWallParent, 0, this.frameRate, false, this.wallSpeed);
        }
    }

    wallRaised() {
        console.log('walRaised');
        this.game.wallMoveFinishSound.play();
        this.game.wallTimer = this.wallTime;
        this.game.uiManager.updateWallTimer();
        const wallCountDown = setInterval(() => {
            console.log('1 second count down');
            this.game.wallTimer -= 1000;
            this.game.uiManager.updateWallTimer(); // Update the UI with the new timer value
            if (this.game.wallTimer <= 0) {
                clearInterval(wallCountDown); // Stop the countdown when timer reaches 0
                console.log('  walls going down !');
                this.lowerWallsWithTween();
            }
        }, 1000);
        //Walls down
        // setTimeout(() => {
           
        // }, this.wallTime);
    }
   
    lowerWallsWithTween() {
        if (this.wallsUp) {
            this.game.wallMoveSound.play();
            const lowerAnimation = new BABYLON.Animation(
                "lowerAnimation",
                "position.y",
                this.frameRate,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            );
            const keyFrames = [];
            keyFrames.push({
                frame: 0,
                value: this.wallUpPosition
            });
            keyFrames.push({
                frame: this.frameRate,
                value: 0
            });
            lowerAnimation.setKeys(keyFrames);
            this.leftWallParent.animations.push(lowerAnimation);
            this.rightWallParent.animations.push(lowerAnimation);
            this.scene.beginDirectAnimation(this.leftWallParent, [lowerAnimation], 0, this.frameRate, false, this.wallSpeed);
            this.scene.beginDirectAnimation(this.rightWallParent, [lowerAnimation], 0, this.frameRate, false, this.wallSpeed);
            // lowerAnimation.onAnimationEnd = () => {
            //     this.wallsUp = false;
            //     //     this.wallRaised();
            // };
            setTimeout(() => {
                console.log('  walls going down !');
                this.wallsUp = false;
                this.game.wallMoveFinishSound.play();
            }, 5000);

        }
    }
}
export { Walls };
