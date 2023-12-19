class SceneManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        this.scene = new BABYLON.Scene(engine);
        this.scene.enablePhysics(new BABYLON.Vector3(0, -30, 0), new BABYLON.CannonJSPlugin());
        this._setupLighting();
        this._setupCamera();
    }

    _setupLighting() {
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
    }

    _setupCamera() {
        console.log('make camera')
        var camera = new BABYLON.ArcRotateCamera(
            "camera1", Math.PI / 2, Math.PI / 2.8, 120, 
            new BABYLON.Vector3(0, 0, 0), this.scene
        );
        camera.attachControl(this.canvas, true); // Ensure this line is uncommented
    }

    getScene() {
        return this.scene;
    }
}
export { SceneManager };
