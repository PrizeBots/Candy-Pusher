class Objects {
    constructor(scene, materialManager, game, platformImpostor) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.game = game;
      //  this.initializeMasterCookie();
    }
    async initializeMasterCookie() {
        // Load the master cookie mesh
        try {
            const result = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "chocolateChipCookie.glb", this.scene);
            // Log the results to inspect what's being loaded
            console.log("Loaded meshes:", result.meshes);
            // Find and assign the actual cookie mesh with geometry
            const cookieMesh = result.meshes.find(mesh => mesh.id === "yourCookieMeshId"); // Replace with actual id or use conditions to identify the mesh
            if (cookieMesh && cookieMesh.geometry) {
                this.masterCookie = cookieMesh;
                this.masterCookie.isVisible = false;
                this.masterCookie.setEnabled(false);
            } else {
                console.error("No geometry found in the imported meshes");
            }
        } catch (error) {
            console.error("Error loading master cookie mesh:", error);
        }
    }

    async waitForPlatformImpostor() {
        while (!this.game.platformImpostor) {
            // Wait for a short period (e.g., 100 ms) before checking again
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    async createCookie(playerDropped, dropPos, platform, pusher) {
        if (!platform) {
            console.warn("Waiting for platform impostor to be ready...");
            await this.platformImpostor; // Wait for platform impostor to be ready
        }
        return new Promise(async (resolve) => {
            const cookie = await new Promise((innerResolve) => {
                BABYLON.SceneLoader.ImportMesh("", "assets/", "sugarCookie.glb", this.scene, (meshes) => {
               
                    //BABYLON.SceneLoader.ImportMesh("", "assets/", "chocolateChipCookie.glb", this.scene, (meshes) => {
                    if (meshes.length > 0) {
                        console.log("OOKIE!");
                        const cookieMesh = meshes[0];
                        cookieMesh.name = "cookie";
                        cookieMesh.initialCollision = true;
                        cookieMesh.position = new BABYLON.Vector3(0, 17.2, 0);
                        cookieMesh.rotation = BABYLON.Vector3.Zero();
                        cookieMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, -cookieMesh.scaling.y, 0));
                        cookieMesh.scaling = new BABYLON.Vector3(14, 18, 14);
                        // Create the cylinder and physics impostor
                        const cylinder = BABYLON.MeshBuilder.CreateCylinder("cookieCylinder", {
                            height: 2,
                            diameterTop: 7.5,
                            diameterBottom: 8,
                            tessellation: 12,
                        }, this.scene);
                        cylinder.position = dropPos;
                        // Create and set the physics impostor for the cookie mesh
                        cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, {
                            mass: 1,
                            restitution: .5,
                            friction: .05
                        }, this.scene);
                        cylinder.physicsImpostor.registerOnPhysicsCollide(platform, (main, collided) => {
                            if (cookieMesh.initialCollision) {
                                this.game.thudSound.play();
                                cookieMesh.initialCollision = false;
                            }
                        });
                        cylinder.physicsImpostor.registerOnPhysicsCollide(pusher, (main, collided) => {
                            if (cookieMesh.initialCollision) {
                                this.game.thudSound.play();
                                cookieMesh.initialCollision = false;
                            }
                        });
                        cookieMesh.parent = cylinder;
                        cylinder.isVisible = false;
                        innerResolve(cookieMesh); // Resolve the inner Promise with the created cookie
                    }
                });
            });
            resolve(); // Resolve the outer Promise
        });
    }



    createDonut() {
        // Import the donut model
        BABYLON.SceneLoader.ImportMesh("", "assets/", "pinkDonut.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const donut = meshes[0];
                donut.name = "donut";
                donut.position = new BABYLON.Vector3(0, 9, 0); // Set initial position
                donut.rotation = BABYLON.Vector3.Zero();
                // Set pivot point to the center of the donut
                donut.setPivotMatrix(BABYLON.Matrix.Translation(0, -donut.scaling.y, 0));
                donut.scaling = new BABYLON.Vector3(10, 10, 10);
                const cylinder = BABYLON.MeshBuilder.CreateCylinder("donutCylinder", {
                    height: 6, // Set the height based on the donut's scaled size
                    diameterTop: donut.scaling.x * 1.6, // Set the top diameter based on the donut's scaled size
                    diameterBottom: donut.scaling.x * 1.7, // Set the bottom diameter based on the donut's scaled size
                    tessellation: 12,

                }, this.scene);
                cylinder.position = new BABYLON.Vector3(0, 40, 0); // Set initial position
                donut.parent = cylinder;
                // Create a physics impostor for the cylinder
                cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, {
                    mass: 3, restitution: 0.1, friction: 0.1
                }, this.scene);
                cylinder.isVisible = false;
            }
        });
    }
    createCupcake() {
        BABYLON.SceneLoader.ImportMesh("", "assets/", "cupcake.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const cupcake = meshes[0];
                cupcake.name = "cupcake";
                cupcake.position = new BABYLON.Vector3(0, 13, 0);
                cupcake.rotation = BABYLON.Vector3.Zero();
                cupcake.setPivotMatrix(BABYLON.Matrix.Translation(0, -cupcake.scaling.y, 0));
                cupcake.scaling = new BABYLON.Vector3(10, 10, 10);
                const cylinder = BABYLON.MeshBuilder.CreateCylinder("cupcakeCylinder", {
                    height: 10,
                    diameterTop: cupcake.scaling.x * 1.3,
                    diameterBottom: cupcake.scaling.x * .8,
                    tessellation: 12,
                }, this.scene);
                cylinder.position = new BABYLON.Vector3(0, 40, 0);
                cupcake.parent = cylinder;
                cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, {
                    mass: 2, restitution: 0.1, friction: 0.05
                }, this.scene);
                cylinder.isVisible = false;
            }
        });
    }
    createChocolateBar() {
        BABYLON.SceneLoader.ImportMesh("", "assets/", "chocolateBar.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const chocolateBar = meshes[0];
                chocolateBar.name = "chocolateBar";
                chocolateBar.position = new BABYLON.Vector3(0, 9, 0);
                chocolateBar.rotation = BABYLON.Vector3.Zero();
                chocolateBar.setPivotMatrix(BABYLON.Matrix.Translation(0, -chocolateBar.scaling.y, 0));
                chocolateBar.scaling = new BABYLON.Vector3(10, 10, 10);
                const box = BABYLON.MeshBuilder.CreateBox("chocolateBarBox", {
                    height: 1.5,
                    width: 17,
                    depth: 7
                }, this.scene);
                box.position = new BABYLON.Vector3(0, 40, 0);
                chocolateBar.parent = box;
                box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 2.4, restitution: 0.05, friction: 0.07
                }, this.scene);
               box.isVisible = false;
            }
        });
    }
    //add force for when treats land

    createPie() {
        BABYLON.SceneLoader.ImportMesh("", "assets/", "pie.glb", this.scene, (meshes) => {
            if (meshes.length > 0) {
                const pie = meshes[0];
                pie.name = "pie";
                pie.position = new BABYLON.Vector3(0, 9, 0);
                pie.rotation = BABYLON.Vector3.Zero();
                pie.setPivotMatrix(BABYLON.Matrix.Translation(0, -pie.scaling.y, 0));
                pie.scaling = new BABYLON.Vector3(10, 10, 10);
                const box =  this.createPieCollisionBox();
                // const box = BABYLON.MeshBuilder.CreateBox("pieBox", {
                //     height: 1.5,
                //     width: 17,
                //     depth: 7
                // }, this.scene);
                box.position = new BABYLON.Vector3(0, 40, 0);
                pie.parent = box;
                box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 2.4, restitution: 0.05, friction: 0.07
                }, this.scene);
              // box.isVisible = false;
            }
        });
    }
    createPieCollisionBox() {
        // Define the dimensions of the pie slice
        const sliceWidth = 10;  // Width of the slice
        const sliceHeight = 1.5;  // Height of the slice
        const sliceDepth = 10;  // Depth of the slice
    
        // Create three boxes to form the triangular collision area
        const box1 = BABYLON.MeshBuilder.CreateBox("box1", {
            height: sliceHeight,
            width: sliceWidth,
            depth: sliceDepth
        }, this.scene);
        box1.position = new BABYLON.Vector3(0, 0, 0);
    
        const box2 = BABYLON.MeshBuilder.CreateBox("box2", {
            height: sliceHeight,
            width: sliceWidth,
            depth: sliceDepth
        }, this.scene);
        box2.position = new BABYLON.Vector3(sliceWidth / 2, 0, 0);
        box2.rotation.y = Math.PI / 3;  // Rotate the box to form a pie slice
    
        const box3 = BABYLON.MeshBuilder.CreateBox("box3", {
            height: sliceHeight,
            width: sliceWidth,
            depth: sliceDepth
        }, this.scene);
        box3.position = new BABYLON.Vector3(-sliceWidth / 2, 0, 0);
        box3.rotation.y = -Math.PI / 3;  // Rotate the box to form a pie slice
    
        // Combine the boxes into a single parent mesh
        const pieCollisionBox = BABYLON.Mesh.MergeMeshes([box1, box2, box3], true, true, undefined, false, true);
    
        // Set the position and physics impostor for the collision box
        pieCollisionBox.position = new BABYLON.Vector3(0, 9, 0);
        pieCollisionBox.physicsImpostor = new BABYLON.PhysicsImpostor(pieCollisionBox, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 2.4,
            restitution: 0.05,
            friction: 0.07
        }, this.scene);
        return pieCollisionBox;
        // Optionally hide the collision box
        // pieCollisionBox.isVisible = false;
    }
    
}

export { Objects };
