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
        if (!collidedObject.isCounted) {
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
            } else if (objName === "pieBox") {
                this.game.pieCount += 1;
                this.getTreat = true;
                this.game.score += 16;
                this.bonusCount += 16;
                this.game.uiManager.updatePieCounter();
                collidedObject.isCounted = true; // Mark the pie as counted

            } else if (objName === "colaCylinder") {
                this.game.colaCount += 1;
                this.getTreat = true;
                this.game.score += 32;
                this.bonusCount += 32;
                this.game.uiManager.updateColaCounter();
                collidedObject.isCounted = true; // Mark the pie as counted

            } else if (objName === "cakeCylinder") {
                this.game.cakeCount += 1;
                this.getTreat = true;
                this.game.score += 64;
                this.bonusCount += 64;
                this.game.uiManager.updateCakeCounter();
                collidedObject.isCounted = true; // Mark the pie as counted

            }  else if (objName === "wallToken") {
                this.game.wallTokens += 1;
                this.getTreat = true;
                this.game.uiManager.updateWallCounter();
                collidedObject.isCounted = true; // Mark the pie as counted

            }  else if (objName === "pushToken") {
                this.game.pushTokens += 1;
                this.game.uiManager.updatePushCounter();
                collidedObject.isCounted = true; // Mark the pie as counted

            } else {
                console.log("goalPlane ?????s ", objName);
            }
            this.game.levelManager.checkScore();

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
        } else if (this.bonusCount >= 10) {
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
        //console.log("handleBonusWindow");
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
        this.game.dropTreatSound.play();
      //  this.game.dropManager.dropChocolateBar();
        //   this.game.dropTreat2Sound.play();
        var pos = new BABYLON.Vector3(0, 40, 0);
        if (this.bonusCount === 2) {
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 3) {
            this.game.dropManager.dropCupcake(false);
        } else if (this.bonusCount === 4) {
            this.game.dropManager.dropCupcake();
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 5) {
            this.game.dropManager.dropDonut(false);
        } else if (this.bonusCount === 6) {
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 7) {
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropDonut(false);
        } else if (this.bonusCount === 8) {
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 9) {
            this.game.dropManager.dropChocolateBar(false);
        } else if (this.bonusCount === 10) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 11) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCupcake(false);
        } else if (this.bonusCount === 12) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 13) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
        } else if (this.bonusCount === 14) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 15) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
        } else if (this.bonusCount === 15) {
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 16) {
            this.game.dropManager.dropPie(false);
        } else if (this.bonusCount === 17) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 18) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropCupcake(false);
        } else if (this.bonusCount === 19) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 20) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropDonut(false);
        } else if (this.bonusCount === 21) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 22) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
        } else if (this.bonusCount === 23) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        } else if (this.bonusCount === 24) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
        }else if (this.bonusCount === 25) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCookie(false, pos);
        }else if (this.bonusCount === 26) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCupcake(false);
        }else if (this.bonusCount === 27) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        }else if (this.bonusCount === 28) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
        }else if (this.bonusCount === 29) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCookie(false, pos);
        }else if (this.bonusCount === 30) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
        }else if (this.bonusCount === 31) {
            this.game.dropManager.dropPie(false);
            this.game.dropManager.dropChocolateBar(false);
            this.game.dropManager.dropDonut(false);
            this.game.dropManager.dropCupcake(false);
            this.game.dropManager.dropCookie(false, pos);
        }else if (this.bonusCount === 32) {
            this.game.dropManager.dropCola(false);
        }else if (this.bonusCount === 33) {
            this.game.dropManager.dropCola(false);
            this.game.dropManager.dropCookie(false, pos);
        }
        
    }

}
export { Goal };
