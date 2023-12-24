class LevelManager {
    constructor(scene, gameInstance) {
        this.scene = scene;
        this.game = gameInstance;
        this.level = 1;
    }

    levelSystem() {
        var numRows = 3;
        var numColumns = 4;
        const cookieSpacing = 6; // Adjust this value to set the spacing between cookies
        var initialX = -numColumns / 2 * cookieSpacing + 3;
        var initialZ = 18; // Adjust the initial Z position if needed

        // Create Level 1 - a 3x4 grid of cookies without deducting from player's cookie count
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const cookie = this.game.dropManager.dropCookie(false); // Create a cookie without decrementing cookie count
                const xOffset = initialX + col * cookieSpacing;
                const zOffset = initialZ + row * cookieSpacing;
                cookie.position.x = xOffset;
                cookie.position.y = 20;
                cookie.position.z = zOffset;
            }
        }

        // Reset numRows, numColumns, and initial positions for the next part of the level
        numRows = 6;
        numColumns = 7;
        initialX = -numColumns / 2 * cookieSpacing + 3;
        initialZ = 38; // Adjust the initial Z position if needed

        // Create the rest of Level 1 - a 6x7 grid of cookies without deducting from player's cookie count
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const cookie = this.game.dropManager.dropCookie(false); // Create a cookie without decrementing cookie count
                const xOffset = initialX + col * cookieSpacing;
                const zOffset = initialZ + row * cookieSpacing;
                cookie.position.x = xOffset;
                cookie.position.y = 20;
                cookie.position.z = zOffset;
            }
        }
        
        // Set the player's initial cookie count to 100
        this.game.uiManager.cookieCount = 100;
    }
}

export { LevelManager };
