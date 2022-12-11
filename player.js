class Player
{
	// coordinates
	x = 10;
	y = 10;

	playerWidth = 66;
	playerHeight = 94;

	// rotating the player 
	angle = 0;

	// physics 
	xspeed = 0;
	yspeed = 0;
	friction = 0.25;
	xacceleration = 0;
	yacceleration = 0;

	holdCounter = 0;
	
	direction = 0;

	jump = false;
	jump2 = false;

	movement = false;

	// frame on animation
	frame = 1;

	// character sprite
	sprite = null;
	
	constructor()
	{
		this.sprite = new Image();
		this.sprite.src = "img/Shortie.PNG";
		
		this.x = (1)*testMap.blockSize;
		this.y = (testMap.height-2)*testMap.blockSize;
	};
	
	// handling input 
	keydownInput(event){
		this.down = false;
		
		// x axis moving 
		if(event.type == 'keydown') 	
		{		
			switch (event.key) 
			{
				case "ArrowLeft":
					if(this.xacceleration >= 0)
						this.xacceleration--;
					this.direction = 1;
				break;
				case "ArrowRight":
					if(this.xacceleration <= 0)
						this.xacceleration++;
					this.direction = 0;
				break;
				case "ArrowDown":
				if(!(testMap.blockat(this.x,this.y+this.playerHeight) || testMap.blockat(this.x+this.playerWidth,this.y+this.playerHeight)
				   || testMap.blockat(this.x,this.y) || testMap.blockat(this.x+this.playerWidth,this.y+this.playerHeight)))
					this.yacceleration+=4;
				break;
			}
		}

		// jump handling
		if(event.key == " ")
		{
			if(event.type == 'keydown') 	
			{		
				if(this.jump && !this.jump2)
				{
					this.jump2 = true;
					this.yacceleration -=10;
				}
				else if(!this.jump && this.holdCounter < 3)	
				{
					this.holdCounter++;
					this.yacceleration -= Math.pow(this.holdCounter-3,2);
				}
				else
				{ 
					this.jump = true;
					this.yacceleration = 0;
					this.holdCounter = 0;
				}
			}
			else if(event.type == 'keyup') 	
			{
				this.holdCounter = 0;
				this.jump = true;
				this.yacceleration = 0;
			}				
		}
	};
	
	// drawing the character 
	draw()
	{
		if(this.jump2)
		{
			ctx.translate(this.x+this.playerWidth/2,this.y+this.playerHeight/2);
			ctx.rotate(this.angle * Math.PI / 180);
			ctx.translate(-this.x-this.playerWidth/2,-this.y-this.playerHeight/2);
		}
		else if(this.movement)
		{
			this.frame++;
			this.frame%=3;
		}
		else 
			this.frame = 1;
	
		if(this.direction == 1) // handles which direction the player is facing 
		{
			ctx.scale(-1,1);
			ctx.drawImage(this.sprite,this.frame*this.playerWidth,0,this.playerWidth,this.playerHeight,-this.x-this.playerWidth,this.y,this.playerWidth,this.playerHeight);
			ctx.scale(-1, 1);
		}
		else
		{
			ctx.drawImage(this.sprite,this.frame*this.playerWidth,0,this.playerWidth,this.playerHeight,this.x,this.y,this.playerWidth,this.playerHeight);
		}	
	
		ctx.resetTransform();
	};
	
	// physics of the character 
	physics()
	{
		// x movement physics
	    if(Math.abs(this.xacceleration) > 0)
	    {
	        this.xspeed+=this.xacceleration/4;
	
		    this.movement = true;
	    }
	    else
	    {
		    if(this.xspeed < 0)
			    this.xspeed+=this.friction;
			else if(this.xspeed > 0)
		        this.xspeed-=this.friction;
		
	        if(this.xspeed == 0)
			    this.movement = false;
	    }
	
	    //y movement/jump physics
		if(this.yacceleration == 0 && this.y < gameplayBoxH+gameplayBoxY && !testMap.blockat(this.x,this.y+this.playerHeight))
	    {
	    	if(!this.jump2)
		        this.yacceleration = this.yacceleration+4;
		    else
		        this.yacceleration = this.yacceleration+1;
	    }
		
		this.y+=2*this.yacceleration;
	    this.x+=this.xspeed;
	
	    if(this.jump2)
	    {
		    this.angle+=20;
		    this.angle%=360;
	    }

		// check boundaries
	    if(this.y < 0 || testMap.blockat(this.x,this.y) || testMap.blockat(this.x+this.playerWidth,this.y))
	    {
		    this.movement = false;
		    this.yacceleration = 0;
		    this.yspeed = 0;
		    if(this.y < 0)
				this.y = 0;
	    }
	    else if(this.y >= gameplayBoxH+gameplayBoxY || testMap.blockat(this.x,this.y+this.playerHeight) || testMap.blockat(this.x+this.playerWidth,this.y+this.playerHeight))
	    {
		    this.yacceleration = 0;
		    this.yspeed = 0;
			if(this.y >= gameplayBoxH+gameplayBoxY)
				this.y = gameplayBoxH+gameplayBoxY
			else
				this.y = parseInt(this.y/testMap.blockSize)*testMap.blockSize;
		    this.jump = false;
		    this.jump2 = false;
	    }
	
	    if(testMap.blockat(this.x,this.y) || testMap.blockat(this.x,this.y+this.playerHeight))
	    {
		    this.xspeed = -this.xspeed;
		    this.movement = false;
		    this.xacceleration = 0;
			if(this.x < 0)
				this.x = 0;
			//else
			//	this.x = parseInt(this.x/testMap.blockSize+1)*testMap.blockSize;
	    }
		else if(this.x < 0 && testMap.currentMap != 0)
		{
			testMap.currentMap--;
			this.x = (testMap.width-1)*testMap.blockSize;
		}
	    else if(testMap.blockat(this.x+this.playerWidth,this.y) || testMap.blockat(this.x+this.playerWidth,this.y+this.playerHeight))
	    {
		    this.movement = false;
		    this.xacceleration = 0;
		    this.xspeed = -this.xspeed;
			this.x = parseInt(this.x/testMap.blockSize)*testMap.blockSize;
        }
		else if(this.x+this.playerWidth >= gameplayBoxW+gameplayBoxX && testMap.currentMap+1 < testMap.mapSize)
		{
			testMap.currentMap++;
			this.x = (1)*testMap.blockSize;
		}
		
	};
	
	// setting y based on resized screen 
	resize()
	{
		this.y = window.innerHeight*2/3;
	};
}