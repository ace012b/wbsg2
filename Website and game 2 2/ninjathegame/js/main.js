// konfiguracja gry
  let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: [bootScene, loadingScene, homeScene, gameScene, secondScene, thirdScene, ],
  title: 'Ninja the game',
    
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  }
    
};

// stworzenie gry i nadanie jej konfiguracjii 
let game = new Phaser.Game(config);
