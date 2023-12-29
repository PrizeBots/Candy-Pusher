// UIManager.js
class UIManager {
    constructor(game) {
        this.game = game;
        // Create and append drop counter element
        this.dropCounterElement = document.createElement('div');
        this.dropCounterElement.id = 'dropCounter';
        document.body.appendChild(this.dropCounterElement);
        // Create and append drop counter element
        this.scoreCounterElement = document.createElement('div');
        this.scoreCounterElement.id = 'scoreCounter';
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
        // Initialize UI
        this.updateScore();

        this.updateDropCounter(6);
        this.updateCookieCounter(this.game.cookieCount);
        this.updateCupcakeCounter(this.game.cupcakeCount);
        this.updateDonutCounter(this.game.donutCount);
    }
    updateScore() {
        console.log("updateScore ", this.game.score);
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
}
export { UIManager };
