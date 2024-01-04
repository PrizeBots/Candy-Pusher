// UIManager.js
//import { UI } from './Components/UI.js';
class UIManager {
    constructor(game) {
        this.game = game;
        this.sugarCounterElement = document.createElement('div');
        this.sugarCounterElement.id = 'sugarCounter';
        document.body.appendChild(this.sugarCounterElement);
        //Score
        this.scoreCounterElement = document.createElement('div');
        this.scoreCounterElement.id = 'scoreCounter';
        document.body.appendChild(this.scoreCounterElement);
        // Create and append drop counter element
        this.dropCounterElement = document.createElement('div');
        this.dropCounterElement.id = 'dropCounter';
        document.body.appendChild(this.dropCounterElement);
        // Walls
        this.wallCounterElement = document.createElement('div');
        this.wallCounterElement.id = 'wallCounter';
        document.body.appendChild(this.wallCounterElement);
        // Wall Timer
        this.wallTimerElement = document.createElement('div');
        this.wallTimerElement.id = 'wallTimer';
        document.body.appendChild(this.wallTimerElement);
        // Big Push
        this.pushCounterElement = document.createElement('div');
        this.pushCounterElement.id = 'pushCounter';
        document.body.appendChild(this.pushCounterElement);
        // Create and append cookie counter element
        this.cookieCounterElement = document.createElement('div');
        this.cookieCounterElement.id = 'cookieCounter';
        document.body.appendChild(this.cookieCounterElement);
        // Create and append cupcake counter element
        this.cupcakeCounterElement = document.createElement('div');
        this.cupcakeCounterElement.id = 'cupcakeCounter';
        document.body.appendChild(this.cupcakeCounterElement);
        // Create and append donut counter element
        this.donutCounterElement = document.createElement('div');
        this.donutCounterElement.id = 'donutCounter';
        document.body.appendChild(this.donutCounterElement);
        // Chocolate
        this.chocolateCounterElement = document.createElement('div');
        this.chocolateCounterElement.id = 'chocolateCounter';
        document.body.appendChild(this.chocolateCounterElement);
        //Pie
        this.pieCounterElement = document.createElement('div');
        this.pieCounterElement.id = 'pieCounter';
        document.body.appendChild(this.pieCounterElement);
        //Cola
        this.colaCounterElement = document.createElement('div');
        this.colaCounterElement.id = 'colaCounter';
        document.body.appendChild(this.colaCounterElement);
        //Cake
        this.cakeCounterElement = document.createElement('div');
        this.cakeCounterElement.id = 'cakeCounter';
        document.body.appendChild(this.cakeCounterElement);
        // Initialize UI
        this.updateScore();
        this.updateSugarCounter();
        this.updateDropCounter(6);
        this.updateWallCounter();
        this.updateWallTimer();
        this.updatePushCounter();
        this.updateCookieCounter(this.game.cookieCount);
        this.updateCupcakeCounter(this.game.cupcakeCount);
        this.updateDonutCounter(this.game.donutCount);
        this.updateChocolateCounter(this.game.chocolateCount);
        this.updatePieCounter(this.game.pieCount);
        this.updateColaCounter(this.game.colaCount);
        this.updateCakeCounter(this.game.cakeCount);
    }
    updateSugarCounter() {
        this.sugarCounterElement.textContent = `Sugar: ${this.game.sugar}`;
    }
    updateScore() {
        //console.log("updateScore ", this.game.score);
        this.scoreCounterElement.textContent = `Score: ${this.game.score}`;
    }
    updateDropCounter(availableDrops) {
        this.dropCounterElement.textContent = `Drops: ${availableDrops}/6`;
    }
    updateWallCounter() {
        this.wallCounterElement.textContent = `${this.game.wallTokens}`;
    }
    updateWallTimer() {
        var timer = this.game.wallTimer/1000;
        this.wallTimerElement.textContent = `${timer}`;
    }
    updatePushCounter() {
        this.pushCounterElement.textContent = `${this.game.pushTokens}`;
    }
    updateCookieCounter() {
        this.cookieCounterElement.textContent = `${this.game.cookieCount}`;
    }
    updateCupcakeCounter() {
        this.cupcakeCounterElement.textContent = `${this.game.cupcakeCount}`;
    }
    updateDonutCounter() {
        this.donutCounterElement.textContent = `${this.game.donutCount}`;
    }
    updateChocolateCounter() {
        this.chocolateCounterElement.textContent = `${this.game.chocolateCount}`;
    }
    updatePieCounter() {
        this.pieCounterElement.textContent = `${this.game.pieCount}`;
    }
    updateColaCounter() {
        this.colaCounterElement.textContent = `${this.game.colaCount}`;
    }
    updateCakeCounter() {
        this.cakeCounterElement.textContent = `${this.game.cakeCount}`;
    }

}
export { UIManager };
