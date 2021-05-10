var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  foodStock.set(20);
  

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(250,350,10,60);
  dog.addImage(sadDog);
  dog.scale=0.2;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  if(foodS!== undefined){
    textSize(20);
    fill(225);
    text("Note: Press Up Arrow To Feed Jakuu Milk", 50, 50);
     text("Food Remaining: "+ foodS, 150, 150);
     
   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
   }
  
   if (keyWentUp(UP_ARROW)){
     dog.addImage(sadDog);
   }
 
  if(foodS === 0){
    foodS = 20;
  }
 
   drawSprites();

  }
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
