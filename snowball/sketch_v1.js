var snowmanX = 200;
var easing = 0.1;
var limit;
var targetX;
var dx;
var carrotFrame = 4;
var heartFrame = 0;
var carrots = [];
var hearts = [];
var balls = [];
var clouds = [];

function preload() {
    //these URLs preload the loading carrot
    var filenamesC = [];
    filenamesC[0] = "https://i.imgur.com/qepItjw.png";
    filenamesC[1] = "https://i.imgur.com/WrRwOgn.png";
    filenamesC[2] = "https://i.imgur.com/IaGv051.png";
    filenamesC[3] = "https://i.imgur.com/788iMwW.png";
    filenamesC[4] = "https://i.imgur.com/L46EZ7S.png";

    //loads the images into the carrots[] array
    for (var i = 0; i < filenamesC.length; i++) {
        carrots[i]= loadImage(filenamesC[i]); //load each frame...
    }

    //loads the images into the hearts[] array
    var filenamesH = [];
    filenamesH[0] = "https://i.imgur.com/awWteaR.png"
    filenamesH[1] = "https://i.imgur.com/vw1d2oU.png"
    filenamesH[2] = "https://i.imgur.com/aBUC5GV.png"
    filenamesH[3] = "https://i.imgur.com/zBHIG8D.png"

    for (var j = 0; j < filenamesH.length; j++) {
        hearts[j]= loadImage(filenamesH[j]); //load each frame...
    }
}

function setup() {
    createCanvas(480,640);
}

function draw() {
    //background gradient
    var a = color(160, 232, 229);
    var b = color(238, 252, 251);
    backGradient(0, width, a, b);


    updateCloud();
    removeCloud();
    addCloud();

    updateBalls();
    removeBalls();
    addBalls();

    //draw carrot nose
    drawCarrot();

    //draw snowman
    drawSnowman();


    //separator
    fill(255);
    stroke(130, 232, 229);
    strokeWeight(4);
    rect(20, 75, 70, 350, 35, 35, 35, 35);

    //draw ice
    drawIce();

    //draw carrot icon
    imageMode(CENTER);
    image(carrots[carrotFrame], 55, 350, 80, 80);

    //draw heart icons
    image(hearts[heartFrame], 55, 170, 120, 240);
}

function backGradient (y, x, a, b) { //background gradient color
    for (var i = y; i <= height; i++) {
      var mid = map(i, y, y+x, 0, 1);
      var c = lerpColor(a, b, mid);
      stroke(c);
      strokeWeight(2);
      line(y, i, y+x, i);
	}
}

function drawSnowman() {
    limit = constrain(mouseX, 125, 450); //limits within the canvas
    targetX = limit; //easing the snowman to mouse
    dx = targetX - snowmanX;
    snowmanX += dx * easing;

    fill(255);
    strokeWeight(3);
    stroke(230);
    //body
    ellipse(snowmanX, height-80, 50, 50);
    //head
    ellipse(snowmanX, height-115, 30, 30);
}

function drawCarrot() {
    //limits within the canvas
    limit = constrain(mouseX, 125, 450);
    //easing the carrot to mouse
    targetX = limit;
    dx = targetX - snowmanX;
    snowmanX += dx * easing;

    fill(255, 181, 51);
    strokeWeight(2);
    stroke(255, 110, 51);
    triangle(snowmanX-5, height-125, snowmanX+5, height-125, snowmanX, height-145);
}

function drawIce() {
    fill(215, 255, 255);
    strokeWeight(5);
    stroke(175, 250, 250);
    rect(-5, height-55, width+10, 60);
    //the lines on the ice
    for(var i = 0; i < 16; i++) {
        strokeWeight(4);
        line(0 + (i*30), height-55, 20 + (i*30), height-45);
        line(15 + (i*30), height-55, 50 + (i*30), height-35);
    }
}

//updates the clouds so they move and show
function updateCloud(){
  for (var i = 0; i < clouds.length; i++){
    clouds[i].move();
    clouds[i].display();
  }
}

//gets rid of clouds that pass the screen
function removeCloud(){
  var cloudsKeep = [];
  for (var i = 0; i < clouds.length; i++){
    if (clouds[i].x + clouds[i].breadth > 0){
      cloudsKeep.push(clouds[i]);
    }
  }
  clouds = cloudsKeep;
}

//adds clouds at a random interval, replacing the ones that are removed
function addCloud(){
  var newCloudPercent = 0.1;
  if (random(0,1) < newCloudPercent){
    var cloudX = width;
    var cloudY = random(height/1.2);
    clouds.push(makeClouds(width));
  }
}

//adds velocity to the clouds, making them move
function cloudMove(){
  this.x += this.speed;
}

//this is the things that make the cloud
function displayCloud(){
  var cloudHeight = 5;
  var cHeight = this.nCloud*cloudHeight;

  noStroke();
  fill(255, this.opaque);
  push();
  translate(this.x, height/1.15);
  ellipse(0, -cHeight, this.breadth, cHeight/1.5);
  pop();
  push();
  translate(this.x, height/1.15+40);
  ellipse(30, -cHeight, this.breadth, cHeight);
  pop();
}

//these are the parameters for the clouds
function makeClouds(cloudX, cloudY) {
	var cloud = {x: cloudX,
				y: cloudY,
				breadth: random(50, 100),
				speed: -random(1, 3),
				nCloud: round(random(10,23)),
				opaque: random(80, 90),
				move: cloudMove,
				display: displayCloud}
	return cloud;
}

//updates the balls so they move and show
function updateBalls(){
  for (var i = 0; i < balls.length; i++){
    balls[i].move();
    balls[i].display();
  }
}

//gets rid of balls that pass the screen
function removeBalls(){
  var ballsKeep = [];
  for (var i = 0; i < balls.length; i++){
    if (balls[i].x + balls[i].breadth > 0){
      ballsKeep.push(balls[i]);
    }
  }
  balls = ballsKeep;
}

//adds balls at a random interval, replacing the ones that are removed
function addBalls(){
  var newBallPercent = 0.2;
  if (random(0,1) < newBallPercent){
    var ballX = width;
    var ballY = random(height/1.2);
    balls.push(makeBalls(width));
  }
}

//adds velocity to the balls, making them move
function ballsMove(){
  this.x += this.speed;
}

//these are the things that make the balls
function displayBalls(){
  var ballsHeight = 5;
  var bHeight = this.nBalls*ballsHeight;

  noStroke();
  fill(255, this.opaque);
  push();
  translate(this.x, height/1.15);
  ellipse(0, -bHeight, this.breadth, bHeight/1.5);
  pop();
  push();
  translate(this.x, height/1.15+40);
  ellipse(30, -bHeight, this.breadth, bHeight);
  pop();
}

//these are the parameters for the balls
function makeBalls (ballX, ballY) {
	var ball = {x: ballX,
				y: ballY,
				breadth: random(50, 100),
				speed: -random(1, 3),
				nBalls: round(random(10,23)),
				opaque: random(80, 90),
				move: ballsMove,
				display: displayBalls}
	return ball;
}
