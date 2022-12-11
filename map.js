
// position of the game screen 
var gameplayBoxX = 0;
var gameplayBoxY = 0;

// size of the game screen 
var gameplayBoxW = 1500;
var gameplayBoxH = 700;

class Map
{

	map = [[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		    [1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,],
		    [1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		    [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
		    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,],],
			
			[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		    [1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,],
		    [1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,],
		    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,],
		    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,],
		    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,],]]
	
	currentMap = 0
	mapSize = 2;
	
	width = 15;
	height = 8;
	
	blockSize = 100;
	
	// draws map on screen 	
	draw()
	{
		ctx.rect(gameplayBoxX, gameplayBoxY, gameplayBoxW, gameplayBoxH);
				
		ctx.beginPath();
		for(var y = 0;y < this.height;y++)
		{
			for(var x = 0;x < this.width;x++)
			{
				if(this.map[this.currentMap][y][x] == 1)
					ctx.rect(x*this.blockSize+gameplayBoxX, y*this.blockSize+gameplayBoxY, this.blockSize, this.blockSize);
				else if (this.map[this.currentMap][y][x] == 2)
					ctx.fillRect(x*this.blockSize+gameplayBoxX, y*this.blockSize+gameplayBoxY, this.blockSize, this.blockSize);
			}
		}
		ctx.stroke();
	}
	
	// collision detection...
	blockat(x,y)
	{
		if(x/this.blockSize < this.width && y/this.blockSize < this.height)
		{
			if(this.map[this.currentMap][parseInt(y/this.blockSize)][parseInt(x/this.blockSize)] >= 1)
			{
				this.map[this.currentMap][parseInt(y/this.blockSize)][parseInt(x/this.blockSize)] = 2;
				return true;
			}
		}
		return false;
	}
}