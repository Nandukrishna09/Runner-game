var playerImg,player;
var backgroundImg;
var coneImg,cone,conesGroup;
var score=0;
var invisibleGround;
var back;
var gameOverImg,gameOver;
var restartImg,restart;
var coinImg,coin,coinsGroup;
var wonImg, won;

function preload() {
playerImg=loadAnimation("player1.png","player2.png")
backgroundImg=loadImage("background.jpg")
coneImg=loadImage("cone.png")
gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
coinImg=loadImage("coin.png")
wonImg=loadImage("You Won.png")
}

function setup() {
  createCanvas(800,400);

  back=createSprite(200,200,800,200);
  back.addImage(backgroundImg)
  back.scale=0.2

  player=createSprite(100,300,50,50)
  player.addAnimation("player",playerImg)
  player.scale=0.3

   invisibleGround=createSprite(400,390,800,10);
  invisibleGround.visible=false;
  //score=0;
  conesGroup = new Group();
  coinsGroup = new Group();
}

function draw() {
  background(0);
/*
  if(cone.isTouching(player)){
    cone.destroy();
    player.destroy();
    gameOver=createSprite(400,200,50,50)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5
    restart=createSprite(400,238,50,50)
    restart.addImage(restartImg)
    restart.scale=0.1
    coin.destroy(); 
  }*/
  if(conesGroup.isTouching(player)){
    conesGroup.destroyEach();
    player.destroy();
    gameOver=createSprite(400,200,50,50)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5
    restart=createSprite(400,238,50,50)
    restart.addImage(restartImg)
    restart.scale=0.1
    coinsGroup.destroyEach();
  }

  if(coinsGroup.isTouching(player)){
    score=score+1
    coinsGroup.destroyEach();
  }
   
  if(score === 5){
    won=createSprite(400,200,50,50)
    won.addImage(wonImg)
    won.scale=0.3
    player.destroy()
    coinsGroup.destroyEach();
    conesGroup.destroyEach();
  }
  if(keyDown("space")){
    player.velocityY=-14
  }

  if(back.x<100) {
    back.x=400
  }
  //console.log(back.x)
  player.velocityY = player.velocityY+0.5

  back.velocityX=-5

  player.collide(invisibleGround)
  spawnCoins();
  swpanObstacles();

  drawSprites();

  fill("black")
  textSize(20);
  text("Score:"+ score,270,30)
}

function spawnCoins(){
  if(frameCount % 80===0 ) {
    coin=createSprite(700,Math.round(random(280,70)),10,10);
    coin.addImage(coinImg)
    coin.scale=0.1
    coin.velocityX=-3
    coinsGroup.add(coin)
  } 
}

function swpanObstacles(){
  if(frameCount % 100 ===0){
    cone=createSprite(700,350,50,50)
    cone.addImage(coneImg)
    cone.scale = 0.2;
    cone.velocityX=-5
    conesGroup.add(cone)
  }
 
}