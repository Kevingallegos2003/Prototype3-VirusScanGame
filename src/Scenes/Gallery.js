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
        this.scanChargeTimer = 0;
        this.scanTimer = 0;
        //this.num = 0;
    }
    preload(){
        this.load.setPath("./assets/");

        this.load.image("bar", "BAR.png");
        this.load.image("bg", "Bliss.webp");
        // this.load.image("bg", "WALL.png"); // Old Background
        this.load.image("duck_yellow", "duck1.png");
        this.load.image("duck_brown", "duck2.png");
        this.load.image("duck_brownV", "duck2V.png");
        this.load.image("duck_yellowV", "duck1V.png");
        this.load.image("error", "error.png");
        this.load.image("pop", "poperr.png");
        this.load.bitmapFont('cfont', "supercomics_0.png", "supercomics.fnt");

    }
    create(){
        document.getElementById('description').innerHTML = "Use SPACE to scan the files<br>CLICK on files that are safe!<br>Press ENTER to play again"
        let my = this.my;
        this.mode = 900;
        this.scan = false;
        my.sprite.bg = (this.add.sprite(400, 300, "bg"));
        my.sprite.bg.setScale(.6);
        my.sprite.Bar = (this.add.sprite(400, 300, "bar"));
        my.sprite.Bar.setScale(1);
        this.dhit.push('quack1');this.dhit.push('quack2');this.dhit.push('quack3');
        this.points = 0;
        this.tick = 0;
        my.sprite.score = this.add.bitmapText(10, 30, 'cfont', "Pc Integrity",40);
        my.sprite.highscore = this.add.bitmapText(250,20, 'cfont', this.points);    
        my.sprite.score.setScale(.8);
        my.sprite.highscore.setScale(.8);
        my.sprite.charge = this.add.bitmapText(625, 500, 'cfont', "Scanner:\n"+this.timer+"%" ,40);
        my.sprite.scanIndicator = this.add.bitmapText(20, 525, 'cfont', "" ,40);
        this.bulletSpeed = 8;
        this.duckbulletspeed = 10;
        this.duckSpeed = 5;
        this.randomz = 90;
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log("create!");

    }
    update(){
        let my = this.my;
        if (this.scanChargeTimer < 100){
            this.scanChargeTimer += 2; // Change the increase speed to tweak game feel (how long player waits to scan again)
            my.sprite.charge.setText("Scanner:\n"+this.scanChargeTimer+"%");
        }
        if (this.scanTimer >= 75) { // Change the max value to tweak game feel (how long the scanner stays on for)
            this.scan = false;
            this.scanTimer = 0;
        }
        if (this.scan == true){
            this.scanTimer++;
            my.sprite.scanIndicator.setText("Scanning...");
            // my.sprite.scanIndicator.setText("Scanning... debug:"+this.scanTimer);
        } else {
            my.sprite.scanIndicator.setText("");
        }
        this.num = Math.floor(Math.random() * this.randomz) + 1;
        this.rndx = Math.floor(Math.random() * 700) + 1;
        this.rndy = Math.floor(Math.random() * 500) + 1;
        if(this.points<0){this.scene.start('GameoverScene');}
        for (let duck of my.sprite.duck) {
            duck.on('pointerdown', () => {
                console.log("clicked duck, virus? -> ", duck.virus);
                if(duck.virus){
                    my.sprite.pop = this.add.sprite(this.rndx, this.rndy, "pop");
                    my.sprite.pop.setScale(.3);
                    this.points-=1;
                }
                else{this.points+=1;}
                my.sprite.highscore.setText(this.points);
                duck.x = game.config.width+70;
                this.scan = false;
            });
        }
        if (this.num == 30) { 
            console.log("SPAWN DUCK");
            //console.log(my.sprite.duck.length);
            // Are we under our bullet quota?
            if (my.sprite.duck.length < this.maxDucks) {
                let d = this.add.sprite(-50, 150, "duck_yellow").setInteractive();
                d.virus = this.virus();
                my.sprite.duck.push(d);
            }
        }
        if (this.num == 29) { 
            console.log("SPAWN EDUCK");
            //console.log(my.sprite.duck.length);
            // Are we under our bullet quota?
            if (my.sprite.educk.length < 7) {
                let d = this.add.sprite(850, 300, "duck_brown").setInteractive();
                d.virus = this.virus();
                my.sprite.educk.push(d
                );
            }
        }
        for (let educk of my.sprite.educk) {
            educk.setFlipX(true);
            if(this.scan && educk.virus){
                let chance = Math.floor(Math.random() * 3) + 1;
                if(chance%2==0){educk.setTexture('duck_brownV');}
            }
            educk.x -= this.duckSpeed+2;
            if(!this.scan){
                educk.setTexture('duck_brown');
            }
        }
        for (let duck of my.sprite.duck) {
            if(this.scan && duck.virus){
                let chance = Math.floor(Math.random() * 3) + 1;
                if(chance%2==0){duck.setTexture('duck_yellowV');}
            }
            duck.x += this.duckSpeed;
            if(!this.scan){
                duck.setTexture('duck_yellow');
            }
        }
        for (let duck of my.sprite.educk) {
            duck.on('pointerup', () => {
                console.log("clicked educk, virus? -> ", duck.virus);
                if(duck.virus){
                    my.sprite.pop = this.add.sprite(this.rndx, this.rndy, "pop");
                    my.sprite.pop.setScale(.3);
                    this.points-=1;
                }
                else{this.points+=1;}
                my.sprite.highscore.setText(this.points);
                duck.x = 70-game.config.width;
                this.scan = false;
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (this.scanChargeTimer >= 100){
                console.log("scan!");
                this.scan = true;
                this.scanChargeTimer = 0;
                this.scanTimer = 0;
        }
        }
        my.sprite.duck = my.sprite.duck.filter((duck) => duck.x < game.config.width+60);
        my.sprite.educk = my.sprite.educk.filter((duck) => duck.x > -50);
 
    }
    virus(){
        let chance = Math.floor(Math.random() * 4) + 1;
        if(chance%4==0){return true;}else{return false;}

    }
}