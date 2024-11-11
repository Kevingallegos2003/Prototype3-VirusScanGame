class Gameover extends Phaser.Scene {
    constructor() {
        super("GameoverScene");
        this.my = {sprite: {}};

    }
    create(){
        this.my.sprite.background = this.add.sprite(400, 300, "error");
        this.my.sprite.background.setScale(2);
        this.ENTERkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.ENTERkey.on('down',(key, event)=>{this.scene.restart('GalleryScene');this.scene.start('GalleryScene');});
        
        // closest fix ive found https://phaser.discourse.group/t/scene-change-error/12706/11
        // im too sleepy to try any of this out at the moment sorry
    }
    update(){

    }
}