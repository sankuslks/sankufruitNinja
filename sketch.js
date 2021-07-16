//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knifeMusic,gameOmusic

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //load sound here
  knifeMusic = loadSound("knifeSwoosh.mp3")
  gameOmusic = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);


  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
   
    fruits();
    Monster();
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    monsterGroup.velocityX = -(8+(score/10))
    fruitGroup.velocityX = -(9+(score/4))
    
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score+2
      knifeMusic.play();
    }
    else
    {
      
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        score=0
        gameOmusic.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
      
        
        
        knife.addImage(gameOverImage);
        knife.scale=3;
        knife.x=300;
        knife.y=300;
      
      }
    }
  }
 
 
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
  
  drawSprites();
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    
    monsterGroup.add(monster);
  }
}


function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
   
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     
       
         
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }
}