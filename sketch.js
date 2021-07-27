var person , person_running;
var soap, soapImage;
var sanitizer, sanitizerImage;
var vaccine, vaccineImage;
var corona, coronaImage;
var scoreGroup, coronaGroup;
var score = 0;
var ground, ground2;
var gameState = "serve";
var survivalTime = 0;
var house, houseImage;
var healthCare;
var hospital, hospitalImage
var home, homeImage;
var chance = 0;

function preload(){
  
  person_running = loadAnimation("moving_man_1.png","moving_man_2.png","moving_man_3.png","moving_man_4.png","moving_man_5.png","moving_man_6.png");
  
  hospitalImage = loadImage("hospital.png")
  soapImage = loadImage("soap.png");
  sanitizerImage = loadImage("sanitizer.png");
  vaccineImage = loadImage("vaccine.png");
  coronaImage = loadImage("corona.png");
  houseImage = loadImage("house.png");
  homeImage = loadImage("home.png")
}



function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(300, 360, 600, 5);  
  ground2 = createSprite(600, 360, 600, 5);
  
  person = createSprite(50, 290, 20, 20);
  person.addAnimation("running", person_running);
  person.setCollider("rectangle", 5, 0, 220, 30, 90);
  person.scale = 0.5;

  hospital = createSprite(300, 275, 600, 525);
  hospital.addImage("hospital", hospitalImage);
  hospital.visible = false;
  
  home = createSprite(300, 275, 600, 525);
  home.addImage("home", homeImage);
  home.visible = false;
  
  house = createSprite(650, 265, 40, 50);
  house.addImage("house", houseImage);
  house.visible = false;
  house.scale = 0.5;
  
  scoreGroup = new Group();
  coronaGroup = new Group();
}
 

function draw() {
  background("lightblue");
  
  if(gameState === "serve"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Press P to Play", 175, 200);
  }
  
  if(gameState === "serve" && keyDown ("P")){
    gameState = "play";
    chance = chance+1;
  }
  
  if(gameState === "play"){
        
    ground.velocityX = -(6+3 * score/4);
  
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    if(ground.x<0){
  
      ground.x = ground.width/2;
    }
  
  ground2.velocityX = -(6+3 * score/4);
  
    if(ground2.x<300){
  
      ground2.x = ground2.width/2;
    }
  
    person.collide(ground);
  
    if(keyWentDown("space") && person.y >= 300) {
      person.velocityY = -20;
    }
  
  if(scoreGroup.isTouching(person)){
    
    scoreGroup.destroyEach();
    score = score+2;
  }
  
  if(coronaGroup.isTouching(person)){
    
    person.visible = false;    
    gameState = "end";
    ground.visible = false;
    coronaGroup.destroyEach();
    scoreGroup.destroyEach();
    ground2.visible = false;
  }
  
  //add gravity
  person.velocityY = person.velocityY +1.2;
    
    if(survivalTime === 1730){
      house.visible = true;
      house.velocityX = -(6+3 * score/4);
      healthCare.visible = false;
      healthCare.velocityX = 0;
      corona.visible = false;
      corona.velocityX = 0;
    }
          
    if(house.isTouching(person) && score<50){
      person.visible = false;  
      house.destroy();
      gameState = "over";
      ground.visible = false;
      coronaGroup.destroyEach();
      scoreGroup.destroyEach();
      ground2.visible = false;
    }
    
    if(house.isTouching(person) && score>=50){
      gameState = "win";
      person.visible = false;
      house.destroy();
      coronaGroup.destroyEach();
      scoreGroup.destroyEach();
      ground.visible = false;
      ground2.visible = false;
    }
      
  spawnHealthCare();
  spawnCorona();
  }
  else if(gameState === "end"){
    
     stroke("red");
     fill("red");
     textSize(30);
     text("You Are Infected", 200, 30);
     text("Press R to Restart", 185, 60);
     hospital.visible = true;
    
     if(gameState === "end" && keyWentDown("R")){
       gameState = "play";
       hospital.visible = false;
       ground.visible = true;
       ground2.visible = true;
       
       score = 0;
       survivalTime = 0;
       
       chance = chance+1;
       
       respawn();
     }
  }
  
  else if(gameState === "over"){
    
     stroke("red");
     fill("red");
     textSize(23);
     text("You reached home but you didn't collect the sufficient,", 10, 30);
     text("number of soaps, sanitizers and injections on your", 10, 60);
    text("              way as a result you are infected!", 10, 90);
    textSize(30);
    text("Press R to", 20, 540);
    text("Restart", 40, 570)
    
    hospital.visible = true;
    
    if(gameState === "over" && keyWentDown("R")){
       gameState = "play";
       hospital.visible = false;
       ground.visible = true;
       ground2.visible = true;
       
       score = 0;
       survivalTime = 0;
       
       chance = chance+1;
       
       respawn();
     }
  }
  
  
  else if(gameState === "win"){
     
     stroke("red");
     fill("red");
     textSize(30);
     text("You Are Safe Now!", 175, 30);
     text("Press R to Restart", 185, 60);
     
     home.visible = true;
    
     if(gameState === "win" && keyWentDown("R")){
       gameState = "serve";
       home.visible = false;
       ground.visible = true;
       ground2.visible = true;
       
       score = 0;
       survivalTime = 0;
       
       chance = 0;
       
       respawn();
     }
    }
    
    stroke("red");
    fill("red");
    textSize(30);
    text("Survival Time : "+survivalTime, 200, 500);
    text("Score : "+score, 250, 580);
    text("Chance : "+chance, 240, 540);
    drawSprites();
}

function spawnHealthCare(){

  if(World.frameCount%100 === 0){
    
   healthCare = createSprite(600, Math.round(random(100, 120)), 20, 20);
    
    var rand = Math.round(random(1,3));
    switch (rand){
        
      case 1: healthCare.addAnimation("soap", soapImage);
              break;      
      case 2: healthCare.addAnimation("sanitizer", sanitizerImage);
              break;
      case 3: healthCare.addAnimation("vaccine", vaccineImage);
              break;
  
      default: break;
    }
   healthCare.scale = 0.2;
   healthCare.velocityX = -(6+3*score/3); 
   healthCare.lifetime = 650;
   scoreGroup.add(healthCare);
  }
}

function spawnCorona(){

  if(World.frameCount%100 === 0){
    
   corona = createSprite(600, 310, 10, 10);
   corona.scale = 0.2;
   corona.setCollider("circle", 0, 0, 180);
   corona.addImage(coronaImage);
   corona.velocityX = -(6+3 * score/4); 
   corona.lifetime = 650;
   coronaGroup.add(corona);
  }
}

function respawn(){
  person = createSprite(50, 290, 20, 20);
  person.addAnimation("running", person_running);
  person.setCollider("rectangle", 5, 0, 220, 30, 90);
  person.scale = 0.5;
  
  ground = createSprite(300, 360, 600, 5);  
  ground2 = createSprite(600, 360, 600, 5);
  
  house = createSprite(650, 265, 40, 50);
  house.addImage("house", houseImage);
  house.visible = false;
  house.scale = 0.5;
  
  if(survivalTime === 1730){
      house.visible = true;
      house.velocityX = -(6+3 * score/4);
      healthCare.visible = false;
      corona.visible = false;
    }
  }