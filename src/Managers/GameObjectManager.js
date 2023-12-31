import { Platform } from '../Components/Platform.js';
import { Goal } from '../Components/Goal.js';
class GameObjectManager {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.game = game;
        this.materialManager = materialManager;
        this.goal = new Goal(game);
        this.pusher = null;
        this.pusherSpeed = 0.25;
        this.pusherDirection = 1;
        this.pusherLimitFront = -5;
        this.pusherLimitBack = -40;
    }
    createCapturePlane() {
        const capturePlane = BABYLON.MeshBuilder.CreateGround("capturePlane", { width: 200, height: 200, depth: 0 }, this.scene);
        capturePlane.position.y = -55;
        capturePlane.position.z = 48;
        capturePlane.physicsImpostor = new BABYLON.PhysicsImpostor(
            capturePlane,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, kinematic: false },
            this.scene
        );
        capturePlane.physicsImpostor.registerOnPhysicsCollide(this.scene.getPhysicsEngine().getImpostors(), (main, collided) => {
            collided.object.dispose();
        });
       capturePlane.isVisible = false;
        return capturePlane;
    }
  
    createGoalPlane() {
        const goalPlane = BABYLON.MeshBuilder.CreateGround("goalPlane", { width: 40, height: 50, depth: 0 }, this.scene);
        goalPlane.position.y = -45;
        goalPlane.position.z = 90;
        goalPlane.isVisible = false;
        goalPlane.physicsImpostor = new BABYLON.PhysicsImpostor(
            goalPlane,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, kinematic: false },
            this.scene
        );
        goalPlane.physicsImpostor.registerOnPhysicsCollide(this.scene.getPhysicsEngine().getImpostors(), (main, collided) => {
            this.goal.checkGoal(collided.object);
           
        });
        return goalPlane;
    }
   
    loadPlatformModel(){
        BABYLON.SceneLoader.ImportMesh("", "assets/", "gamePlatform.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const gamePlatform = meshes[0];
                gamePlatform.name = "gamePlatform";
                gamePlatform.position = new BABYLON.Vector3(0, 9, 0); // Set initial position
                gamePlatform.rotation = BABYLON.Vector3.Zero();
                // Set pivot point to the center of the donut
                gamePlatform.setPivotMatrix(BABYLON.Matrix.Translation(0, -gamePlatform.scaling.y, 0));
              //  gamePlatform.scaling = new BABYLON.Vector3(10, 10, 10);
               
            }
        });
    }
    createPusher() {
        const pusherSize = { width: 40, height: 10, depth: 50 };
        const pusher = BABYLON.MeshBuilder.CreateBox("pusher", pusherSize, this.scene);
        pusher.position.y = 1;
        pusher.position.z = -25;
        pusher.material = this.materialManager.getMaterial("pusherMaterial");
        pusher.physicsImpostor = new BABYLON.PhysicsImpostor(
            pusher,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0, friction: 1, kinematic: true },
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
