/* Constants for bricks */
var num_bricks = 80;
var NUM_ROWS = 3;
var BRICK_TOP_OFFSET = 20;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 12;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var bricks;
var buffer = BRICK_SPACING + BRICK_WIDTH;
var counter = 0;
var num_row = 0;
/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var BALL_RADIUS = 15;
var paddle;

var ball;
var dx = 6;
var dy = 6;
var startingx = getWidth()/2;
var startingy = getHeight()/2;

var score=3;
var txt;
var level = 1;

	println("INSTUCTIONS: BREAK THROUGH THE BARRIER!");
	println("WARNING, TOP ROW WLL BE HARD!");
	println("**game is in beta**");
	println("**If experiencing bugs, refresh**");

function start(){
	drawRows();
	drawPaddle();
	mouseMoveMethod(movePaddle);
	setUpBall();
	setTimer(draw, 10);

}


function setUpBall(){
    txt = new Text("YOU HAVE " + score + " LIVES LEFT");
    txt.setPosition(50,200);
    add(txt);
    ball = new Circle(BALL_RADIUS);
	ball.setPosition(startingx, startingy);
	add(ball);
}

function draw(){
	checkWalls();
	
	ball.move(dx, dy);
	
	
}

function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
		remove(txt);
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getRadius() > getHeight()){
		score--;
		stopTimer(draw);
		remove(ball);
		setUpBall();
		mouseClickMethod(restart);
	}
	
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
		stopTimer(draw);
		
		var winner = new Text("You Win!!! :) Click for next level");
		winner.setPosition(10,100);
		add(winner);
		mouseClickMethod(levelup);
	
	}
	
	collisions();
}


function levelup(e){
    level++;
    if(level <= 3){
        BRICK_TOP_OFFSET += 20;
        NUM_ROWS += 2;
        restartAll();
    }else{
        var champion = new Text("CONGRATULATIONS!" , "20 point Arial");
        champion.setPosition(2,200);
        add(champion);
        var beatgame = new Text("YOU BEAT THE GAME! R-restart?");
        beatgame.setPosition(2,250);
        add(beatgame);
        keyDownMethod(keyDown);
    }
  
}

function restart(){
    if(score > 0){
        setTimer(draw,10);
        remove(txt);
    }else{
        txt.setPosition(10,200);
        txt.setText("GAME OVER! press R to restart");
        keyDownMethod(cheat);
        keyDownMethod(keyDown);
    }
}

function cheat(e){
    if(e.keyCode == Keyboard.letter("Z")){
        setTimer(draw,10);
        score = 3;
    }
}

function keyDown(e){
    score = 3;
    NUM_ROWS = 3;
    BRICK_TOP_OFFSET = 20;
    level = 1;
    if(e.keyCode == Keyboard.letter("R")){
        restartAll();
    }
}

function restartAll(){
    	removeAll();
    	counter=0;
    	num_row=0;
    	score=3;
    
    	start();
}

function collisions(){
    var top = getElementAt(ball.getX(),(ball.getY()-BALL_RADIUS));
	if(top != null){
	    remove(top);
	    dy = -dy;
	    num_bricks--;
	}
	
	var left = getElementAt(ball.getX()-BALL_RADIUS,ball.getY());
	if((left != null)&& (ball.getY() < getHeight()/2)){
	    remove(left);
	    dx = -dx;
	    num_bricks--;
	}
	
	var right = getElementAt(ball.getX()+BALL_RADIUS,ball.getY());
	if((right != null) && (ball.getY() < getHeight()/2)){
	    remove(right);
	    dx = -dx;
	    num_bricks--;
	}
	
	var bottom = getElementAt(ball.getX(),ball.getY()+BALL_RADIUS);
	if((bottom != null) && (ball.getY() < getHeight()/2)){
	    remove(bottom);
	    
	}
	
    var bottomBounce = getElementAt(ball.getX(),ball.getY()+BALL_RADIUS);
	if(bottomBounce != null){
	    dy=-dy;
	}
	

}


function movePaddle(e){
    paddle.setPosition(e.getX()-PADDLE_WIDTH/2,getHeight()-PADDLE_OFFSET*2);
}

function drawPaddle(){
    paddle = new Rectangle(PADDLE_WIDTH,PADDLE_HEIGHT);
    paddle.setPosition(getWidth()/2-PADDLE_WIDTH/2, getHeight()-PADDLE_OFFSET*2);
    add(paddle);
}



function drawRows(){
    for(var i = 0; i<NUM_ROWS + 1; i++ && counter++){
        drawBricks();
        }

}

function drawBricks(){
    
    for(var i = 0; i < NUM_BRICKS_PER_ROW; i++){
        bricks = new Rectangle(BRICK_WIDTH,BRICK_HEIGHT);
        bricks.setPosition(BRICK_SPACING + (buffer * i) , BRICK_TOP_OFFSET + (BRICK_HEIGHT + BRICK_SPACING) * counter);
        if(counter <= 1){
            bricks.setColor(Color.red);
        }else if(counter <=3){
            bricks.setColor(Color.orange);
        }else if(counter <=5){
            bricks.setColor(Color.green);
        }else{
            bricks.setColor(Color.blue);
        }
        add(bricks);
        
    }
}
