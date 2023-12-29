class SceneManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        this.scene = new BABYLON.Scene(engine);
        this.scene.enablePhysics(new BABYLON.Vector3(0, -50, 0), new BABYLON.CannonJSPlugin());
        this._setupLighting();
        this._setupCamera();
        this.cameraLocked = true;
        this.camera;
        // this.scene.debugLayer.show({
        //     showPhysicsImpostor: true
        // });
        // this.scene.debugLayer.show({
        //     embedMode: true,
        //     overlay: true,
        //     physicsImpostor: true
        // });
    }
    cameraLock() {
        console.log('camera lock')
        if (this.cameraLocked) {
            this.cameraLocked = false;
            this.camera.attachControl(this.canvas, true);
        } else {
            this.cameraLocked = true;
            this.camera.detachControl(this.canvas);
        }
    }
    _setupLighting() {
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
    }
    _setupCamera() {
        var camera = new BABYLON.ArcRotateCamera(
            "camera1", Math.PI / 2, Math.PI / 2.8, 200,
            new BABYLON.Vector3(0, 0, 0), this.scene
        );
        camera.target.y = -22;
        camera.fov = .7;
        camera.aspectRatio = this.canvas.width / this.canvas.height;
        //  camera.attachControl(this.canvas, true);
        this.camera = camera;
    }
    getScene() {
        return this.scene;
    }
}
export { SceneManager };
