// UIManager.js
//import { UI } from './Components/UI.js';
class UIManager {
    constructor(game) {
        this.game = game;
        this.sugarCounterElement = document.createElement('div');
        this.sugarCounterElement.id = 'sugarCounter';
        // 
        this.scoreCounterElement = document.createElement('div');
        this.scoreCounterElement.id = 'scoreCounter';
        // Create and append drop counter element
        this.dropCounterElement = document.createElement('div');
        this.dropCounterElement.id = 'dropCounter';
        document.body.appendChild(this.dropCounterElement);
        document.body.appendChild(this.sugarCounterElement);
        document.body.appendChild(this.scoreCounterElement);
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
        this.chocolateCounterElement = document.createElement('div');
        this.chocolateCounterElement.id = 'chocolateCounter';
        document.body.appendChild(this.chocolateCounterElement);
        // Initialize UI
        this.updateScore();
        this.updateSugarCounter();
        this.updateDropCounter(6);
        this.updateCookieCounter(this.game.cookieCount);
        this.updateCupcakeCounter(this.game.cupcakeCount);
        this.updateDonutCounter(this.game.donutCount);
        this.updateChocolateCounter(this.game.chocolateCount);
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
    updateCookieCounter() {
        this.cookieCounterElement.textContent = `Cookies: ${this.game.cookieCount}`;
    }
    updateCupcakeCounter() {
        this.cupcakeCounterElement.textContent = `Cupcakes: ${this.game.cupcakeCount}`;
    }
    updateDonutCounter() {
        this.donutCounterElement.textContent = `Donuts: ${this.game.donutCount}`;
    }
    updateChocolateCounter() {
        this.chocolateCounterElement.textContent = `${this.game.chocolateCount}`;
    }
}
export { UIManager };
