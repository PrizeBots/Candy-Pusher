// UIManager.js
class UIManager {
    constructor(game) {
        this.game = game;

        // Create and append drop counter element
        this.dropCounterElement = document.createElement('div');
        this.dropCounterElement.id = 'dropCounter';
        document.body.appendChild(this.dropCounterElement);

        // Create and append cookie counter element
        this.cookieCounterElement = document.createElement('div');
        this.cookieCounterElement.id = 'cookieCounter';
        document.body.appendChild(this.cookieCounterElement);

        // Initialize UI
        this.updateDropCounter(6);
        this.updateCookieCounter(this.game.cookieCount);
    }
    decrementCookieCount() {
        if (this.game.cookieCount > 0) {
            this.game.cookieCount -= 1;
            this.updateCookieCounter(this.game.cookieCount);
        }
    }
    incrementCookieCount() {
        this.game.cookieCount += 1;
        this.updateCookieCounter(this.game.cookieCount);
    }

    updateDropCounter(availableDrops) {
        this.dropCounterElement.textContent = `Drops: ${availableDrops}/6`;
    }

    updateCookieCounter(cookieCount) {
        this.cookieCounterElement.textContent = `Cookies: ${this.game.cookieCount}`;
    }

}

export { UIManager };
