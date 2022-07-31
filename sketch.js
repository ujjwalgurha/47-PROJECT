var manImage,lionImage,hammerImage,forestImage,eagleImage;
var manSprite,lionSprite,hammerSprite,forestSprite,eagleSprite;
var hammer;
var enemySprite;
var enemyGroup;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{


forestImage = loadImage("bg2.jpeg");
hammerImage = loadImage("hammer.png");
lionImage = loadImage("LION.png");
manImage = loadImage("thor.gif");
eagleImage= loadImage("eagle.png");	 
}

function setup() {
	createCanvas(windowWidth,windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
forestSprite = createSprite(800,425); 
forestSprite.addImage(forestImage);
forestSprite.scale= 1.2;

manSprite = createSprite(250,580); 
manSprite.addImage(manImage);
manSprite.scale= 2;	   

 
//hammerSprite = createSprite(250,580); 
//hammerSprite.addImage(hammerImage);
	   
hammerGroup =createGroup();
enemyGroup =createGroup();


//lionSprite = createSprite(700,580); 
//lionSprite.addImage(lionImage);
 	   

//eagleSprite = createSprite(700,200); 
//eagleSprite.addImage(eagleImage);
 	   	



	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
 enemy();



  if(keyDown("UP_ARROW")){
	manSprite.y-=7;
	 
	}
	
	if(keyDown("DOWN_ARROW")){
	  manSprite.y+=7;
	  
	}

	if(keyDown("space")){
		spawnHammer();
	}
	if(hammerGroup.isTouching(enemyGroup)){
		enemyGroup.destroyEach();
		hammerGroup.destroyEach();
		}
		if(manSprite.isTouching(enemyGroup))
		{
		  manSprite.destroy();
		  enemyGroup.destroyEach();
		  //hammerGroup.setLifetimeEach(-1);
		
		}
 
  drawSprites();
 


}

function enemy(){


	if(frameCount%100===0){
	  
	  
	enemySprite=createSprite(1600,Math.round(random(50,700)),50,50)
	enemySprite.velocityX=-5;
	
	
	
	var rand=Math.round(random(1,2))
	switch(rand){
	  case 1 : enemySprite.addImage(lionImage); 
			   enemySprite.scale= 1;
			   break;
			   
	  case 2: enemySprite.addImage(eagleImage);
			  enemySprite.scale= 1;
			  break;   
			  	  
	  default: break;       
	}
	enemyGroup.add(enemySprite);
	}
	 
}
for(i=0;i<enemyGroup.length;i=i+1){
      
	if(hammerGroup.isTouching(enemyGroup.get(i))){
	  //score=score+1;
	  enemyGroup.get(i).destroy();
	  hammerGroup.destroyEach();
  
	      
	}
  }
   
  

	 
function spawnHammer(){
	if(frameCount%30===0){
	hammer=createSprite(200,1000);
	hammer.addImage(hammerImage)
	hammer.scale =0.8;
	hammer.y= manSprite.y;
	hammer.velocityX =10;
	hammerGroup.add(hammer); 
	hammer.lifetime=1000 
	manSprite.depth =hammer.depth;
	manSprite.depth+=1;
	}
}
