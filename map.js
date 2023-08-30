
// position of the game screen 
var gameplayBoxX = 0;
var gameplayBoxY = 0;

// size of the game screen 
var gameplayBoxW = 1500;
var gameplayBoxH = 700;

class Map
{

	map = [[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
		    [1,0,0,2,2,2,2,2,0,0,0,0,0,0,1,],
		    [1,0,0,2,0,0,0,2,0,0,0,0,0,0,0,],
		    [1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,],
		    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],],
			
			[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],],
			
			[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],]]
			
	
	
	currentMap = 0
	mapSize = 3;
	
	width = 15;
	height = 8;
	
	blockSize = 100;
	
	blockSpriteSheet = null;
	background = null;
	
	constructor()
	{
		this.blockSpriteSheet = new Image();
		this.blockSpriteSheet.src = "img/block.PNG";
		
		
		this.background = new Image();
		this.background.src = "img/background.PNG";
	}
	
	resize()
	{
		
	}
	
	// draws map on screen 	
	draw()
	{
		ctx.beginPath();
			ctx.drawImage(this.background,0,0,gameplayBoxW,gameplayBoxH);		
		ctx.stroke();
		
		ctx.rect(gameplayBoxX, gameplayBoxY, gameplayBoxW, gameplayBoxH);
				
		ctx.beginPath();
		for(var y = 0;y < this.height;y++)
		{
			for(var x = 0;x < this.width;x++)
			{
				
				if(this.map[this.currentMap][y][x] != 0)
				{
					//ctx.drawImage(this.sprite,this.frame*this.playerWidth,0,this.playerWidth,this.playerHeight,-this.x-this.playerWidth,this.y+this.playerWidth/10,this.playerWidth,this.playerHeight);
					ctx.drawImage(this.blockSpriteSheet, (this.map[this.currentMap][y][x]-1)*this.blockSize,0,this.blockSize,this.blockSize,x*this.blockSize+gameplayBoxX, y*this.blockSize+gameplayBoxY, this.blockSize, this.blockSize);
				}
				/*	
				if(this.map[this.currentMap][y][x] == 1)
					ctx.rect(x*this.blockSize+gameplayBoxX, y*this.blockSize+gameplayBoxY, this.blockSize, this.blockSize);
				else if (this.map[this.currentMap][y][x] == 2)
					ctx.fillRect(x*this.blockSize+gameplayBoxX, y*this.blockSize+gameplayBoxY, this.blockSize, this.blockSize);
				*/
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
				//this.map[this.currentMap][parseInt(y/this.blockSize)][parseInt(x/this.blockSize)] = 2;
				return true;
			}
		}
		return false;
	}
}