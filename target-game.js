var line1;
var line2;
var ball;
var dx = 2;
var dy = 2;
var startingx = Randomizer.nextInt(0,getWidth());
var startingy = Randomizer.nextInt(0,getHeight());



function start(){
    line1 = new Line(getWidth() / 2, 0, getWidth() / 2, getHeight());
    line2 = new Line(0, getHeight() / 2, getWidth(), getHeight() / 2);
    add(line1);
    add(line2);
    mouseMoveMethod(g);
    mouseClickMethod(circle);
    makeCircle();
    mouseClickMethod(checkPos);
    
    
}



function checkPos(e){
   if(getElementAt(e.getX(),e.getY())){
       ball.setColor(Color.red);
       stopTimer(draw);
       var txt = new Text("You got it! :) ");
       txt.setPosition(getWidth()-160,60);
       add(txt);
   }
   println(getElementAt(e.getX(),e.getY()));
}

function makeCircle(){
    ball = new Circle(15);
	ball.setPosition(startingx, startingy);
	add(ball);
	
	setTimer(draw, 20);
}

function circle(e){
    var cir = new Circle(5);
    cir.setPosition(e.getX(),e.getY());
    cir.setColor(Color.red);
    add(cir);
}

function g(e){
    line1.setPosition(e.getX(), 0);
    line1.setEndpoint(e.getX(), getHeight());
    
    line2.setPosition(0, e.getY());
    line2.setEndpoint(getWidth(), e.getY());
}

function draw(){
	checkWalls();
	ball.move(dx, dy);
}

function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getRadius() > getHeight()){
		dy = -dy;
	}
	
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
}

