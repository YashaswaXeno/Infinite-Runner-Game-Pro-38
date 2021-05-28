var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0; 
var score = 0
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");

}

function setup() {  
  canvas = createCanvas(980,660);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (10);

  spaceShip = createSprite(250,500);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;

  
  
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    
    

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    
    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("orange");
    fill("red");
    textSize(40);
    text("I Guess You weren't fit for the Mission",canvas.width/2-400,canvas.height/2);
    text("Focus Commander, Focus",canvas.width/2-400,canvas.height/2+100);
  // text("Press R to go back to Story "+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    stroke("green");
    fill("cyan");
    textFont("trebuchetMS")
    textSize(50);
    text("--------The Dead End--------",canvas.width/2-400,canvas.height/2-250);
    text("Let The Mission Begin!",canvas.width/2-300,canvas.height/2+100);
    stroke("red");
    fill("red");
    textSize(35);
    textFont("Apple Chancery");
    text("The Year is 2500 ",canvas.width/2-300,canvas.height/2-220);
    text(" Your Mission is to travel through the infinite space",canvas.width/2-300, canvas.height/2 - 185);
    text("And Find Your Lost Crewmates",canvas.width/2-290,canvas.height/2-155);
    text("Travel through the infinite Space Maze",canvas.width/2-300,canvas.height/2-118);
    text("And Remember, Try To Find Your Crew",canvas.width/2-300,canvas.height/2-80);
    text("Mission: Lehetetlen",canvas.width/2-300,canvas.height/2-30);
    text("  Press 'S' to Start Game.",canvas.width/2,canvas.height/2-10);
    
    
    
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function asteroids() {
  if(frameCount % 80 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (12);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.5,0.6);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,180);
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,160);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,190)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}