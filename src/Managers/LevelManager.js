class LevelManager {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        this.level = 1;
    }
    //Level 1: Sugar - Sweets
    //Level 2: Air - Sports Balls
    //Level 3: Fuel - Cars n Trucks
    //Level 4: Protein - Food
    //Level 5: Water - Sea Life
    //Level 6: Juice - Fruit
    //
    levelSystem(callback) {
        for (let i = 0; i < 2; i++) {
            const numRows = 1;
            const numColumns = 3;
            const cookieSpacing = 7.8;
            const initialX = -numColumns / 2 * cookieSpacing + 3.5;
            const initialZ = 22;
            const initialY = 40;
            const cookies = [];

            const createCookiesForRow = (row, col) => {
                const xOffset = initialX + col * cookieSpacing;
                const zOffset = initialZ + row * cookieSpacing;
                const dropPos = new BABYLON.Vector3(xOffset, initialY, zOffset);
                // console.log('make level 1 cookie', dropPos);
                const cookie = this.game.dropManager.dropCookie(false, dropPos);
                if (cookie) {
                    cookie.rotation = BABYLON.Vector3.Zero();
                    cookies.push(cookie);
                }
                if (row < numRows - 1 || col < numColumns - 1) {
                    if (col < numColumns - 1) {
                        createCookiesForRow(row, col + 1); // Create the next cookie in the same row
                    } else {
                        createCookiesForRow(row + 1, 0); // Create the first cookie in the next row
                    }
                } else {
                    // When the first grid is complete, create the second grid
                    const secondGridRows = 5;
                    const secondGridColumns = 5;
                    const secondGridSpacing = 8.8;
                    const secondGridInitialX = -secondGridColumns / 2 * secondGridSpacing + 3.5;
                    const secondGridInitialZ = 32;

                    const createSecondGridCookiesForRow = (secondRow, secondCol) => {
                        const secondXOffset = secondGridInitialX + secondCol * secondGridSpacing;
                        const secondZOffset = secondGridInitialZ + secondRow * secondGridSpacing;
                        const secondDropPos = new BABYLON.Vector3(secondXOffset, initialY, secondZOffset);
                        // console.log('make level 2 cookie', secondDropPos);
                        const secondCookie = this.game.dropManager.dropCookie(false, secondDropPos);
                        if (secondCookie) {
                            secondCookie.rotation = BABYLON.Vector3.Zero();
                            cookies.push(secondCookie);
                        }
                        if (secondRow < secondGridRows - 1 || secondCol < secondGridColumns - 1) {
                            if (secondCol < secondGridColumns - 1) {
                                createSecondGridCookiesForRow(secondRow, secondCol + 1); // Create the next cookie in the same row
                            } else {
                                createSecondGridCookiesForRow(secondRow + 1, 0); // Create the first cookie in the next row
                            }
                        } else {
                            callback(cookies); // Invoke the callback when all cookies are created
                        }
                    };
                    createSecondGridCookiesForRow(0, 0); // Start creating cookies for the second grid
                }
            };

            createCookiesForRow(0, 0); // Start creating cookies for the first grid
        }
    }
}
export { LevelManager };
