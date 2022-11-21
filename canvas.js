// game canvas
var canvas = null;

// canvas context
var ctx = null;

// coordinates
var x = 10;
var y = 10;

// physics 
var xspeed = 0;
var yspeed = 0;
var friction = 0.25;
var xacceleration = 0;
var yacceleration = 0;

var jump = false;

var movement = false;

// frame on animation
var frame = 1;

// character sprite
var sprite = null;

// display the player 
function displayPlayer()
{	
	if(movement)
	{
		frame++;
		frame%=3;
	}
	else 
		frame = 1;
	
	ctx.drawImage(sprite,frame*133,0,133,217,x,y,133,217);
}

// displaying to the screen 
function draw()
{	
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	displayPlayer();
}

function keyInput(event){
	
	switch (event.key) 
	{
		case "ArrowLeft":
			if(xacceleration >= 0)
				xacceleration--;
		break;
		case "ArrowRight":
			if(xacceleration <= 0)
				xacceleration++;
		break;
		case " ":
			jump = true;
			yacceleration-=10;
		break;
		/*case "ArrowUp":
			if(yacceleration >= 0)
				yacceleration--;
		break;
		case "ArrowDown":
			if(yacceleration <= 0)
				yacceleration++;
		break;*/
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
		xspeed+=xacceleration/2;
	
		movement = true;
	}
	else 
	{
		if(xspeed < 0)
			xspeed+=friction;
		else if(xspeed > 0)
			xspeed-=friction;
		
		movement = false;
	}
	
	//y movement/jump physics
	if(yacceleration < 0)
	{
		yacceleration = yacceleration+1;
	}
	else if(yacceleration == 0 && jump && y < window.innerHeight*2/3)
	{
		yacceleration = yacceleration+2;	
	}
	
	if(jump)
		y+=2*yacceleration;
	x+=xspeed;
	
	// check boundaries
	if(y < 0)
	{
		movement = false;
		yacceleration = 0;
		yspeed = 0;
		y = 0;	
	}
	else if(y+ 217 >= window.innerHeight)
	{
		movement = false;
		yacceleration = 0;
		yspeed = 0;
		y = window.innerHeight-217;
	}
	
	if(x < 0)
	{
		movement = false;
		xacceleration = 0;
		xspeed = 0;
		x = 0;
	}
	else if(x+133 >= window.innerWidth)
	{
		movement = false;
		xacceleration = 0;
		xspeed = 0;
		x = window.innerWidth-133;
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
	document.onkeydown = keyInput;
	window.addEventListener("resize",setWindowSize);
	
	// set up assets
	sprite = new Image();
	sprite.src = "img/Shortie.PNG";
	
	y = window.innerHeight*2/3;
	
	// set up main loop
	window.requestAnimationFrame(mainLoop);
	
	console.log('Loaded');
}
