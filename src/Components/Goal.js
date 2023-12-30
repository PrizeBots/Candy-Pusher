// Goal.js
class Goal {
    constructor(game) {
        this.game = game;
        //Bonus
        this.bonusWindowActive = false;
        this.bonusWindowTimer = null;
        this.bonusCount = 1;
        this.getTreat = false;
        this.init();

    }
    init() {
    }
    checkGoal(collidedObject) {
        var objName = collidedObject.name;
        if (objName === "cookieCylinder") {
            this.handleBonusWindow();
            this.game.score++;
            this.game.cookieCount++;
            this.game.uiManager.updateCookieCounter();
        } else if (objName === "cupcakeCylinder") {
            // console.log("goalPlane cupcake ", objName);
            this.game.cupcakeCount += 1;
            this.getTreat = true;
            this.game.score += 5;
            this.game.uiManager.updateCupcakeCounter();
        } else if (objName === "donutCylinder") {
            //  console.log("goalPlane donut ", objName);
            this.game.donutCount += 1;
            this.getTreat = true;
            this.game.score += 10;
            this.game.uiManager.updateDonutCounter();
            // } else if (objName === "chocolateBar") {
            //     // console.log("goalPlane cupcake ", objName);
            //     this.game.cupcakeCount += 1;
            //     this.getTreat = true;
            //     this.game.score += 5;
            //     this.game.uiManager.updateCupcakeCounter();
            // } else if (objName === "pie") {
            //     //  console.log("goalPlane donut ", objName);
            //     this.game.donutCount += 1;
            //     this.getTreat = true;
            //     this.game.score += 10;
            //     this.game.uiManager.updateDonutCounter();
            // } else {
            console.log("goalPlane ?????s ", objName);
        }
        if (this.bonusCount === 1) {
            this.game.get1Sound.play();
        } else if (this.bonusCount === 2) {
            this.game.get2Sound.play();
        } else if (this.bonusCount === 3) {
            this.game.get3Sound.play();
        } else if (this.bonusCount === 4) {
            this.game.get4Sound.play();
        } else if (this.bonusCount === 5) {
            this.game.get5Sound.play();
        } else if (this.bonusCount === 6) {
            this.game.get6Sound.play();
        }
        if (this.getTreat) {
            this.getTreat = false;
            this.game.getTreatSound.play();
        }
        collidedObject.dispose();
        this.game.uiManager.updateScore();
        //  console.log("SCORE ", this.game.score);
    }
    handleBonusWindow() {
        console.log("handleBonusWindow");
        if (!this.bonusWindowActive) {
            this.bonusWindowActive = true;
            this.bonusCount = 1; // reset bonus count for the new window
            this.bonusWindowTimer = setTimeout(() => {
                console.log(`Bonus value: ${this.bonusCount}`);
                this.handleDropRewards();
                this.bonusWindowActive = false;
            }, 2000);
        } else {
            this.bonusCount += 1;
        }
    }
    //1 cookie
    //2 cupcake
    //4 donut
    //8 chocolate
    //16 pie
    //32 cola
    //64 cake
    handleDropRewards() {
        //2 to 3 points gets 1 cupcake. 
        if (this.bonusCount > 1 && this.bonusCount <= 3) {
            this.game.dropManager.dropCupcake();
            this.game.dropTreatSound.play();
            //4 to 5 points gets a donut
        } else if (this.bonusCount > 3 && this.bonusCount <= 5) {
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //6 and 7 points gets 2
        } else if (this.bonusCount >= 6 && this.bonusCount < 8) {
            this.game.dropManager.dropCupcake();
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //8 to 9 points gets chocolate
        } else if (this.bonusCount >= 7 && this.bonusCount <10) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropTreat2Sound.play();
            //10 get chcolate and cupcake
        } else if (this.bonusCount >= 2) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropManager.dropCupcake();
            this.game.dropTreat2Sound.play();
        }
    }

}
export { Goal };
