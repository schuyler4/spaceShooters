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

var explodingImg = new Image()
explodingImg.src = "explodingPic.png"
//game varibles
var gameGoing = true
var score = 0
//game functions
function drawScore() {
	ctx.beginPath()
	ctx.fillStyle = "white"
	ctx.fill()
	ctx.font = "30px Arial"
	ctx.fillText(score,10,30)
	ctx.closePath()
}
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
	if(e.keyCode == 82) {
		if(gameGoing == false) {
			console.log("panda")
			score = 0
			ship.x = 190
			ship.alive = true
			setInterval(draw,10)
		}
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
	alive: true,
	draw: function() {
		if(this.alive == false) {
			ctx.drawImage(explodingImg, this.x,this.y)
		}
		else {
			ctx.drawImage(shipImage, this.x,this.y)
		}
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
			this.bullet.x1 = this.x + 9
			this.bullet.x2 = this.x + 30
		}
	}
}

var spaceRockNumber = 0
function spaceRock(x,y,alive,speed) {
	this.x = x
	this.y = y
	this.alive = alive
	this.speed = speed
	spaceRockNumber += 1
}
var spaceRock1 = new spaceRock(0,0,true,1)
var spaceRock2 = new spaceRock(0,-100,true,1)
var spaceRock3 = new spaceRock(0,-200,true,1) 
var spaceRock4 = new spaceRock(0,-300,true,1)
var spaceRock5 = new spaceRock(0,-400,true,1)  
function drawSpaceRock() {
	if(spaceRock1.alive == false) {
		ctx.drawImage(explodingImg,spaceRock1.x,spaceRock1.y)
	}
	else {
		ctx.drawImage(spaceRockImg,spaceRock1.x,spaceRock1.y)
	}
	if(spaceRock2.alive == false) {
		ctx.drawImage(explodingImg,spaceRock2.x,spaceRock2.y)
	}
	else {
		ctx.drawImage(spaceRockImg,spaceRock2.x,spaceRock2.y)
	}
	if(spaceRock3.alive == false) {
		ctx.drawImage(explodingImg,spaceRock3.x,spaceRock3.y)
	}
	else {
		ctx.drawImage(spaceRockImg,spaceRock3.x,spaceRock3.y)
	}
	if(spaceRock3.alive == false) {
		ctx.drawImage(explodingImg,spaceRock4.x,spaceRock4.y)
	}
	else {
		ctx.drawImage(spaceRockImg,spaceRock4.x,spaceRock4.y)
	}
	if(spaceRock3.alive == false) {
		ctx.drawImage(explodingImg,spaceRock5.x,spaceRock5.y)
	}
	else {
		ctx.drawImage(spaceRockImg,spaceRock5.x,spaceRock5.y)
	}
}

var timer1 = 0
var timer2 = 0
var timer3 = 0
var timer4 = 0
var timer5 = 0

var timer1StopingPoint = Math.floor(Math.random() * 400)
var timer2StopingPoint = Math.floor(Math.random() * 400)
var timer3StopingPoint = Math.floor(Math.random() * 400)
var timer4StopingPoint = Math.floor(Math.random() * 400)
var timer5StopingPoint = Math.floor(Math.random() * 400)

function moveSpaceRocks() {
	spaceRock1.y += spaceRock1.speed
	spaceRock2.y += spaceRock2.speed
	spaceRock3.y += spaceRock3.speed
	spaceRock4.y += spaceRock4.speed
	spaceRock5.y += spaceRock5.speed
	if(spaceRock1.y > canvas.height) {
		spaceRock1.alive = true
		spaceRock1.y = 0
		timer1StopingPoint = Math.floor(Math.random() * 400)
		
	}
	if(spaceRock2.y > canvas.height) {
		spaceRock2.alive = true
		spaceRock2.y = 0
		timer2StopingPoint = Math.floor(Math.random() * 400)
		
	}
	if(spaceRock3.y > canvas.height) {
		spaceRock3.alive = true
		spaceRock3.y = 0
		timer3StopingPoint = Math.floor(Math.random() * 400)
		ship.bullet.resetBullet()
	}
	if(spaceRock4.y > canvas.height) {
		spaceRock4.alive = true
		spaceRock4.y = 0
		timer4StopingPoint = Math.floor(Math.random() * 400)
		
	}
	if(spaceRock5.y > canvas.height) {
		spaceRock5.alive = true
		spaceRock5.y = 0
		timer5StopingPoint = Math.floor(Math.random() * 400)
		
	}

	/*Math.floor(Math.random() * 10)*/

	
	timer1 += 1
	timer2 += 1 
	timer3 += 1
	timer4 += 1
	timer5 += 1
	if(timer1 == timer1StopingPoint) {
		timer1 = 0
	}
	if(timer1 < timer1StopingPoint / 2) {
		spaceRock1.x += 1
	}
	if(timer1 > timer1StopingPoint / 2) {
		spaceRock1.x -= 1
	}
	

	if(timer2 >= timer2StopingPoint) {
		timer2 = 0
	}
	if(timer2 < timer2StopingPoint / 2) {
		spaceRock2.x += 1
	}
	if(timer2 > timer2StopingPoint / 2) {
		spaceRock2.x -= 1
	}
	

	if(timer3 >= timer3StopingPoint) {
		timer3 = 0
	}
	if(timer3 < timer3StopingPoint / 2) {
		spaceRock3.x += 1
	}
	if(timer3 > timer3StopingPoint / 2) {
		spaceRock3.x -= 1
	}
	

	if(timer4 >= timer4StopingPoint) {
		timer4 = 0
	}
	if(timer4 < timer4StopingPoint / 2) {
		spaceRock4.x += 1
	}
	if(timer4 > timer4StopingPoint / 2) {
		spaceRock4.x -= 1
	}

 	if(timer5 >= timer5StopingPoint) {
		time5 = 0
	}
 	if(timer5 < timer5StopingPoint / 2) {
		spaceRock5.x += 1
	}
	if(timer5 > timer5StopingPoint / 2) {
		spaceRock5.x -= 1
	}
	
	console.log(timer1)
	console.log(timer2)
	console.log(timer3)
	console.log(timer4)
	console.log(timer5)	
}
function spaceRocksGetShot() {
	console.log(spaceRock1.x )
	if(ship.bullet.y < spaceRock1.y && spaceRock1.y < ship.y 
		&& ship.bullet.x2 > spaceRock1.x && spaceRock1.x + 50 > ship.bullet.x2) {
		explodingSound.play()
		spaceRock1.alive = false 
		score += 1 
	}
	if(ship.bullet.y < spaceRock2.y && spaceRock2.y < ship.y && 
		ship.bullet.x2 > spaceRock2.y && spaceRock2.x + 50 > ship.bullet.x2) {
		explodingSound.play()
		spaceRock2.alive = false 
		score += 1 
	}
	if(ship.bullet.y < spaceRock3.y && spaceRock3.y < ship.y && 
		ship.bullet.x2 > spaceRock3.y && ship.bullet.x2 < spaceRock3.x + 50) {
		explodingSound.play()
		spaceRock3.alive = false 
		score += 1 
	}
	if(ship.bullet.y < spaceRock4.y && spaceRock4.y < ship.y &&
		ship.bullet.x2 > spaceRock4.y && spaceRock4.x + 50 > spaceRock4.x) {
		explodingSound.play()
		spaceRock4.alive = false 
		score += 1 
	}
	if(ship.bullet.y < spaceRock5.y && spaceRock5.y < ship.y &&
		ship.bullet.x2 > spaceRock5.y && spaceRock5.x + 50 > ship.bullet.x2) {
		explodingSound.play()
		spaceRock5.alive = false 
		score += 1 
	}
}
function spaceRockKillsPlayer() {
	if(spaceRock1.y > ship.y && spaceRock1.alive == true) {
		if(ship.alive == true) {
			explodingSound.play()
		}
		ship.alive = false
		clearInterval(loop)
		gameGoing = false
		restartGameMenu()
	} 
}
function restartGameMenu() {
	ctx.beginPath()
	ctx.fillStyle = "white"
	ctx.fill()
	ctx.fillText("Game Over Your Score Is " + score,8,100)
	ctx.closePath()
}
function draw() {
	sss;
	drawScore()
	ship.draw()
	ship.move()
	ship.bullet.draw()
	ship.resetBullet()
	drawSpaceRock()
	moveSpaceRocks()
	spaceRocksGetShot()
	//spaceRockKillsPlayer()
}
var loop = setInterval(draw,10)