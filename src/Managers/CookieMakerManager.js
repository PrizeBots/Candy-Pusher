// CookieMakerManager.js
class CookieMakerManager {
    constructor(game) {
        this.game = game;
        this.init();
        this.clicks = 0;
        this.clicksToMakeCookie = 8;
    }
    init() {
    }
    makeCookie(){
        this.clicks++;
        if(this.clicks >= this.clicksToMakeCookie){
            this.game.cookieCount++;
            this.clicks = 0;
            this.game.uiManager.updateCookieCounter();
        }
        console.log('CLICK!')
    }
}
export { CookieMakerManager };
