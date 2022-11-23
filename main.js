var playerCharacter;

// initialize game 
function onload()
{
	// set up canvas 
	canvas = document.getElementById('gameCanvas');
	canvas.setAttribute("style", "position: absolute; x:0; y:0;");
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	
	window.addEventListener("resize",setWindowSize);
	
	// set up player 
	playerCharacter = new Player()

	// set handlers for inputs
	document.onkeydown = inputHandler;	
	document.onkeyup = inputHandler;	
	
	
	// set up main loop
	window.requestAnimationFrame(mainLoop);
	
	console.log('Loaded');
}

// resizing window 
function setWindowSize()
{
	console.log("RESIZE");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

// handles all keyboard input 
function inputHandler(event){
	playerCharacter.keydownInput(event);
}

// displaying to the screen 
function draw()
{	
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	playerCharacter.draw();
}

// main loop 
function mainLoop(){
	
	playerCharacter.physics();
	
	// display to screen 
	draw();
	
	// get new frame 
	window.requestAnimationFrame(mainLoop);
}
