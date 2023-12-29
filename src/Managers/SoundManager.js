// SoundManager.js
class SoundManager {
    constructor(game) {
        this.game = game;
        this.initSound();
    }
    initSound() {
        this.game.clickSound = new BABYLON.Sound("click", "../assets/sound/click.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.thudSound = new BABYLON.Sound("thud", "../assets/sound/thud.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.getSound = new BABYLON.Sound("get", "../assets/sound/get.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.getTreatSound = new BABYLON.Sound("get", "../assets/sound/getTreat.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.dropTreatSound = new BABYLON.Sound("get", "../assets/sound/dropTreat.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.dropTreat2Sound = new BABYLON.Sound("get", "../assets/sound/dropTreat2.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.poofSound = new BABYLON.Sound("get", "../assets/sound/poof.mp3", this.scene, {
            autoplay: false,
            volume: .5,
            loop: false
        });
    }
}
export { SoundManager };
