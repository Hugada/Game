var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext('2d');
var tablero = new Board();
var stacks = [new Stack(1), new Stack(2), new Stack(3)] 
var intervalo;
var frames = 0;
var direction = false;

//clases
function Board(){
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.img = new Image();
  this.img.src = "http://getwallpapers.com/wallpaper/full/d/b/6/717446-sky-backgrounds-1920x1080-windows.jpg";
  this.score = 0;
  this.music = new Audio();
  this.music.src = "";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.move = function(){
    this.y--;
    if(this.y < -canvas.height) this.y = 0;
  }

  this.draw = function(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }

  this.drawScore = function(){
    this.score = Math.floor(frames/ 60);
    ctx.font = "50px Arial Black";
    ctx.fillStyle = "darkblue";
    ctx.fillText(this.score, this.width/2, this.y+50);
  }
}

function Stack(pos){
  this.x = 101*pos + 500;
  this.y = canvas.height;
  this.width = 100;
  this.height = 100;

  this.drawStack = function(){
    console.log("dasda")
    ctx.beginPath()
    ctx.rect(this.x,this.y-this.height,this.width,this.height)
    ctx.closePath()
    //ctx.stroke()
    ctx.fill()
  }


}



    

//aux
function gameOver(){
  stop();
  ctx.font = "50px courier";
  ctx.lineWidth = 50;
  ctx.fillText("Game Over", 60,100);
  ctx.fillText('Press R to start', 60, 200);
}

//listener
addEventListener('keydown', function(e){
  if(e.keyCode === 32){
    start();
  }
  if(e.keycode === 32){
    stop();
      //movimiento
  }
});

function update(){
  frames++;
  ctx.clearRect(0,0, 1000, 800);
  tablero.draw();
  tablero.drawScore();
  stacks.forEach(function(stack){
    if (stack.x <= 0){
      direction = false;
    } 
    if ((stack.x + stack.width)>=canvas.width){
      direction = true;
    }
    if (direction){
      stack.x-=50;
    
    } else {
      stack.x+=50;
    }
    stack.drawStack() 
    

  })

}
function start(){
  //tablero.music.play();
  if(intervalo > 0) return;
  //extras que necesitemos inicializar
  intervalo = setInterval(function(){
      update();
  }, 1000/10);
  tablero.score = 0;
}

function stop(){
  tablero.music.pause();
  clearInterval(intervalo)
  intervalo = 0;
}