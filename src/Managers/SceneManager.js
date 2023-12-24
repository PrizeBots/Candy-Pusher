class SceneManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        this.scene = new BABYLON.Scene(engine);
        this.scene.enablePhysics(new BABYLON.Vector3(0, -120, 0), new BABYLON.CannonJSPlugin());
        this.engine = new BABYLON.Engine(this.canvas, true, { antialias: true, allowSleep: true, sleepTimeLimit:2 });

        this._setupLighting();
        this._setupCamera();
      
        this.scene.debugLayer.show({
            showPhysicsImpostor: true
        });
        // this.scene.debugLayer.show({
        //     embedMode: true,
        //     overlay: true,
        //     physicsImpostor: true
        // });
    }

    _setupLighting() {
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
    }

    _setupCamera() {
        var camera = new BABYLON.ArcRotateCamera(
            "camera1", Math.PI / 2, Math.PI / 3.2, 210, 
            new BABYLON.Vector3(0, 0, 0), this.scene
        );
        camera.target.y = -22;
        camera.fov =0.56;
        camera.aspectRatio = this.canvas.width / this.canvas.height;
        camera.attachControl(this.canvas, true); // Ensure this line is uncommented
    }

    getScene() {
        return this.scene;
    }
}
export { SceneManager };
