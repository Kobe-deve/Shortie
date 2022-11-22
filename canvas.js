// game canvas
var canvas = null;

// canvas context
var ctx = null;

// coordinates
var x = 10;
var y = 10;

var playerWidth = 66;
var playerHeight = 94;

// rotating the player 
var angle = 0;

// physics 
var xspeed = 0;
var yspeed = 0;
var friction = 0.25;
var xacceleration = 0;
var yacceleration = 0;

var direction = 0;

var jump = false;
var jump2 = false;

var movement = false;

// frame on animation
var frame = 1;

// character sprite
var sprite = null;

// display the player 
function displayPlayer()
{	
	if(jump2)
	{
		ctx.translate(x+playerWidth/2,y+playerHeight/2);
		ctx.rotate(angle * Math.PI / 180);
		ctx.translate(-x-playerWidth/2,-y-playerHeight/2);
	}
	else if(movement)
	{
		frame++;
		frame%=3;
	}
	else 
		frame = 1;
	
	if(direction == 1) // handles which direction the player is facing 
	{
		ctx.scale(-1,1);
		ctx.drawImage(sprite,frame*playerWidth,0,playerWidth,playerHeight,-x-playerWidth,y,playerWidth,playerHeight);
		ctx.scale(-1, 1);
	}
	else
	{
		ctx.drawImage(sprite,frame*playerWidth,0,playerWidth,playerHeight,x,y,playerWidth,playerHeight);
	}
	
	ctx.resetTransform();
}

// displaying to the screen 
function draw()
{	
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	displayPlayer();
}

function keyupInput(event){
	
};


function keydownInput(event){
	
	down = false;
	switch (event.key) 
	{
		case "ArrowLeft":
			if(xacceleration >= 0)
				xacceleration--;
			direction = 1;
		break;
		case "ArrowRight":
			if(xacceleration <= 0)
				xacceleration++;
			direction = 0;
		break;
		case "ArrowDown":
			yacceleration+=4;
		break;
	}
	
	// jump handling
	if(event.key == " ")
	{
		if(!jump)
		{
			jump = true;
			yacceleration-=15;
		}
		else if(!jump2)
		{
			jump2 = true;
			yacceleration-=6;
			
		}
	}
};

function setWindowSize()
{
	console.log("RESIZE");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	y = window.innerHeight*2/3;
	draw();
}

function physics()
{
	// x movement physics
	if(Math.abs(xacceleration) > 0)
	{
		xspeed+=xacceleration/4;
	
		movement = true;
	}
	else 
	{
		if(xspeed < 0)
			xspeed+=friction;
		else if(xspeed > 0)
			xspeed-=friction;
		
		if(xspeed == 0)
			movement = false;
	}
	
	//y movement/jump physics
	if(yacceleration < 0)
	{
		yacceleration = yacceleration+1;
	}
	else if(yacceleration == 0 && jump && y < window.innerHeight*2/3)
	{
		if(!jump2)
			yacceleration = yacceleration+4;	
		else
			yacceleration = yacceleration+1;		
	}
	
	if(jump || jump2)
		y+=2*yacceleration;
	x+=xspeed;
	
	if(jump2)
	{
		angle+=20;
		angle%=360;
	}

	// check boundaries
	if(y < 0)
	{
		movement = false;
		yacceleration = 0;
		yspeed = 0;
		y = 0;	
	}
	else if(y >= window.innerHeight*2/3)
	{
		yacceleration = 0;
		yspeed = 0;
		y = window.innerHeight*2/3;
		jump = false;
		jump2 = false;
	}
	
	if(x < 0)
	{
		movement = false;
		xacceleration = 0;
		xspeed = -xspeed;
		x = 0;
	}
	else if(x+playerWidth >= window.innerWidth)
	{
		movement = false;
		xacceleration = 0;
		xspeed = -xspeed;
		x = window.innerWidth-playerWidth;
	}
}

function mainLoop(){
	
	// physics handling 
	physics();
	
	// display to screen 
	draw();
	// get new frame 
	window.requestAnimationFrame(mainLoop);
}


// initialize game 
function onload()
{
	// set up canvas 
	canvas = document.getElementById('gameCanvas');
	canvas.setAttribute("style", "position: absolute; x:0; y:0;");
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	
	// set handlers for inputs
	document.onkeydown = keydownInput;
	document.onkeyup = keyupInput;
	
	window.addEventListener("resize",setWindowSize);
	
	// set up assets
	sprite = new Image();
	sprite.src = "img/Shortie.PNG";
	
	y = window.innerHeight*2/3;
	
	// set up main loop
	window.requestAnimationFrame(mainLoop);
	
	console.log('Loaded');
}
