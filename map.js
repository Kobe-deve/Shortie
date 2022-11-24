class Map
{

	map = [[1,0,0,0,0,],
			   [0,0,0,0,0,],
			   [0,0,1,0,1,],
			   [0,0,1,1,1,]]
	
	width = 5;
	height = 4;
	
	// draws map on screen 	
	draw()
	{
		ctx.beginPath();
		for(var y = 0;y < this.height;y++)
		{
			for(var x = 0;x < this.width;x++)
			{
				if(this.map[y][x] == 1)
					ctx.rect(x*100, y*100, 100, 100);
				else if (this.map[y][x] == 2)
					ctx.fillRect(x*100, y*100, 100, 100);
			}
		}
		ctx.stroke();
	}
	
	// collision detection...
	blockat(x,y)
	{
		if(x/100 < this.width && y/100 < this.height)
		{
			if(this.map[parseInt(y/100)][parseInt(x/100)] == 1)
			{
			//	this.map[parseInt(y/100)][parseInt(x/100)] = 2;
				return true;
			}
		}
		return false;
	}
}