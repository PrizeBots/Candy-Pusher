// UIManager.js
class UIManager {
    constructor() {
        // Create drop counter element and append it to the body
        this.dropCounterElement = document.createElement('div');
        this.dropCounterElement.id = 'dropCounter';
        this.dropCounterElement.style.position = 'absolute';
        this.dropCounterElement.style.top = '10px';
        this.dropCounterElement.style.left = '50%';  // Center horizontally
        this.dropCounterElement.style.transform = 'translateX(-50%)'; // Adjust for center alignment
        this.dropCounterElement.style.color = 'white';
        this.dropCounterElement.style.fontSize = '20px';
        document.body.appendChild(this.dropCounterElement);

        this.cookieCounterElement = this.createUIElement('cookieCounter', 'Cookies: 0', '10px', '10px');

        
        this.updateDropCounter(6); // Initialize with the max number of drops
    }

    updateDropCounter(availableDrops) {
        this.dropCounterElement.textContent = `Drops: ${availableDrops}/6`;
    }
}

export { UIManager };
