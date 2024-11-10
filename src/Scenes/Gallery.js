class Gallery extends Phaser.Scene {
    constructor() {
        super("GalleryScene");
        this.my = {sprite: {}};
        this.bodyX = 300;
        this.bodyY = 600;
        this.Akey=null;
        this.Dkey=null;
        this.space=null;
        this.my.sprite.bullet = [];
        this.my.sprite.duck = [];
        this.my.sprite.educk = [];
        this.my.sprite.ebullet = [];
        this.maxBullets = 10;
        this.maxDucks = 10;
        this.dhit = [];
        //this.num = 0;
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

        //this.load.image("bullet", "icon_bullet_silver_short.png");

    }
    create(data){
        let my = this.my;
        this.mode = data;
        console.log(this.mode);
        this.dhit.push('quack1');this.dhit.push('quack2');this.dhit.push('quack3');
        this.my.sprite.background = this.add.sprite(400, 300, "stage", "bg_blue.png");
        my.sprite.cloud = this.add.sprite(200, 250, "stage", "cloud1.png");
        my.sprite.cloud = this.add.sprite(600, 75, "stage", "cloud2.png");
        this.my.sprite.curtainL = this.add.sprite(65, 250, "stage", "curtain.png");
        this.my.sprite.curtainR = this.add.sprite(735, 250, "stage", "curtain.png");
        my.sprite.tree = this.add.sprite(130, 445, "stage", "tree_oak.png");
        my.sprite.tree2 = this.add.sprite(500, 410, "stage", "tree_pine.png");
        this.my.sprite.floor = this.add.sprite(400, 950, "stage", "bg_green.png");
        this.my.sprite.curtainR.setFlipX(true);
        this.my.sprite.curtainL.setScale(1.3);
        this.my.sprite.curtainR.setScale(1.3);
        my.sprite.tree.setScale(.5);
        my.sprite.tree2.setScale(.8);
        this.my.sprite.curtainL.depth = 2;
        this.my.sprite.curtainR.depth = 2;
        this.my.sprite.background.setScale(3.5);
        this.my.sprite.floor.setScale(3.5);

        this.points = 0;
        this.tick = 0;
        this.lives = 3;
        //my.sprite.hearts.push((this.add.sprite(750, 50, "heart")).depth =3);
        my.sprite.heart = (this.add.sprite(720, 50, "heart")).depth = 3;
        my.sprite.score = this.add.sprite(80, 50, "hud", "text_score.png");
        my.sprite.score.depth = 3;
        my.sprite.player = this.add.sprite(this.bodyX, this.bodyY, "objects", "rifle.png");
        my.sprite.highscore = this.add.bitmapText(170,20, 'cfont', this.points);    
        my.sprite.highscore.setScale(.8);
        my.sprite.health = this.add.bitmapText(670,20,'cfont', this.lives);
        my.sprite.health.depth = 3;
        my.sprite.health.setText(this.lives);//WHY THO?
        my.sprite.player.setScale(.5);
        my.sprite.score.setScale(.8);
        this.playerSpeed = 8;
        this.bulletSpeed = 8;
        this.duckbulletspeed = 10;
        this.duckSpeed = 5;
        this.randomz = 90;
        //my.sprite.curtain = this.add.sprite(this.bodyX, this.bodyY, "scribble", "character_squareGreen.png");
        //my.sprite.bullet;
        //my.sprite.bullet = this.add.sprite(this.bodyX, this.bodyY, "scribble", "item_spear.png");
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log("create!");
    }
    update(){
        let my = this.my;
        this.tick += 1;
        //console.log(this.tick);
        if(this.tick == this.mode){
            console.log("speed up!");
            this.tick = 0;
            this.duckbulletspeed += 3;
            this.duckSpeed += 2;
            this.maxDucks += 1;
            this.bulletSpeed += 1;
            if(this.randomz > 30){this.randomz-=10;}
        }
        this.num = Math.floor(Math.random() * this.randomz) + 1;
        if(this.lives == 0){this.scene.start("GameoverScene", this.points+0,this.mode);}
        //console.log(this.num);
        if (this.Akey.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.player.x > (my.sprite.player.displayWidth/2)) {
                my.sprite.player.x -= this.playerSpeed;
            }
        }
        if (this.Dkey.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.player.x < (game.config.width - (my.sprite.player.displayWidth/2))) {
                my.sprite.player.x += this.playerSpeed;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            //console.log(my.sprite.bullet.length);
            // Are we under our bullet quota?
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/2), "hud","icon_bullet_silver_short.png")
                );
            }
        }
        // Make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }
        for (let duck of my.sprite.duck) {
            for (let bullet of my.sprite.bullet) {
                if (this.collides(duck, bullet)) {
                    //console.log("collides!");
                    bullet.y = -100;
                    this.points += 100;
                    this.sound.play(this.dhit[Math.floor(Math.random()*this.dhit.length)], {volume: 0.3});
                    my.sprite.highscore.setText(this.points);
                    duck.x = game.config.width+70;
                }
            }
        }
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        if (this.num == 30) { 
            //console.log("SPAWN DUCK");
            //console.log(my.sprite.duck.length);
            // Are we under our bullet quota?
            if (my.sprite.duck.length < this.maxDucks) {
                my.sprite.duck.push(this.add.sprite(
                    -50, 150, "objects","duck_yellow.png")
                );
            }
        }
        if (this.num == 29) { 
            //console.log("SPAWN DUCK");
            //console.log(my.sprite.duck.length);
            // Are we under our bullet quota?
            if (my.sprite.educk.length < 7) {
                my.sprite.educk.push(this.add.sprite(
                    850, 300, "objects","duck_brown.png")
                );
            }
        }
        for (let educk of my.sprite.educk) {
            educk.setFlipX(true);
            educk.setScale(.8);
            educk.x -= this.duckSpeed+2;
            //console.log(Math.floor(educk.x/100)+20);
            if(this.num == Math.floor(educk.x/100)){
                if(my.sprite.ebullet < 8){
                    //console.log("fire duck!");
                    my.sprite.ebullet.push(this.add.sprite(
                    educk.x, educk.y, "hud","icon_bullet_gold_short.png")
                    );
                    this.sound.play('shoot',{volume: 0.3});
                }
            }
        }
        for (let bull of my.sprite.ebullet) {
            bull.setFlipY(true);
            //console.log("moving ebull!");
            bull.y += this.duckbulletspeed;
        }
        for (let duck of my.sprite.duck) {
            duck.x += this.duckSpeed;
        }
        for (let duck of my.sprite.educk) {
            for (let bullet of my.sprite.bullet) {
                if (this.collides(duck, bullet)) {
                    //console.log("collides!");
                    bullet.y = -100;
                    this.points -= 200;
                    if(this.points < 0){this.points = 0;}
                    my.sprite.highscore.setText(this.points);
                    duck.x = 70-game.config.width;
                }
            }
        }
        for (let bullet of my.sprite.ebullet) {
            if (this.collides(bullet, my.sprite.player)) {
                //console.log("collides!");
                bullet.y = 651;
                this.lives-=1;
                my.sprite.health.setText(this.lives);
            }
        }
        my.sprite.ebullet = my.sprite.ebullet.filter((ebullet) => ebullet.y < 650);
        my.sprite.duck = my.sprite.duck.filter((duck) => duck.x < game.config.width+60);
        my.sprite.educk = my.sprite.educk.filter((duck) => duck.x > -50);
 

    }
    collides(a, b) {
        //console.log(Math.abs(a.x - b.x));
        //console.log(Math.abs(a.y - b.y));
        //if(Math.abs(a.x - b.x) > 80 && Math.abs(a.y - b.y) > 80) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}