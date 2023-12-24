class Objects {
    constructor(scene, materialManager, game) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
        const coinDiameter = 6; // Set the diameter of the coin
        const coinHeight = coinDiameter / 3; // Set the height of the coin
        this.coinMaterial = this.materialManager.getMaterial("gold"); // Get gold material
        this.mainCookie = BABYLON.MeshBuilder.CreateCylinder("cookie", {
                diameter: coinDiameter,
                height: coinHeight
            }, this.scene);
            this.mainCookie.material =   this.coinMaterial;
        this.mainCookie.setEnabled(false);

    }

    createCookie(playerDropped) {
        // const coinDiameter = 6; // Set the diameter of the coin
        // const coinHeight = coinDiameter / 3; // Set the height of the coin
        // const coinMaterial = this.materialManager.getMaterial("gold"); // Get gold material
        var cookie = new BABYLON.InstancedMesh("cookie", this.mainCookie);
        // const cookie = BABYLON.MeshBuilder.CreateCylinder("cookie", {
        //     diameter: coinDiameter,
        //     height: coinHeight
        // }, this.scene);
       
        cookie.position = new BABYLON.Vector3(0, 40, 0); // Set initial position
        cookie.name = "cookie";
        cookie.physicsImpostor = new BABYLON.PhysicsImpostor(
            cookie,
            BABYLON.PhysicsImpostor.CylinderImpostor,
            { mass: 2, friction: .1, restitution: .5 },
            this.scene
        );
        if (playerDropped) this.game.uiManager.decrementCookieCount(); // Decrement cookie count when a cookie is dropped
        const allImpostors = this.scene.getPhysicsEngine().getImpostors();
        // Register collision event only with the platform
        cookie.physicsImpostor.registerOnPhysicsCollide(allImpostors, (main, collided) => {
            if (!cookie.hasCollided) {
                // console.log('THUD!')
                this.game.thudSound.play(); // Now 'this.game' should be defined
                cookie.hasCollided = true; // Set a flag to ensure sound is played only once
            }
        });
        return cookie;
    }

    createDonut() {
        // Import the donut model
        BABYLON.SceneLoader.ImportMesh("", "assets/", "pinkDonut.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const donut = meshes[0];
                donut.scaling = new BABYLON.Vector3(10, 10, 10); // Scale the imported model
                donut.position = new BABYLON.Vector3(0, 40, 0); // Set initial position
                donut.name = "donut";
                donut.rotation = BABYLON.Vector3.Zero();
                donut.physicsImpostor = new BABYLON.PhysicsImpostor(donut, BABYLON.PhysicsImpostor.CylinderImpostor, {
                    mass: 1, restitution: 0.4
                }, this.scene);

                // donut.physicsImpostor = new BABYLON.PhysicsImpostor(
                //     donut,
                //     BABYLON.PhysicsImpostor.BoxImpostor,
                //     { mass: 1, restitution: 1, kinematic: true },
                //     this.scene
                // );

                // Create a physics impostor using a cylinder
                // donut.physicsImpostor = new BABYLON.PhysicsImpostor(
                //     donut,
                //     BABYLON.PhysicsImpostor.CylinderImpostor, // Use a cylinder impostor
                //     { mass: 1, friction: 2, restitution: 1 },
                //     
                // );

            }
        });
    }


    createCupcake() {

        // Import the donut model
        BABYLON.SceneLoader.ImportMesh("", "assets/", "cupcake.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const cupcake = meshes[0];
                cupcake.scaling = new BABYLON.Vector3(20, 20, 20); // Scale the imported model
                cupcake.position = new BABYLON.Vector3(0, 40, 0); // Set initial position
                cupcake.name = "cupcake";
                cupcake.rotation = BABYLON.Vector3.Zero();

                // Create a physics impostor using a cylinder
                cupcake.physicsImpostor = new BABYLON.PhysicsImpostor(
                    cupcake,
                    BABYLON.PhysicsImpostor.CylinderImpostor, // Use a cylinder impostor
                    { mass: 2, friction: 0.1, restitution: 0.5 },
                    this.scene
                );
            }
        });
    }





}

export { Objects };
