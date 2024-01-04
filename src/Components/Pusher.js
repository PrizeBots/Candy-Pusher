// Pusher.js
export class Pusher {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
        this.pusherSpeed = .5;
        this.pusherDirection = 1;
        this.pusherLimitFront = 20;
        this.pusherLimitBack = -15;
        this.frameRate = 60;
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
            { mass: 0, restitution: 0, friction: 1},
            this.scene
        );

        this.pusher = pusher;
        this.pusherParent = new BABYLON.Mesh("pusherParent", this.scene);
        this.pusherParent.addChild(this.pusher);
        this.updatePusher();
        return Pusher;
    }

    updatePusher() {
        if (this.pusher) {
           
            const frameRate = 10;
            const zSlide = new BABYLON.Animation("zSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            const keyFrames1 = [];
            keyFrames1.push({
                frame: 0,
                value: this.pusherLimitFront
            });
            keyFrames1.push({
                frame: frameRate,
                value: this.pusherLimitBack
            });
            keyFrames1.push({
                frame: 2 * frameRate,
                value: this.pusherLimitFront
            });
            zSlide.setKeys(keyFrames1);
            this.pusherParent.animations.push(zSlide);
            this.scene.beginAnimation(this.pusherParent, 0, 2 * frameRate, true,this.pusherSpeed);
        }
    }
    bigPush() {
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