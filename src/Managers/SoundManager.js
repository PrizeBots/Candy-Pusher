// SoundManager.js
class SoundManager {
    constructor(game) {
        this.game = game;
        this.initSound();
    }
    initSound() {
        this.game.wallMoveSound = new BABYLON.Sound("wallMove", "../assets/sound/wallMove.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.wallMoveFinishSound = new BABYLON.Sound("wallMoveFinish", "../assets/sound/wallMoveFinish.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
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
        //Get Sounds
        this.game.get1Sound = new BABYLON.Sound("get1", "../assets/sound/get1.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.get2Sound = new BABYLON.Sound("get2", "../assets/sound/get2.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.get3Sound = new BABYLON.Sound("get3", "../assets/sound/get3.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.get4Sound = new BABYLON.Sound("get4", "../assets/sound/get4.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.get5Sound = new BABYLON.Sound("get5", "../assets/sound/get5.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
        this.game.get6Sound = new BABYLON.Sound("get6", "../assets/sound/get6.mp3", this.scene, {
            autoplay: false,
            volume: 1,
            loop: false
        });
    }
}
export { SoundManager };
