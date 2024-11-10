class Title extends Phaser.Scene {
    constructor() {
        super("TitleScene");
        this.my = {sprite: {}};
        this.Ukey=null;
        this.Ikey=null;
        this.Okey=null;
        this.my.sprite.duck = [];
        this.my.sprite.educk = [];
        this.mode = 0;
        this.tick = 0;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("heart", "heart.png");
        this.load.atlasXML("hud", "spritesheet_hud.png", "spritesheet_hud.xml");
        this.load.atlasXML("objects", "spritesheet_objects.png", "spritesheet_objects.xml");
        this.load.atlasXML("stage", "spritesheet_stall.png", "spritesheet_stall.xml");
        this.load.bitmapFont('cfont', "supercomics_0.png", "supercomics.fnt");
        this.load.audio('quack1', "quack1.wav");
        this.load.audio('quack2', "quack2.wav");
        this.load.audio('quack3', "quack3.wav");
        this.load.audio('shoot', "shoot.wav");
        this.load.audio('laugh', "laugh.mp3");
    }
    create(){
        let my = this.my;
        this.Ukey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.Ikey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.Okey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.Ukey.on('down',(key, event)=>{
            this.mode = 900;
            this.scene.restart('GalleryScene');this.scene.start('GalleryScene',this.mode);});
        this.Ikey.on('down',(key, event)=>{
            this.mode = 600;
            this.scene.restart('GalleryScene');this.scene.start('GalleryScene',this.mode);});
        this.Okey.on('down',(key, event)=>{
            this.mode = 150;
            this.scene.restart('GalleryScene');this.scene.start('GalleryScene',this.mode);});
        this.my.sprite.background = this.add.sprite(400, 300, "stage", "bg_blue.png");
        this.my.sprite.background.setScale(3.5);
        my.sprite.duk = this.add.sprite(500, 50, "objects", "duck_target_yellow.png");
        my.sprite.duk.setScale(.8);
        my.sprite.duk = this.add.sprite(300, 120, "objects", "duck_target_brown.png");
        my.sprite.duk.setScale(.7);
        my.sprite.cloud = this.add.sprite(200, 250, "stage", "cloud1.png");
        my.sprite.cloud = this.add.sprite(600, 75, "stage", "cloud2.png");
        my.sprite.title =  this.add.bitmapText(400,100, 'cfont', "KOOKY\n   DUCKS").setOrigin(0.5, 0.5);
        my.sprite.easy = this.add.sprite(200, 400, "objects", "target_red2.png");
        my.sprite.normal = this.add.sprite(400, 400, "objects", "target_red1.png");
        my.sprite.hard = this.add.sprite(600, 400, "objects", "target_colored.png");
        my.sprite.ez =  this.add.bitmapText(200,500, 'cfont', "   EASY\n(press U)").setOrigin(0.5, 0.5);
        this.my.sprite.ez.setScale(.4);
        my.sprite.ez =  this.add.bitmapText(400,500, 'cfont', " Normal\n(press I)").setOrigin(0.5, 0.5);
        this.my.sprite.ez.setScale(.4);
        my.sprite.ez =  this.add.bitmapText(600,500, 'cfont', "  KOOKY\n(press O)").setOrigin(0.5, 0.5);
        this.my.sprite.ez.setScale(.4);
        document.getElementById('description').innerHTML = '<h2>KOOKY DUCKS by Kevin Gallegos, assets from Kenny Assets<br>How to Play:<br>Move - A/D keys<br>Shoot - SPACEBAR<br>Shoot the yellow ducks for points while you avoid shooting the Mallard Ducks<br>as shooting them takes points(They also fight back....), you have 3 lives, good luck!<br>and stay kooky!</h2>'


    }
    update(){
        let my = this.my;
        this.tick += 1;
        //console.log(this.tick);
        if(this.tick == 60){
            console.log(my.sprite.duck.length);
            this.tick = 0;
            my.sprite.duck.push(this.add.sprite(50, 800, "objects","duck_yellow.png"));
            my.sprite.educk.push(this.add.sprite(750, -50, "objects","duck_brown.png"));
        }
        for (let duck of my.sprite.duck) {
            duck.y -= 3;
        }
        for (let duck of my.sprite.educk) {
            duck.setFlipX(true);
            duck.y += 3;
        }
        my.sprite.educk = my.sprite.educk.filter((duck) => duck.y < 650);
        my.sprite.duck = my.sprite.duck.filter((duck) => duck.y > -(duck.displayHeight/2));



    }
}