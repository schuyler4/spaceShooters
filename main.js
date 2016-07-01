var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
laserSound = document.getElementById("laser")
//sound varibles
var laserSound = new Audio("laser.wav")

var explodingSound = new Audio("explode.wav")
//image varibles
var shipImage = new Image()
shipImage.src = "ship.png"

var spaceRockImg = new Image()
spaceRockImg.src = "spaceRock.png"

document.addEventListener("keydown", function(e) {
	if(e.keyCode == 65) {
		ship.movingRight = true
	}
	else if(e.keyCode == 68) {
		ship.movingLeft = true
	}
	if(e.keyCode == 32) {
		ship.bullet.shooting = true
		laserSound.play();
	}
}, false);

document.addEventListener("keyup", function(e) {
	if(e.keyCode == 65) {
		ship.movingRight = false
	}
	else if(e.keyCode == 68) {
		ship.movingLeft = false
	}
}, false);

var ship = {
	x:190,
	y:550,
	draw: function() {
		ctx.drawImage(shipImage, this.x,this.y)
	},
	movingRight: false,
	movingLeft: false,
	move: function() {
		if(this.movingRight && this.x + 20 < 400) {
			this.x -= 1
			if(ship.bullet.shooting == false) {
				this.bullet.x1 -= 1
				this.bullet.x2 -= 1
			}
		}
		else if(this.movingLeft && this.x + 40 > 0) {
			this.x += 1 
			if(ship.bullet.shooting == false) {
				this.bullet.x1 += 1
				this.bullet.x2 += 1
			}
		}
	},
	bullet: {
		x1: 199,
		x2: 220,
		y: 554,
		width: 2,
		height: 10,
		color: "red",
		shooting: false,
		draw: function() {
			if(this.shooting) {
				ctx.beginPath()
				ctx.rect(this.x1,this.y,this.width,this.height)
				ctx.rect(this.x2,this.y,this.width,this.height)
				ctx.fillStyle = this.color
				ctx.fill()
				ctx.closePath()

				this.y -= 10
			}	
		}
	},
	resetBullet: function() {
		if(this.bullet.y < 0) {
			this.bullet.shooting = false
			this.bullet.y = 554
		}
	}
}
var spaceRock = {
	x: 100,
	y: 100,
	alive: true;
	draw: function() {
		/*for(i = 0;i < 400;i++) {
			if(i % 100 == 0) {
				spaceRock.y = i
			}*/
			if(this.alive == true) {
				ctx.drawImage(spaceRockImg ,this.x,this.y)
			}
			else {
				ctx.drawImage()
			}
			//console.log(this.y)
		//}
	},
	move: function() {
		this.y += 1
		console.log(this.y)
		if(this.y >= 600) {
			this.y = 100
		}
	},
	getShot: function() {
		if(ship.bullet.y < this.y) {

		}
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ship.draw()
	ship.move()
	ship.bullet.draw()
	ship.resetBullet()
	spaceRock.draw()
	spaceRock.move()
}
setInterval(draw,10)