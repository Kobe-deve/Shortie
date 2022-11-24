class Map
{

	map = [[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		   [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,],
		   [1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,],
		   [1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,],
		   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],]
	
	width = 15;
	height = 6;
	
	blockSize = 100;
	
	// draws map on screen 	
	draw()
	{
		ctx.beginPath();
		for(var y = 0;y < this.height;y++)
		{
			for(var x = 0;x < this.width;x++)
			{
				if(this.map[y][x] == 1)
					ctx.rect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
				else if (this.map[y][x] == 2)
					ctx.fillRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
			}
		}
		ctx.stroke();
	}
	
	// collision detection...
	blockat(x,y)
	{
		if(x/this.blockSize < this.width && y/this.blockSize < this.height)
		{
			if(this.map[parseInt(y/this.blockSize)][parseInt(x/this.blockSize)] >= 1)
			{
				this.map[parseInt(y/this.blockSize)][parseInt(x/this.blockSize)] = 2;
				return true;
			}
		}
		return false;
	}
}