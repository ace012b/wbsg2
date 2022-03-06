// create a new scene

var bunny;
let homeScene = new Phaser.Scene('Home');

homeScene.create = function(){
  // game background input aktywny
  let bg = this.add.sprite(0, 0, 'backyard').setInteractive();
  bg.setOrigin(0, 0);

  // tekst powitalny
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;
  let text = this.add.text(gameW/1.8, gameH/2, 'Press Button', {
    font: '40px Nightmare_Hero_Normal',
    fill: '#ffffff'
  });
  text.setOrigin(0.5, 0.5);
  text.depth = 1;
    
   

  // text tlo
  let textBg = this.add.graphics();
  textBg.fillStyle(0x000000, 0.7);
  textBg.fillRect(gameW/2 - text.width/2.6 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 20);

    
    //obrazki w menu
    //this.add.image(190, 420, 'play_button');
    
    
    
    
    
    this.add.image(110, 540, 'tytul');
    
    this.cameras.main.fadeIn(1000, 0, 0, 0)
	
	
	
	//player dodanie
	this.player = this.add.sprite(550, 500, "player");
	
	//player ninja animacje
	
	this.anims.create({
      key: 'player_anim',
      frames: this.anims.generateFrameNames('player', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ]
      }),
      frameRate: 14,
      repeat: -1 ,
	  hideOnComplete: false
    });
	
	this.player.play("player_anim");
	
	
	
	
	
	
	

// ninja sprite    
    
    console.log("gotowe!");
    this.ninja=this.add.sprite(115, 115, "ninja");
    
    this.anims.create({
        key: 'parachute',
        frames: [
            { key: 'ninja',
             frame:"Glide_000.png" },  
            
            { key: 'ninja',
             frame:"Glide_001.png" },
            
             { key: 'ninja',
             frame:"Glide_002.png" },
            
             { key: 'ninja',
             frame:"Glide_003.png" },
            
             { key: 'ninja',
             frame:"Glide_004.png" },
            
             { key: 'ninja',
             frame:"Glide_005.png" },
            
             { key: 'ninja',
             frame:"Glide_006.png" },
            
             { key: 'ninja',
             frame:"Glide_007.png" },
            
             { key: 'ninja',
             frame:"Glide_008.png" },
            
            { key: 'ninja',
             frame:"Glide_009.png" },
            
            
        ],  
        frameRate: 8,
        repeat: -1
    });
    this.ninja.play("parachute");
    
    
    //ninja 2 sprite
    
    
    
    //_________________________________________
    
    
    
    
    
   
    var frameNames = this.textures.get('ninja').getFrameNames();
    console.log(frameNames);
    

    
    // wcisniecie myszki uaktywnia nastepna scene
  bg.on('pointerdown', function(){
      this.cameras.main.fade(500);
      this.time.delayedCall(1000);
    
    this.scene.start('Game');
  }, this);
    
    
 

    
    
    
    var music = this.sound.add('musictheme', {volume: 0.1}, {loop: true});
    music.play();
};

   homeScene.update = function()
{
    this.player.x -= 2;

    if (this.player.x > 850)
    {
        this.player.x = -150;
    }
    
};




