// tworzenie nowej sceny
let bootScene = new Phaser.Scene('Boot');

bootScene.preload = function() {
  this.load.image('logo', 'assets/images/xlogo.png');
  this.load.audio('loadingscreen', 'assets/audio/loadingscreen.mp3');
    this.load.audio('musictheme', 'assets/audio/musictheme.mp3');
    
    
    
    
    this.load.image('tytul', 'assets/images/tytul.png');
	
    this.load.atlas("ninja", "assets/json/ninja.png", "assets/json/ninja.json");
	
   
    this.load.image('barrel', "assets/images/barrel.png")
    
	
	//player
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 38,
    frameHeight: 45,
    margin: 1,
    spacing: 0.2
  });

    
};

bootScene.create = function() {
    

  
  this.scene.start('Loading');
};
