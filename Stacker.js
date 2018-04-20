var canvas = document.getElementById('mainGame');
var context = canvas.getContext('2d');

var gameStarted = false;
var interval;
var keys = [];
//para movimiento
var friction = 0.8;
//jump
var gravity = 0.98;
var meteoros = [];
var positionRandom;
var frames = 0;

//background
function Board(){
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.img = new Image();
  this.img.src = "assets/forest.png"
  this.score = 0; 
  this.music = new Audio();
  this.music.src = "assets/Anamanaguchi_-_Airbrushed_Summer_2010_Singles_-_Week_1_i0EC4vV7PoE.mp3"


  this.img.onload = function(){
      this.draw();
  }.bind(this);

  this.draw = function(){
      context.drawImage(this.img, this.x, this.y, this.width, this.height);

      
  }

  this.drawScore = function(){
      this.score = Math.floor(frames/ 60);
      context.font = "50px Arial Black";
      context.fillStyle = "darkblue";
      context.fillText(this.score, this.width/2,this.y+40);
  }
}

//player
var Player = function() {
	this.x= 5;
	this.y= canvas.height - 50;
	this.width= 20;
	this.height= 20;
	this.speed= 5;
	this.velX= 0;
	this.velY= 0;
  this.color= "blue";
  this.img= new Image();
  this.img2 = new Image();
  this.img.src= "assets/ninja.png";
  this.img2.src = "assets/ninjaReverse.png";
  this.direction = true;
  this.chosenImage = this.img;
  //jump
  this.jumping= false;
  this.jumpStrength= 7;
  //collition
  this.grounded=  false;
	this.draw= function(){
		// context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.chosenImage, this.x,this.y,30,30); 
  }
  this.isTouching = function(meteoro){
    return (this.x < meteoro.x + meteoro.width)&&
           (this.x + this.width > meteoro.x)&&
           (this.y < meteoro.y + meteoro.height)&&
           (this.y + this.height > meteoro.y);
  }
}

var player = new Player();
player.draw();

var Meteoro = function(x){
this.x = x;
this.y = 0;
this.height = 10;
this.width = 10;
this.img = new Image();
this.img.src = "assets/meteoro.png"
this.draw = function(){
  this.y++;
  context.drawImage(this.img,this.x,this.y,this.width,this.height);
}
}

function gameOver(){
  stop();
  context.font = "120px Avenir";
  context.strokeStyle = "red";
  context.lineWidth = 8;
  context.strokeText("Game Over",700,400);
  context.font = "50px Avenir";
  context.fillStyle = "red";
  context.fillText('press R to start', 700, 500)
}

function stop(){
  clearInterval(interval);
  interval = 0;
}

function checkCollition(){
  meteoros.forEach(function(meteoro){
    if(player.isTouching(meteoro)) gameOver();
  })
}

function random (num){
  return Math.floor((Math.random()*num)+1);
}

function generateMeteors(){
  if(!(frames%10)==0) return;
  positionRandom = random(canvas.width);
  var meteoro = new Meteoro(positionRandom);
  var meteoro2 = new Meteoro(positionRandom);
  meteoros.push(meteoro);
  meteoros.push(meteoro2);
}

function drawMeteors(){
  meteoros.forEach(function(meteoro){
    meteoro.draw();
  })
}

var tablero = new Board();
//platforms
var platforms = [];
var platform_width = 120;
var platform_height = 17;
//primer pared
platforms.push({
  x:0.2,
  y: 0,
  width: 20,
  height: canvas.height
});




//plataforma 1a
platforms.push({
  x:90,
  y: canvas.height - 50,
  width: platform_width,
  height: platform_height
});
//plataforma 1b
platforms.push({
  x:2,
  y: canvas.height - 100,
  width: platform_width,
  height: platform_height
});
//plataforma 2a
platforms.push({
  x:90,
  y: canvas.height - 150,
  width: platform_width,
  height: platform_height
});
//plataforma 2b
platforms.push({
  x:2,
  y: canvas.height - 200,
  width: platform_width,
  height: platform_height
});
//plataforma 3a
platforms.push({
  x:90,
  y: canvas.height - 250,
  width: platform_width,
  height: platform_height
});
//plataforma 3b
platforms.push({
  x:2,
  y: canvas.height - 300,
  width: platform_width,
  height: platform_height
});
//plataforma 4a
platforms.push({
  x:90,
  y: canvas.height - 350,
  width: platform_width,
  height: platform_height
});
//plataforma 4b
platforms.push({
  x:2,
  y: canvas.height - 400,
  width: platform_width,
  height: platform_height
});
//plataforma 5a
platforms.push({
  x:90,
  y: canvas.height - 450,
  width: platform_width,
  height: platform_height
});
//plataforma 5b
platforms.push({
  x:2,
  y: canvas.height - 500,
  width: platform_width,
  height: platform_height
});
//segunda pared
platforms.push({
  x:200,
  y: 100,
  width: 10,
  height: canvas.height - 100
});
//plataforma 5c
platforms.push({
  x:210,
  y: canvas.height - 50,
  width: platform_width-50,
  height: platform_height
});
//plataforma 5d
platforms.push({
  x:290 ,
  y: canvas.height - 100,
  width: platform_width,
  height: platform_height
});
//plataforma 4c
platforms.push({
  x:210,
  y: canvas.height - 150,
  width: platform_width-50,
  height: platform_height
});
//plataforma 4d
platforms.push({
  x:290 ,
  y: canvas.height - 200,
  width: platform_width,
  height: platform_height
});
//plataforma 3c
platforms.push({
  x:210,
  y: canvas.height - 250,
  width: platform_width-50,
  height: platform_height
});
//plataforma 3d
platforms.push({
  x:290,
  y: canvas.height - 300,
  width: platform_width,
  height: platform_height
});
//plataforma 2c
platforms.push({
  x:210,
  y: canvas.height - 350,
  width: platform_width-50,
  height: platform_height
});
//plataforma 2d
platforms.push({
  x:290 ,
  y: canvas.height - 400,
  width: platform_width,
  height: platform_height
});
//plataforma 1c
platforms.push({
  x:210,
  y: canvas.height - 450,
  width: platform_width-50,
  height: platform_height
});
//plataforma 1d
platforms.push({
  x:290 ,
  y: canvas.height - 500,
  width: platform_width,
  height: platform_height
});
//tercer pared
platforms.push({
  x:400,
  y: 0,
  width: 10,
  height: canvas.height - 100
});

//plataforma 1e
platforms.push({
  x:490,
  y: canvas.height - 550,
  width: platform_width-50,
  height: platform_height
});
//plataforma 2e
platforms.push({
  x:420,
  y: canvas.height - 250,
  width: platform_width-50,
  height: platform_height
});
//plataforma 3e
platforms.push({
  x:685,
  y: canvas.height - 100,
  width: platform_width-50,
  height: platform_height
});
//plataforma 4e
platforms.push({
  x:510,
  y: canvas.height - 135,
  width: platform_width-50,
  height: platform_height
});
//plataforma 5e
platforms.push({
  x:590,
  y: canvas.height - 320,
  width: platform_width-50,
  height: platform_height
});
//plataforma 6e
platforms.push({
  x:570,
  y: canvas.height - 210,
  width: platform_width-50,
  height: platform_height
});
//plataforma 7e
platforms.push({
  x:490,
  y: canvas.height - 450,
  width: platform_width-50,
  height: platform_height
});
//plataforma 8e
platforms.push({
  x:680,
  y: canvas.height - 420,
  width: platform_width-50,
  height: platform_height
});
//plataforma 9e
platforms.push({
  x:690,
  y: canvas.height - 580,
  width: platform_width-50,
  height: platform_height
});
//cuarta pared
platforms.push({
  x:800,
  y: 100,
  width: 10,
  height: canvas.height - 100
});
//plataforma 1f
platforms.push({
  x:800,
  y: canvas.height - 500,
  width: platform_width+140,
  height: platform_height+20
});
//plataforma 1.1f
platforms.push({
  x:850,
  y: 100,
  width: 10,
  height:  100
});
//plataforma 1.2f
platforms.push({
  x:900,
  y: 100,
  width: 10,
  height:  100
});
//plataforma 1.3f
platforms.push({
  x:950,
  y: 100,
  width: 10,
  height:  100
});
//plataforma 1.4f
platforms.push({
  x:1000,
  y: 100,
  width: 10,
  height:  100
});
//plataforma 1.5f
platforms.push({
  x:1050,
  y: 100,
  width: 10,
  height:  100
});
//plataforma 2f
platforms.push({
  x:950,
  y: canvas.height - 300,
  width: platform_width+130,
  height: platform_height+20
});
//plataforma 2.1f
platforms.push({
  x:950,
  y: canvas.height - 400,
  width: 10,
  height:  100
});
//plataforma 2.2f
platforms.push({
  x:1000,
  y: canvas.height - 400,
  width: 10,
  height:  100
});
//plataforma 2.3f
platforms.push({
  x:1050,
  y: canvas.height - 400,
  width: 10,
  height:  100
});
//plataforma 2.4f
platforms.push({
  x:1100,
  y: canvas.height - 400,
  width: 10,
  height:  100
});
//plataforma 2.5f
platforms.push({
  x:1150,
  y: canvas.height - 400,
  width: 10,
  height:  100
});
//plataforma 3f
platforms.push({
  x:800,
  y: canvas.height - 100,
  width: platform_width+140,
  height: platform_height+20
});
//plataforma 3.1f
platforms.push({
  x:850,
  y: canvas.height - 200,
  width: 10,
  height:  100
});
//plataforma 3.2f
platforms.push({
  x:900,
  y: canvas.height - 200,
  width: 10,
  height:  100
});
//plataforma 3.3f
platforms.push({
  x:950,
  y: canvas.height - 200,
  width: 10,
  height:  100
});
//plataforma 3.4f
platforms.push({
  x:1000,
  y: canvas.height - 200,
  width: 10,
  height:  100
});
//plataforma 3.5f
platforms.push({
  x:1050,
  y: canvas.height - 200,
  width: 10,
  height:  100
});
//quinta pared
platforms.push({
  x:1200,
  y: 0,
  width: 10,
  height: canvas.height - 100
});
//sexta pared
platforms.push({
  x:1490,
  y: 100,
  width: 10,
  height: canvas.height - 100
});
//plataforma end1
platforms.push({
  x:1200,
  y: canvas.height - 150,
  width: platform_width,
  height: platform_height
});
//plataforma end2
platforms.push({
  x:1200,
  y: canvas.height - 190,
  width: platform_width,
  height: platform_height
});
//plataforma end3
platforms.push({
  x:1390,
  y: canvas.height - 290,
  width: platform_width,
  height: platform_height
});
//plataforma end4
platforms.push({
  x:1390,
  y: canvas.height - 330,
  width: platform_width,
  height: platform_height
});
//plataforma end5
platforms.push({
  x:1200,
  y: canvas.height - 430,
  width: platform_width,
  height: platform_height
});
//plataforma end6
platforms.push({
  x:1200,
  y: canvas.height - 470,
  width: platform_width,
  height: platform_height
});
//plataforma endzone
platforms.push({
  x:1390,
  y: 90,
  width: platform_width,
  height: platform_height
});
//plataforma endzone
platforms.push({
  x:1390,
  y: 130,
  width: platform_width,
  height: platform_height
});
//techo
platforms.push({
  x:0,
  y:0.2,
  width:canvas.width,
  height:5
});
//base
platforms.push({
  x:0,
  y:canvas.height-50,
  width:canvas.width,
  height:platform_height + 50
});


document.body.addEventListener("keydown", function(event){

	if(event.keyCode == 13 && !gameStarted){
		startGame();
	}
  //para movimiento
  keys[event.keyCode] = true;

});
//para movimiento
document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
});

intro_screen();



function intro_screen(){
	context.font = "50px Impact";
	context.fillStyle = "#000000";
	context.textAlign = "center";
	context.fillText("Ninja-pocalypse", canvas.width/2, canvas.height/2);

	context.font = "20px Arial";
	context.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);
}

function startGame(){
	gameStarted = true;
	clearCanvas();

	interval = setInterval(function(){
		clearCanvas();
		loop();
	}, 1000/60)
}

//platforms
function drawPlatforms(){
  context.fillStyle = "#333333";
  platforms.forEach(platform=>{
    context.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function loop(){
  
  tablero.draw();
  drawPlatforms();
  
  if(player.direction){
    player.chosenImage = player.img
  }else{
    player.chosenImage = player.img2
  }
  player.draw();
  if(frames%20 === 0) generateMeteors();
  drawMeteors();
  checkCollition();
  
  //tablero.drawScore();
  
  //jump
  if(keys[38] || keys[32]){
    if(!player.jumping){
      player.velY = -player.jumpStrength*2;
      //player.velY -=10;
      player.jumping = true;
    }
  }
  
  //movimiento
  if(keys[39]){
    if(player.velX < player.speed){
      player.velX++;
      player.direction = true;
    }
  }
  if(keys[37]){
    if(player.velX > -player.speed){
      player.velX--
      player.direction = false;
    }
  }
  //jump
  player.y += player.velY;
  player.velY += gravity;
  //movimiento
  player.x += player.velX;
  player.velX *=friction;
  //boundaries
  //if(player.y >= canvas.height - player.height){
    //player.y = canvas.height - player.height;
    //player.jumping = false;
  //}
	//console.log('game running');
  
  //collition
  player.grounded = false;
  gravity = .98;
  platforms.forEach(platform=>{
    var direction = collisionCheck(player, platform);
    if(direction == "left" || direction == "right"){
      player.velX = 0;
      // gravity = 0.2;  
    }else if(direction == "bottom"){
      player.jumping = false;
      player.grounded = true;
    } else if(direction == "top"){
      //player.velY *= -1
    }
  });
  
  if(player.grounded){
    player.velY = 0;
  }
  frames++;
  console.log(frames);
} //loop

function collisionCheck(char, plat){
  var vectorX = (char.x + (char.width/2)) - (plat.x + (plat.width/2));
  var vectorY = (char.y + (char.height/2)) - (plat.y + (plat.height/2));
  
  var halfWidths = (char.width/2) + (plat.width/2);
  var halfHeights = (char.height/2) + (plat.height/2);
  
  var collisionDirection = null;
  
  if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){
    var offsetX = halfWidths - Math.abs(vectorX);
    var offsetY = halfHeights - Math.abs(vectorY);
    if(offsetX < offsetY){
      if(vectorX > 0){
        collisionDirection = "left";
        char.x += offsetX;
      }else{
        collisionDirection = "right";
        char.x -= offsetX;
      }
    }else{
      if(vectorY > 0){
        collisionDirection = "top";
        char.y += offsetY;
      }else{
        collisionDirection = "bottom";
        char.y -= offsetY;
      }
    }
  }
  return collisionDirection;
  
}

function clearCanvas(){
	context.clearRect(0, 0, 1500, 700);
}