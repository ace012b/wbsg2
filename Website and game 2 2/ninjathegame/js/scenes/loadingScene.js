// tworzenie sceny
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {

    
    
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;
  let text = this.add.text(gameW/6, gameH/2.8, 'Loading...', {
    font: '30px Tahoma',
    fill: '#ffffff'
  });
  text.setOrigin(-0.5, -0.8);
  text.depth = 1;
    
    
    
    
   
    
  // pokaz logo
  let logo = this.add.sprite(this.sys.game.config.width/2, 390, 'logo');

  // pasek ladowania srodek
  let bgBar = this.add.graphics();

 let barW = 250;
  let barH = 30;

  bgBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);
  bgBar.fillStyle(0xF5F5F5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  // pasek ladowania tyl
  let progressBar = this.add.graphics();
  progressBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);

  // czekaj na progres event
  this.load.on('progress', function(value){
    // czyszczenie paska ladowania
    progressBar.clear();

    // ustawienie stylu
    progressBar.fillStyle(0x808080, 1);

    // rysowanie prostokatow
    progressBar.fillRect(0, 0, value * barW, barH);

  }, this);

  // ladowanie assetow
  this.load.image('backyard', 'assets/images/backyard.jpg');
   
  

//1500

  // ladowanie paska
   for(let i = 0; i < 1000; i++) {
    this.load.image('test' + i, 'assets/images/can.png');
   }
};

loadingScene.create = function() {
 
var music = this.sound.add('musictheme', {loop: false});
    music.play();
  
    
  
    
   

  this.scene.start('Home');
};
