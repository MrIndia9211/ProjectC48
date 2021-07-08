var bgimg;
var player, ply_running;
var invisibleground;
var zombie;
var corimg, corGroup;
var boy_jump;
var coin_run, coinGroup;
var gameState = "begin";
var score = 0;
var gameimg, restartimg;
var gameOver, restart;
var jumpSound, dieSound, bonusSound, resetSound;
var corImg,corona,corDead;
var posimg,pos;
var win,winimg;


function preload() {
    bgimg = loadImage("images/backgroung.png")
    ply_running = loadAnimation("images/p1.png", "images/p2.png", "images/p3.png", "images/p4.png")
    corimg = loadImage("images/c3.png")
    boy_jump = loadAnimation("images/p5.png", "images/p6.png", "images/p7.png")
    coin_run = loadAnimation("images/coin 1.png", "images/coin 3.png", "images/coin 4.png")
    gameimg = loadImage("images/gameOver .png")
    restartimg = loadImage("images/restart.png")
    boy_down = loadAnimation("images/p8.png")
    cor_Img = loadAnimation("images/ca.png","images/ca (1).png","images/ca (2).png");
    corDead=loadImage("images/p5.png")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("dies.mp3")
    bonusSound = loadSound("n.mp3")
    resetSound = loadSound("t.mp3")
    posimg=loadImage("images/p.png");
    winimg=loadImage("images/win.png")


}
function setup() {
    createCanvas(1100, 670);
    backgrounds = createSprite(670, 390);
    backgrounds.addImage(bgimg);
    backgrounds.scale = 2;
    backgrounds.velocityX = -4


    player = createSprite(400, 650, 40, 80);
    player.addAnimation("running", ply_running);
    player.addAnimation("jumping", boy_jump);
    player.addAnimation("down", boy_down)
    player.scale = 1.2

    corona = createSprite(190, 500, 40, 80);
    corona.addAnimation("cor",cor_Img );
    corona.scale = 0.4;
   

    corGroup = createGroup();
    coinGroup = createGroup();
    brigeGroup = createGroup();
    obstacleGroup = createGroup();
   

    invisibleground = createSprite(390, 670, 1800, 10);
    invisibleground.visible = false;

    gameOver = createSprite(530, 350, 10, 70);
    gameOver.addImage(gameimg);

    gameOver.visible = false;
    restart = createSprite(670, 350, 10, 70);
    restart.addImage(restartimg)
    restart.scale = 0.2;
    restart.visible = false;

    player.setCollider("rectangle", 0, 0);
    player.debug = false

    win = createSprite(370, 360);
    win.addImage(winimg);
    win.scale = 1.2
    win.visible = false;

}

function draw() {

    background(0)
    drawSprites()
    if (gameState === "Play") {
        player.visible = true;
        corona.visible = true;
        stroke("black");
        textSize(20);
        fill("black");
        text("[[CORONA COMBACT]]  ", 780, 60);
        

        if (keyDown("Up_Arrow") && player.y >= 300) {
            player.velocityY = -15

            player.changeAnimation("jumping", boy_jump);
            jumpSound.play();

        }
        if (keyDown("Down_Arrow") && player.y >= 100) {
            player.velocityY = 20
        }


        if (player.isTouching(invisibleground)) {
            player.changeAnimation("running", ply_running);

        }
        player.velocityY = player.velocityY + 0.3

        if (backgrounds.x < 0) {
            backgrounds.x = 550
        }

        player.collide(invisibleground);
        cor();
        spawnCoin();



        if (player.isTouching(corGroup)) {
            gameState = "end"
            dieSound.play()

        }
        if (player.isTouching(coinGroup)) {
            coinGroup.destroyEach();
            score = score + 3
            bonusSound.play();

        }

        stroke("red");
        textSize(30);
        fill("yellow");
        text("Coin:" + score, 750, 120)
}

if (score > 200) {
    
    gameState ="win"
      }

if (gameState === "begin") {
    background(posimg)
    stroke("black");
    textSize(40);
    fill("lightgreen");
    text("[CORONA COMBACT]  ", 280, 120);
    stroke("black");
    textSize(30);
    fill("red");
  

    text("1.Your City was in trouble Try to protect your city from this disease. ", 120, 340);
    text("2.Collect 200 coins to defeat this disease and protect your city .", 120, 380)
    text("3. if obstacle touch your Player you die and TRY TRY DONOT CRY.", 120, 420)
    text("4. This game story is based on a real  disease [CORONA]..", 120, 460)
    text("5. Press Up Arrow for player jump and DownArrow to come down . ", 120, 500)
    text("6. For start the game press S. ", 120, 550);
   

    if (keyDown("S")) {
        gameState = "Play"
    }
}
    else if (gameState === "end") {
        gameOver.visible = true;
        restart.visible = true;
        backgrounds.velocityX = 0;
        player.velocityY = 0;
        player.changeAnimation("down", boy_down);
        corGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        corGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);

        stroke("black");
        textSize(20);
        fill("black");
        text("[[CORONA COMBACT]]  ", 780, 60);

        if (mousePressedOver(restart)) {
            reset()
            resetSound.play();
        }
        player.visible = false;
        stroke("red");
        textSize(30);
        fill("yellow");
        text("Coin:" + score, 750, 120)
        stroke("red");
            textSize(30);
            fill("red");
            text("Oh!! you donot Protect your city from this disease ##Try Try## ", 90, 90)
    }


    if (gameState === "win") {
        corona.visible = false;
        corGroup.visible = false;
        coinGroup.visible = false;
        restart.visible = true;
        backgrounds.velocityX = 0;
        player.velocityY=0 
        player.visible = false;
        corGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        corGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);

       
        win.visible=true
        if (mousePressedOver(restart)) {
            reset();
            resetSound.play();
        }
        stroke("red");
        textSize(30);
        fill("red");
        text("Wow!! you Protect your city from this disease ", 100, 100)
        
        stroke("red");
        textSize(30);
        fill("yellow");
        text("Coin:" + score, 750, 120)
        stroke("black");
        textSize(20);
        fill("black");
        text("[[CORONA COMBACT]]  ", 780, 60);}
  
}
  

function cor() {
    if (frameCount % 450 === 0) {
        var cor = createSprite(800, 610, 30, 80);
        cor.addImage(corimg)
        cor.velocityX = -6
        cor.lifetime = 390;
        cor.scale=0.6
        corGroup.add(cor)
    }
    if(score>100){
        cor.velocityX = -8 
    }
    

}

function spawnCoin() {
    if (frameCount % 200 === 0) {
        var coin = createSprite(700, 610, 30, 80);
        coin.y = Math.round(random(100, 500))
        coin.addAnimation("coin", coin_run);
        coin.velocityX = -3;
        coin.lifetime = 390;
      
        coinGroup.add(coin);
    }
}


function reset() {
    gameState = "Play";
    gameOver.visible = false;
    restart.visible = false;
    player.changeAnimation("running", ply_running);
    win.visible=false;
    corGroup.destroyEach();
    coinGroup.destroyEach();
    backgrounds.velocityX = -2;
    score = 0

}


