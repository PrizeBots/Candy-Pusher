// Goal.js
class Goal {
    constructor(game) {
        this.game = game;
        //Bonus
        this.bonusWindowActive = false;
        this.bonusWindowTimer = null;
        this.bonusCount = 0;
        this.getTreat = false;
        this.init();

    }
    init() {
    }
    checkGoal(collidedObject) {
        this.handleBonusWindow();
        var objName = collidedObject.name;
        if (objName === "cookieCylinder") {
            this.game.score++;
            this.bonusCount++;
            this.game.cookieCount++;
            this.game.uiManager.updateCookieCounter();
        } else if (objName === "cupcakeCylinder") {
            this.game.cupcakeCount += 1;
            this.getTreat = true;
            this.game.score += 2;
            this.bonusCount += 2;
            this.game.uiManager.updateCupcakeCounter();
        } else if (objName === "donutCylinder") {
            this.game.donutCount += 1;
            this.getTreat = true;
            this.game.score += 4;
            this.bonusCount += 4;
            this.game.uiManager.updateDonutCounter();
        } else if (objName === "chocolateBarBox") {
            this.game.chocolateCount += 1;
            this.getTreat = true;
            this.game.score += 8;
            this.bonusCount += 8;
            this.game.uiManager.updateChocolateCounter();
        } else if (objName === "pie") {
            this.game.pieCount += 1;
            this.getTreat = true;
            this.game.score += 16;
            this.bonusCount += 8;
            this.game.uiManager.updatePieCounter();
        } else {
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
        } else if (this.bonusCount === 7) {
            this.game.get7Sound.play();
        } else if (this.bonusCount === 8) {
            this.game.get8Sound.play();
        } else if (this.bonusCount === 9) {
            this.game.get9Sound.play();
        } else if (this.bonusCount === 10) {
            this.game.get10Sound.play();
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
            this.bonusCount = 0; // reset bonus count for the new window
            this.bonusWindowTimer = setTimeout(() => {
                console.log(`Bonus value: ${this.bonusCount}`);
                this.handleDropRewards();
                this.bonusWindowActive = false;
            }, 2000);
        } else {
            /// this.bonusCount += 1;
        }
    }
    //2 cookie
    //4 cupcake
    //8 donut
    //16 chocolate
    //32 pie or wall token
    //64 cola or push token
    //128 cake or shake token
    handleDropRewards() {
        //2 to 3 points gets 1 cupcake. 
        if (this.bonusCount > 1 && this.bonusCount <= 3) {
            var pos = new BABYLON.Vector3(0, 40, 0);
            this.game.dropManager.dropCookie(false, pos);
            this.game.dropTreatSound.play();
            //4 to 5 points gets a donut
        } else if (this.bonusCount > 3 && this.bonusCount <= 5) {
            this.game.dropManager.dropCupcake();
            this.game.dropTreat2Sound.play();
        } else if (this.bonusCount >= 6 && this.bonusCount < 8) {
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //6 and 7 points gets 2
        } else if (this.bonusCount >= 7 && this.bonusCount < 10) {
            this.game.dropManager.dropCupcake();
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //8 to 9 points gets chocolate
        } else if (this.bonusCount >= 10 && this.bonusCount < 12) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropTreat2Sound.play();
            //10 get chcolate and cupcake
        } else if (this.bonusCount >= 12 && this.bonusCount < 14) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropManager.dropCupcake();
            this.game.dropTreat2Sound.play();
            //12 and 13 get 2
        } else if (this.bonusCount >= 14 && this.bonusCount < 16) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //14 and 15 get 2
        } else if (this.bonusCount >= 16 && this.bonusCount < 18) {
            this.game.dropManager.dropChocolateBar();
            this.game.dropManager.dropCupcake();
            this.game.dropManager.dropDonut();
            this.game.dropTreat2Sound.play();
            //16 and 17 get pie
        } else if (this.bonusCount >= 16 && this.bonusCount < 18) {
            this.game.dropManager.dropPie();
            this.game.dropTreat2Sound.play();
        }
    }

}
export { Goal };
