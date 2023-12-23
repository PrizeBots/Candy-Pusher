// UIManager.js
class UIManager {
    constructor() {
        this.cookieCount = 100; // Initialize with starting cookie count

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
        this.updateCookieCounter(0);
    }
    decrementCookieCount() {
        if (this.cookieCount > 0) {
            this.cookieCount -= 1;
            this.updateCookieCounter(this.cookieCount);
        }
    }
    incrementCookieCount() {
        console.log("Current cookie count:", this.cookieCount);
        this.cookieCount ++;
        console.log("New cookie count:", this.cookieCount);
        this.updateCookieCounter(this.cookieCount);
    }

    updateDropCounter(availableDrops) {
        this.dropCounterElement.textContent = `Drops: ${availableDrops}/6`;
    }

    updateCookieCounter(cookieCount) {
        this.cookieCounterElement.textContent = `Cookies: ${cookieCount}`;
    }
    
}

export { UIManager };
