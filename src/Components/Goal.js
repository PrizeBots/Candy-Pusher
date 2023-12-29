// Goal.js
class Goal {
    constructor(game) {
        this.game = game;
        //Bonus
        this.bonusWindowActive = false;
        this.bonusWindowTimer = null;
        this.bonusCount = 0;
        this.init();

    }
    init() {
    }
    checkGoal(collidedObject) {
        var objName = collidedObject.name;
        if (objName === "cookieCylinder") {
            this.handleBonusWindow();
            this.game.getSound.play();
            this.game.score++;
            this.game.cookieCount++;
            this.game.uiManager.updateCookieCounter();
        } else if (objName === "cupcakeCylinder") {
            console.log("goalPlane cupcake ", objName);
            this.game.cupcakeCount += 1;
            this.game.getTreatSound.play();
            this.game.score + 10;
            this.game.uiManager.updateCupcakeCounter();
        } else if (objName === "donutCylinder") {
            console.log("goalPlane donut ", objName);
            this.game.donutCount += 1;
            this.game.getTreatSound.play();
            this.game.score + 50;
            this.game.uiManager.updateDonutCounter();
        } else {
            console.log("goalPlane ?????s ", objName);
            // this.game.getSound.play(); 
        }
        collidedObject.dispose();
        this.game.uiManager.updateScore();
    }
    handleBonusWindow() {
        console.log("handleBonusWindow");
        // If the bonus window is not active, start it
        if (!this.bonusWindowActive) {
            this.bonusWindowActive = true;
            this.bonusCount = 0; // reset bonus count for the new window

            // Set up a timer for the 3-second window
            this.bonusWindowTimer = setTimeout(() => {
                // When the timer ends...
                console.log(`Bonus value: ${this.bonusCount}`);
                if (this.bonusCount >= 1 && this.bonusCount < 2) {
                    this.game.dropManager.dropCupcake();
                    this.game.dropTreatSound.play();
                } else if (this.bonusCount >= 2) {
                    this.game.dropManager.dropDonut();
                    this.game.dropTreat2Sound.play();
                }
                // Reset the window state
                this.bonusWindowActive = false;
            }, 2000);
        } else {
            // If the window is already active, increment the bonus count for each subsequent drop
            this.bonusCount += 1;
        }
    }

}
export { Goal };
