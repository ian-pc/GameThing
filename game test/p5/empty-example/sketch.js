var player = {
	width: 50, 
	startx: 0, 
	starty: 0
}

let pregame = 1;
let howtoplay = 1;

let RobotoThin;
let RobotoBold;

let level = 1;

let dead = 0;
let win = 0;

let tileWidth = 100;
let c;

let backgroundDim = 0;
let pauseMenuX = 0;
let paused = 0;

let endMenuX = 0;


let timerS = 59;
let timerMs = 100;

//0: dead, 1: live, 2: win, 3: start
let gamemap = [
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0]
]; 
 
let gamestart = 0;
let winColor = '#FFFF00';
let deadColor = '#2C2F33';



function newmap() {

	gamemap = [
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0]
	]; 
	//0: positive y, 1: negative y, 2: positive x, 3: negative x
	let tried = [0, 1, 2, 3];

	let mapLength = level;

	let mapCurX = int(random(1, 6));
	let mapCurY = int(random(1, 6));

	gamemap[mapCurX][mapCurY] = 3;

	while(mapLength >= 0) {

		//generation direction
		let genDir = random(tried);

		if (genDir === 0) {
			if(mapCurY !== gamemap[0].length - 1 && gamemap[mapCurX][mapCurY + 1] === 0) {
				tried = [0, 1, 2, 3];
				gamemap[mapCurX][mapCurY + 1] = 1;
				mapCurY++;
			} else {
				tried.splice(tried[genDir], 1);
				continue;
			}
		} else if (genDir === 1) {
			if(mapCurY !== 0 && gamemap[mapCurX][mapCurY - 1] === 0) {
				tried = [0, 1, 2, 3];
				gamemap[mapCurX][mapCurY - 1] = 1;
				mapCurY--;
			} else {
				tried.splice(tried[genDir], 1);
				continue;
			}
		} else if (genDir === 2) {
			if(mapCurX !== 0) {
				if(gamemap[mapCurX + 1][mapCurY] === 0) {
					tried = [0, 1, 2, 3];
					gamemap[mapCurX + 1][mapCurY] = 1;
					mapCurX++;
				} else {
					tried.splice(tried[genDir], 1);
					continue;
				}
			} else {
				tried.splice(tried[genDir], 1);
				continue;
			}
		} else if (genDir === 3) {
			if(mapCurX !== gamemap.length - 1 && gamemap[mapCurX - 1][mapCurY] === 0) {
				tried = [0, 1, 2, 3];
				gamemap[mapCurX - 1][mapCurY] = 1;
				mapCurX--;
			} else {
				tried.splice(tried[genDir], 1);
				continue;
			}
		}


		if(mapLength === 0) {
			gamemap[mapCurX][mapCurY] = 2;
		}
		mapLength--;
	}
}


function timerSubtract() {
	timerMs -= 1;
	if (timerMs === 0) {
		timerMs = 100;
		timerS -= 1;
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight - 3.6);
	newmap();
}

function draw() {

	//setup
	if (pregame	=== 1) {

		background('white');

		//title

		fill('black');
		//textFont(robotoBold)
		textSize(250);
		textAlign(CENTER);
		text('Mouse Maze', windowWidth/2, windowHeight/2 - 50);

		//play button


		if (mouseX > windowWidth/2 - 500/2 && mouseX < windowWidth/2 + 500/2) {
			if (mouseY > windowHeight/2 + 50 && mouseY < windowHeight/2 + 150) {
				fill('deadColor');
			}
		} else {
			fill('black');
		}
		strokeWeight(15);
		rect(windowWidth/2 - 500/2, windowHeight/2 + 50, 500, 100);
		textSize(75);
		fill('white');
		text('Play', windowWidth/2, windowHeight/2 + 120);

		if (mouseX > windowWidth/2 - 500/2 && mouseX < windowWidth/2 + 500/2) {
			if (mouseY > windowHeight/2 + 200 && mouseY < windowHeight/2 + 200 + 100) {
				fill('white');
			} else {
				fill('black');
			}
		} else {
			fill('black');
		}
		strokeWeight(15);
		rect(windowWidth/2 - 500/2, windowHeight/2 + 200, 500, 100);
		textSize(75);
		fill('white');
		text('How To Play', windowWidth/2, windowHeight/2 + 270);

		if(howtoplay === 1) {
			rect(windowWidth/2 - 250, windowHeight/2 - 250, 500, 600);


			if (mouseX > windowWidth/2 + 500/2 - 25 && mouseX < windowWidth/2 + 500/2 + 25) {
				if (mouseY > windowHeight/2 - 500/2 - 25 && mouseY < windowHeight/2 - 500/2 + 25) {
					fill('white');
				} else {
					fill('black');
				}
			} else {
				fill('black');
			}
			
			ellipse(windowWidth/2+250, windowHeight/2 - 250, 50, 50);
			fill('black');
			text('How To Play: ', windowWidth/2, windowHeight/2 - 110)

			textSize(45);
			text('Hover mouse over \ngreen square and \n move the square to \n the yellow tile. Try to \n finish as many levels \n as possible in 1 \n minute', windowWidth/2 - 230, windowHeight/2 - 80, 470,400);

		}

		//detecting if pressin play button

	} else {


		background(deadColor);


		//scoreboard
		fill('#FFFFFF');
		noStroke();
		rect(0, 0, windowWidth, 75);
		fill(0);
		textSize(70);
		//textFont('RobotoThin');
		strokeWeight(1);

		textAlign(CENTER);
		text('Level: ' + level, 200, 65);

		textAlign(LEFT);
		text(timerS + '.' + timerMs, windowWidth - 200, 65)


		//map drawing
		for (var i = 0; i < gamemap.length; i++) {
			for (var j = 0; j < gamemap[0].length; j++) {
				if (gamemap[i][j] === 0) {
					noStroke();
					fill(deadColor);
				} else if (gamemap[i][j] === 1) {
					noStroke();
					fill('#FFFFFF');
				} else if (gamemap[i][j] === 2) {
					noStroke();
					fill(winColor);
				} else {
					player.startx = i*tileWidth + (windowWidth/2 - tileWidth*gamemap.length/2) + tileWidth/4;
					player.starty = j*tileWidth + (windowHeight/2 - tileWidth*gamemap[0].length/2) + tileWidth/4;
					noStroke();
					fill('#0bf14d');
				}
				noStroke();
				rect(i*tileWidth + (windowWidth/2 - tileWidth*gamemap.length/2), j*tileWidth + (windowHeight/2 - tileWidth*gamemap[0].length/2), tileWidth + 1, tileWidth + 1);
			}
		}

		
		if (paused === 0) {

			setTimeout(timerSubtract, 1);
			//game over

			if (dead === 1) {
				gamestart = 0;
				cursor(ARROW);
				dead = 0;	
			}

			//player collision box

			c = get(1 + mouseX + player.width/2, 1 + mouseY - player.width/2)
			player.colTopRight = "#" + hex(c[0],2) + hex(c[1],2) + hex(c[2],2); 
			c = get(1 + mouseX - player.width/2, 1 + mouseY - player.width/2)
			player.colTopLeft = "#" + hex(c[0],2) + hex(c[1],2) + hex(c[2],2); 
			c = get(1 + mouseX + player.width/2, 1 + mouseY + player.width/2);
			player.colBotRight = "#" + hex(c[0],2) + hex(c[1],2) + hex(c[2],2); 
			c = get(1 + mouseX - player.width/2, 1 + mouseY + player.width/2);
			player.colBotLeft = "#" + hex(c[0],2) + hex(c[1],2) + hex(c[2],2); 

			//collision detection
			if (gamestart === 1) {
				if((player.colTopRight === deadColor) 
					|| (player.colBotLeft === deadColor) 
					|| (player.colBotRight === deadColor) 
					|| (player.colTopLeft === deadColor)) {
					//console.log('dead');
					dead = 1;
				} else if ((player.colTopRight === winColor) 
					|| (player.colBotLeft === winColor) 
					|| (player.colBotRight === winColor) 
					|| (player.colTopLeft === winColor)) {
					//console.log('win');
					level++;
					newmap();
				}
			}

			//detecting when gamestart
			if (mouseX > player.startx && mouseX < player.startx + player.width) {
				if (mouseY > player.starty && mouseY < player.starty + player.width) {
					gamestart = 1;
				}
			}

			//on gamestart
			if (gamestart === 1) {
				noCursor();
			}

			//player
			if (gamestart === 0) {
				stroke(1);
				strokeWeight(10);
				fill('#0bf14d');
				rect(player.startx, player.starty, player.width, player.width);
			} else {
				noStroke();
				fill(deadColor);
				rect(mouseX - player.width/2, mouseY - player.width/2, player.width, player.width);
			}

			if (timerS === 0 && timerMs <= 1) {
				pregame = 1;
			}

		}


		//game pause

		if (paused === 1) {



			//background dimming
			if (backgroundDim < 150) {
				backgroundDim += 10;
			}
			fill(0, 0, 0, backgroundDim);
			rect(0, 0, windowWidth, windowHeight);

			//menu
			if (pauseMenuX < 1) {
				pauseMenuX += 0.1;
			}
			fill('white');
			rect(windowWidth/2 - 500/2, pauseMenuX*windowHeight*0.5 - 750/2, 500, 750);

			//paused sign

			textAlign(CENTER);
			fill('black');
			text('PAUSED', windowWidth/2,pauseMenuX*windowHeight*0.5- 150);

			//resume button
			if (mouseX > windowWidth/2 - 500/2 && mouseX < windowWidth/2 + 500/2) {
				if (mouseY > windowHeight/2 + 50 && mouseY < windowHeight/2 + 150) {
					fill('black');
				} else {
					fill('white');
				}
			} else {
				fill('white');
			}
			stroke(1);
			strokeWeight(15);
			rect(windowWidth/2 - 350/2, pauseMenuX*windowHeight*0.5 + 20, 350, 100);
			textSize(75);
			noStroke();
			fill('black');
			text('Resume', windowWidth/2, pauseMenuX*windowHeight*0.5 + 100);

			text(timerS + '.' + timerMs, windowWidth/2, pauseMenuX*windowHeight*0.5 + 280)

			
		} else {
			//background un-dimming
			if (backgroundDim > -1) {
				backgroundDim -= 20;
			}
			fill(0, 0, 0, backgroundDim);
			rect(0, 0, windowWidth, windowHeight);

			//un-menu
			if (pauseMenuX > -0.1) {
				pauseMenuX -= 0.1;
			} 
			fill('white');
			rect(windowWidth/2 - 500/2, pauseMenuX*windowHeight*0.5 - 750, 500, 750);
		}




	}

	//console
	console.log();
}

//key presses

function keyPressed() {
	if (keyCode === ESCAPE && dead === 0) {
		if (paused === 0) {
			paused = 1;
		} else {
			paused = 0;
		}
	}
}

function mouseClicked() {

	//pregame play

	if (howtoplay === 0) {
		if (mouseX > windowWidth/2 - 500/2 && mouseX < windowWidth/2 + 500/2) {
			if (mouseY > windowHeight/2 + 50 && mouseY < windowHeight/2 + 150) {
				pregame = 0;
			}
		}
	}


	if (mouseX > windowWidth/2 - 350/2 && mouseX < windowWidth/2 + 350/2) {
		if (mouseY > windowHeight/2 && mouseY < windowHeight/2 + 150) {
			paused = 0;
		}
	}

	if (mouseX > windowWidth/2 + 500/2 - 25 && mouseX < windowWidth/2 + 500/2 + 25) {
		if (mouseY > windowHeight/2 - 500/2 - 25 && mouseY < windowHeight/2 - 500/2 + 25) {
			howtoplay = 0;
		}
	}

	if (mouseX > windowWidth/2 - 500/2 && mouseX < windowWidth/2 + 500/2) {
		if (mouseY > windowHeight/2 + 200 && mouseY < windowHeight/2 + 200 + 100) {
			howtoplay = 1;
		}
	}

}