class Gameover extends Phaser.Scene {
    constructor() {
        super("GameoverScene");
        this.my = {sprite: {}};
        this.ENTERkey=null;
        this.ESCkey=null;
        this.rank = [];
        this.rank.push("Congrats, you are a failure!");
        this.rank.push("Excellent Job!");
        this.rank.push("welp, you tried your best..");
        this.rank.push("Isn't that what you got on the SAT aswell?");
        this.rank.push("I wont tell anyone about this score, I promise!");
        this.rank.push("Hey I got that same score on my last run!");
        this.rank.push("skIll isSuE");
        this.rank.push("O Oh, someone needs a better glasses prescription!");
        this.rank.push("I told you mallard ducks are evil!");
        this.rank.push("Give it a go again, you won't");
        this.rank.push("Not gonna lie, I'am impressed!");
        this.rank.push("The same amount in your bank account!");
        this.rank.push("Thats how much you owe in student loans");
        this.rank.push("maybe you should text her");
        this.rank.push("cope");
        this.rank.push("seethe");

    }
    create(data,data2){
        this.num = data;
        this.mode = data2;
        this.blurb = this.rank[Math.floor(Math.random()*this.rank.length)];
        this.my.sprite.background = this.add.sprite(400, 300, "stage", "bg_wood.png");
        this.my.sprite.target = this.add.sprite(400, 200, "objects", "target_red1.png");
        this.my.sprite.curtainL = this.add.sprite(65, 250, "stage", "curtain.png");
        this.my.sprite.curtainR = this.add.sprite(735, 250, "stage", "curtain.png");
        this.my.sprite.replay = this.add.sprite(135, 525, "objects", "duck_outline_target_yellow.png");
        this.my.sprite.ez =  this.add.bitmapText(200,550, 'cfont', "      RETRY\n(press ENTER)").setOrigin(0.5, 0.5);
        this.my.sprite.ez.setScale(.4);
        this.my.sprite.replay.setScale(.4);
        this.my.sprite.esc = this.add.sprite(535, 525, "objects", "duck_outline_white.png");
        this.my.sprite.no =  this.add.bitmapText(600,550, 'cfont', "    Quit\n(press ESC)").setOrigin(0.5, 0.5);
        this.my.sprite.esc.setScale(.4);
        this.my.sprite.no.setScale(.4);
        this.my.sprite.curtainR.setFlipX(true);
        this.my.sprite.curtainL.setScale(1.3);
        this.my.sprite.curtainR.setScale(1.3);
        this.my.sprite.background.setScale(3.5);
        if(typeof(this.num)!="number"){this.num = 0;}
        this.my.sprite.over = this.add.sprite(400, 300, "hud", "text_gameover.png");//text_gameover.png
        this.my.sprite.highscore = this.add.bitmapText(400,375, 'cfont', this.num).setOrigin(0.5, 0.5);
        this.my.sprite.tex = this.add.bitmapText(400,450,'cfont', this.blurb).setOrigin(0.5, 0.5);
        this.my.sprite.tex.setScale(.3);
        this.ENTERkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.ESCkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.ENTERkey.on('down',(key, event)=>{this.scene.restart('GalleryScene');this.scene.start('GalleryScene',this.mode);});
        this.ESCkey.on('down',(key, event)=>{this.scene.restart('GalleryScene');this.scene.start('TitleScene');});
        this.sound.play('laugh',{volume: 0.3});
    }
    update(){

    }
}