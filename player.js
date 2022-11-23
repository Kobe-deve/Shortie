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
		
		this.y = window.innerHeight*2/3;
	};
	
	// handling input 
	keydownInput(event){
		this.down = false;
				
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
				this.yacceleration+=4;
			break;
		}
	
		// jump handling
		if(event.key == " ")
		{
			if(!this.jump)
			{
				this.jump = true;
				this.yacceleration-=15;
			}
			else if(!this.jump2)
			{
				this.jump2 = true;
				this.yacceleration-=6;
			
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
	        if(this.yacceleration < 0)
	        {
		        this.yacceleration = this.yacceleration+1;
	        }
	        else if(this.yacceleration == 0 && this.jump && this.y < window.innerHeight*2/3)
	        {
	        	if(!this.jump2)
			        this.yacceleration = this.yacceleration+4;
		        else
			        this.yacceleration = this.yacceleration+1;
	        }
	
	        if(this.jump || this.jump2)
		        this.y+=2*this.yacceleration;
	        this.x+=this.xspeed;
	
	        if(this.jump2)
	        {
		        this.angle+=20;
		        this.angle%=360;
	        }

        	// check boundaries
	        if(this.y < 0)
	        {
		        this.movement = false;
		        this.yacceleration = 0;
		        this.yspeed = 0;
		        this.y = 0;
	        }
	        else if(this.y >= window.innerHeight*2/3)
	        {
		        this.yacceleration = 0;
		        this.yspeed = 0;
		        this.y = window.innerHeight*2/3;
		        this.jump = false;
		        this.jump2 = false;
	        }
	
	        if(this.x < 0)
	        {
		        this.movement = false;
		        this.xacceleration = 0;
		        this.xspeed = -this.xspeed;
		        this.x = 0;
	        }
	        else if(this.x+this.playerWidth >= window.innerWidth)
	        {
		        this.movement = false;
		        this.xacceleration = 0;
		        this.xspeed = -this.xspeed;
		        this.x = window.innerWidth-this.playerWidth;
        	}
	};
	
	// setting y based on resized screen 
	resize()
	{
		this.y = window.innerHeight*2/3;
	};
}