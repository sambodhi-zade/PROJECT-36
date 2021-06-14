//Create variables here
var dog,dogImg,happyDogImg,database,foodS,foodStock;
var foodObj;
var fedTime, lastFed, feed, addFood;
function preload()
{
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png")
	//load images here
}

function setup() {
  database= firebase.database()
  createCanvas(900,400);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed=createButton("Feed the dog");
  feed.position(650,115);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(760,115);
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime')
fedTime.on("value", function (data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);

if(lastFed >= 12){
  text("Last Feed: " + lastFed %12 + "PM",350, 30);
}
else if(lastFed == 0){
  text("Last Feed: 12AM ", 350,30);
}
else{
  text("Last Feed: " + lastFed + "AM", 350,30);
}


  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}





