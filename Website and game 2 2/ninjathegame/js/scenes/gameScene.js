// tworzenie nowej sceny
var gameScene = new Phaser.Scene('Game');

// miejsce na parametry sceny
gameScene.init = function() {

  // parametry gracza
  this.playerSpeed = 150;
  this.jumpSpeed = -600;
    
this.gameOver = false;
    
};


//_________________________________________________________________________________
// funkcja preload



gameScene.preload = function() {

    
    
  // ladowanie obrazu
  this.load.image('background', 'assets/images/background.jpg');
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('block', 'assets/images/block.png');
  this.load.image('goal', 'assets/images/gorilla4.png');
  this.load.image('goal3', 'assets/images/gorilla3.png');
  this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('tree', 'assets/images/tree_3.png');
    this.load.image('sign', 'assets/images/Sign_2.png');
    this.load.image('Bush4', 'assets/images/Bush4.png');

    this.load.audio('skokaudio', 'assets/audio/casa.mp3');
    this.load.audio('trafienie', 'assets/audio/hit.mp3');
	
    
  // ladowanie gracza i przeszkody stalej jako klatki
    
   
  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 38,
    frameHeight: 45,
    margin: 1,
    spacing: 0.2
  });

  this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', {
    frameWidth: 35,
    frameHeight: 50,
    margin: 1,
    spacing: 15
  });
    
    
    
    
    
    
//mapa z json
    
  this.load.json('levelData', 'assets/json/levelData.json');
};




// __________________________________________________________________
// funkcja stworz
gameScene.create = function() {

	
	this.cameras.main.fadeIn(1000, 0, 0, 0)
	
     //DODANIE BACKGROUNDU
    
    let bg = this.add.sprite(0,0, 'background');
    
    this.add.image(380, 1708, 'tree');
    this.add.image(50, 1758, 'sign');
    this.add.image(330, 1758, 'Bush4');
    
      //origin
    
    bg.setOrigin(0 ,0);
    
   
     if(!this.anims.get('walking')) {
    // animacja chodzenia
      
      
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('player', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ]
      }),
      frameRate: 14,
      yoyo: true,
      repeat: -1
    });
     
  }
    
// animacja ognia
  if(!this.anims.get('burning')) {
    
    this.anims.create({
      key: 'burning',
      frames: this.anims.generateFrameNames('fire', {
        frames: [ 0, 1, 2, 3,]
      }),
      frameRate: 8,
      repeat: -1
    });
  }

    
    


    
    //____________________________________________
  // dodawanie wsztystkich elementow
    
    
  this.setupLevel();

  // wlacz spawner 
  this.setupSpawner();

  // detekcja kolizji
  this.physics.add.collider([this.player, this.goal,  this.goal3,  this.barrels], this.platforms);
    
  
	

  // overlap sprawdzenie
  this.physics.add.overlap(this.player, [this.fires,  this.barrels]);
    
   this.physics.add.overlap(this.player, [this.fires, this.barrels], this.livesCouter, null , this);
    
    //wygrana
   this.physics.add.overlap(this.player, this.goal3, this.nextScene, null , this);

    
    

 
  // wlaczenie kursora
  this.cursors = this.input.keyboard.createCursorKeys();

  this.input.on('pointerdown', function(pointer) {
    console.log(pointer.x, pointer.y);
  });
    
    
   

    
    //dzwieki movementu
    this.jumpSound = this.sound.add("skokaudio");
    this.hitSound = this.sound.add("trafienie");
	
    
    //score
   this.score = 100;
   this.scoreText = this.add.text(100, 1816, 'Health '+ this.score, { fontSize: '12px', fill: '#000' });
   
	
	//next
	this.next = 0;
	
   
    
};



//______________________________________________________________________________


// wykonywane w kazdej klatce
gameScene.update = function() {
  // jezeli gracz jest na podlozu
  let onGround = this.player.body.blocked.down || this.player.body.touching.down;
	

  // ruch w lewo
  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-this.playerSpeed);
    this.player.flipX = false;

    // odtworz animacje jesli gracz sie nie porusza
    if (onGround && !this.player.anims.isPlaying)
      this.player.anims.play('walking');
      
  }

  // ruch w prawo
  else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);
    
    this.player.flipX = true;

    // odtworz animacje jesli gracz sie nie porusza
    if (onGround && !this.player.anims.isPlaying)
      this.player.anims.play('walking');
  } else {
    // gracz sie zatrzyma
    this.player.body.setVelocityX(0);

    // zatrzymaj animacje ruchu
    this.player.anims.stop('walking');

    // wyznacz podstawowa klatke
    if (onGround)
      this.player.setFrame(0);
  }

    
	
    
  // zatrzymaj skok podczas braku ruchu
  if (onGround && (this.cursors.space.isDown || this.cursors.up.isDown)) {
    // nadanie predkosci graczowi na osi y
    this.player.body.setVelocityY(this.jumpSpeed);
      this.jumpSound.play();
      
      //skok
    
    // zatrzymaj animacje ruchu
    this.player.anims.stop('walking');

    // zmien klatke
    this.player.setFrame(0);
  }
    

     
    //sledzenie gracza przez text
	this.scoreText.x = this.player.body.position.x - 10;
	this.scoreText.y = this.player.body.position.y - 30;
	
    	
	if (this.next === 1){
			alert ("Level 2!") ; 
		
			this.scene.stop('Game');
		    this.scene.start('SEC');
		} 
			
	
	
	//przegrana
    if (this.score === 0){
   alert ("Przegrales!, sprobuj ponownie") ; 
		this.scene.restart();
	   };
       
     
};







// ustawienia elementow poziomu
gameScene.setupLevel = function() {

  // ladowanie plikow json
  this.levelData = this.cache.json.get('levelData');

  // granice swiata
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 1920;

  // tworzenie platform
  this.platforms = this.physics.add.staticGroup();
  for (let i = 0; i < this.levelData.platforms.length; i++) {
    let curr = this.levelData.platforms[i];

    let newObj;

    // tworzenie obiektu
    if(curr.numTiles == 1) {
      // create sprite
      newObj = this.add.sprite(curr.x, curr.y, curr.key).setOrigin(0);
    }
    else {
      // tworzenie tilesprite
      let width = this.textures.get(curr.key).get(0).width;
      let height = this.textures.get(curr.key).get(0).height;
      newObj = this.add.tileSprite(curr.x, curr.y, curr.numTiles * width , height ,curr.key).setOrigin(0);
    }

    // wlaczenie fizyki
    this.physics.add.existing(newObj, true);

    // dodanie do grupy
    this.platforms.add(newObj);
  }
    
 
    

  // tworzenie przeszkody
  this.fires = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  for (let i = 0; i < this.levelData.fires.length; i++) {
    let curr = this.levelData.fires[i];

    let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0);

    // animacja przeszkody
    newObj.anims.play('burning');

    // dodanie do grupy
    this.fires.add(newObj);

    // do ustawiania kursora w celu poznania pozycji obiektu
    newObj.setInteractive();
    this.input.setDraggable(newObj);
  }

  // do tworzenia poziomu, wyswietlenie pozycji obiektu
  this.input.on('drag', function(pointer, gameObject, dragX, dragY){
    gameObject.x = dragX;
    gameObject.y = dragY;

    console.log(dragX, dragY);

  });

  // gracz
  this.player = this.add.sprite(this.levelData.player.x, this.levelData.player.y, 'player', 3);
  this.physics.add.existing(this.player);

  // kolidowanie gracza z granica swiata
  this.player.body.setCollideWorldBounds(true);

  // granice kamery
  this.cameras.main.setBounds(0, 0, 460, 1920 );
  this.cameras.main.startFollow(this.player);


  // cel
  this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal');
  this.physics.add.existing(this.goal);
    
    
    
	//cel3
    this.goal3 = this.add.sprite(this.levelData.goal3.x, this.levelData.goal3.y, 'goal3');
    
  this.physics.add.existing(this.goal3);
	
};

//wygrana!!!
gameScene. Winn = function(){
	alert ("Wygrales!!"),
	
	this.scene.restart();
	
	
	
	
};







gameScene.restartGame = function(targetSprite, sourceSprite){
   
     
    
      //efekt trzesienia kamery
    this.cameras.main.shake(100);
    
    //po ukonczeniu efektu restart sceny
    this.cameras.main.on('camerashadeoutcomplete', function(camera, effect){
    // restart the scene
    this.scene.restart();
        
        
  }, this);
    
  // efekt przyciemnienia kamery
    
  this.cameras.main.fade(500);


  // po ukonczeniu efektu restart sceny
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
      
    // restart calosciowy sceny
    this.scene.restart();
  }, this);
    
};

gameScene.livesCouter = function()
{
    this.cameras.main.shake(300);
    this.score -=1 ;
    this.scoreText.setText('Health ' + this.score);    
	this.hitSound.play();
    this.restartGame = true;
	
};

gameScene.nextScene = function()
{
	this.next += 1;
	
	
	
	
};


// generowanie przeszkody z fizyka
gameScene.setupSpawner = function(){
  // barrel group
  this.barrels = this.physics.add.group({
    bounceY: 0.1,
    bounceX: 1,
    collideWorldBounds: true
  });

  // spawning przeszkody z fizyka
  let spawningEvent = this.time.addEvent({
    delay: this.levelData.spawner.interval,
    loop: true,
    callbackScope: this,
    callback: function(){
      // stworzenie przeszkody z fizyka
      let barrel = this.barrels.get(this.goal.x, this.goal.y, 'barrel');

        let barrelSpeed = 5;
        
      //obrot przeszkody z fizyka  
this.time.addEvent({
delay: 0,
repeat: -1,
callbackScope: this,
callback: function() {
if(barrel.body.blocked.right)
    
{
barrelSpeed = -5;
}
if(barrel.body.blocked.left)
{
barrelSpeed = 5;
}
barrel.angle += barrelSpeed;
}
});
        
        
        //reaktywacja 
        barrel.setActive(true);
        barrel.setVisible(true);
        barrel.body.enable = true;
        
      // wlasciwosci przeszkody
      barrel.setVelocityX(this.levelData.spawner.speed);

        console.log(this.barrels.getChildren().lenght);
        
      // czas/ duracja przeszkody
      this.time.addEvent({
        delay: this.levelData.spawner.lifespan,
        repeat: 0,
        callbackScope: this,
        callback: function(){
          this.barrels.killAndHide(barrel);
            barrel.body.enable = false;
			
			
	
			
        }
      });
    }
  });
};




