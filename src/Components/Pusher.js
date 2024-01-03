// Pusher.js
export class Pusher {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
        this.pusherSpeed = 0.25;
        this.pusherDirection = 1;
        this.pusherLimitFront = -5;
        this.pusherLimitBack = -40;
        this.createPusher();
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
        return Pusher;
    }

    updatePusher() {
        if (this.pusher) {
            this.pusher.position.z += this.pusherSpeed * this.pusherDirection;
            if (this.pusher.position.z >= this.pusherLimitFront || this.pusher.position.z <= this.pusherLimitBack) {
                this.pusherDirection *= -1;
            }
        }
    }
    bigPush(){
        console.log('  bigPush !');
        this.pusherDirection = 1;
        this.pusherSpeed = 10;
        this.pusherLimitFront = 15;
        setTimeout(() => {
            this.pusherSpeed = 0.25;
            this.pusherLimitFront = -5;
        }, 2000);

        


    }
}