var NUM_ROWS = 8; 
var BRICK_TOP_OFFSET = 10; 
var BRICK_SPACING = 2; 
var NUM_BRICKS_PER_ROW = 10; 
var BRICK_HEIGHT = 10; 
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING; 
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW; 
var bricks; 
var counter = 0; 
var counterTwo = 0; 
var counterThree = 0; 
var colorChange = Color.RED; 
var brickRemove = 0; 

/* Constants for ball and paddle */ 
var PADDLE_WIDTH = 80; 
var PADDLE_HEIGHT = 15; 
var PADDLE_OFFSET = 10; 
var BALL_RADIUS = 15; 
var ball; 
var dx = 4; 
var dy = 4; 
var paddle; 
var paddleX = getWidth()/2 - PADDLE_WIDTH/ 2; 
var paddleY = getHeight() - PADDLE_OFFSET - (PADDLE_HEIGHT / 2); 
var lostCounter = 0; 



function start(){ 
rows(); 
ball = new Circle(15); 
ball.setPosition(getWidth()/2, getHeight()/2); 
setTimer(draw, 15); 
paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT); 
paddle.setPosition(paddleX, paddleY); 
mouseMoveMethod(movePaddle); 
add(paddle); 
add(ball); 



} 

function draw(){ 
var elemTop = getElementAt(ball.getX(), ball.getY() - (BALL_RADIUS)); 
var elemLeft = getElementAt(ball.getX() - (BALL_RADIUS), ball.getY()); 
var elemRight = getElementAt(ball.getX() + (BALL_RADIUS), ball.getY()); 
var elemBottom = getElementAt(ball.getX(), ball.getY() + (BALL_RADIUS)); 
if(elemBottom == paddle){ 
dy= -dy; 
} 
if(elemTop != null && elemTop != ball && elemTop != paddle){ 
remove(elemTop); 
dy = -dy; 
brickRemove = brickRemove + 1; 
} 
if(elemLeft != null && elemLeft != ball && elemLeft != paddle){ 
remove(elemLeft); 
dx = -dx; 
brickRemove = brickRemove + 1; 
} 
if(elemRight != null && elemRight != ball && elemRight != paddle){ 
remove(elemRight); 
dx = -dx; 
brickRemove = brickRemove + 1; 
} 
if(elemBottom != null && elemBottom != ball && elemBottom != paddle){ 
remove(elemBottom); 
dy = -dy; 
brickRemove = brickRemove + 1; 
} 

checkWalls(); 
winLost(); 
ball.move(dx, dy); 
} 

function checkWalls(){ 
//right wall 
if(ball.getX() + ball.getRadius() > getWidth()){ 
dx = -dx; 
} 

//left wall 
if(ball.getX() - ball.getRadius() < 0){ 
dx = -dx; 
} 
// Bottom wall 

// Top wall 
if(ball.getY() - ball.getRadius() < 0){ 
dy = -dy; 
} 

} 
function winLost(){ 
if(ball.getY() + ball.getRadius() > getHeight()){ 
stopTimer(draw); 
remove(ball); 
ball.setPosition(getWidth()/2, getHeight()/2); 
add(ball); 
setTimer(draw, 15); 
lostCounter++; 
if(lostCounter == 3){ 
stopTimer(draw, 15); 
remove(ball); 
var lost = new Text("You Lost :(", "30pt Arial"); 
lost.setPosition((getWidth() / 2) - 100, getHeight()/2); 
add(lost); 
} 
} 
if(brickRemove == NUM_ROWS * NUM_BRICKS_PER_ROW){ 
stopTimer(draw); 
remove(ball); 
var winner = new Text("You Win :)", "30pt Arial"); 
winner.setPosition((getWidth() / 2) - 100, getHeight()/2); 
add(winner); 
} 
} 

function movePaddle(e){ 
paddle.setPosition(e.getX() - PADDLE_WIDTH / 2, paddleY); 
if(e.getX() <= (PADDLE_WIDTH / 2)){ 
paddle.setPosition(0, paddleY); 
} 
if(e.getX() >= (getWidth() - (PADDLE_WIDTH / 2))){ 
paddle.setPosition(getWidth() - PADDLE_WIDTH, paddleY); 
} 
} 

function makeBrick(color, x, y){ 
bricks = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT); 
bricks.setColor(color); 
bricks.setPosition(x, y); 
add(bricks); 
} 
function brickColor(){ 
if(counterThree == 20){ 
colorChange = Color.ORANGE; 
} else if(counterThree == 40){ 
colorChange = Color.GREEN; 
} else if(counterThree == 60){ 
colorChange = Color.BLUE; 
}else if(counterThree == 80){ 
colorChange = Color.RED; 
} 


} 
function rows(){ 
for(var i = 0; i <= ((NUM_BRICKS_PER_ROW * NUM_ROWS) - 1); i++){ 
counterThree++; 
if(i % 10 == 0){ 
counter++; 
} 
counterTwo++; 
if(i % 10 == 0){ 
counterTwo = 0; 
} 
makeBrick(colorChange, 0 + BRICK_SPACING + (BRICK_WIDTH * counterTwo + BRICK_SPACING * counterTwo), (BRICK_TOP_OFFSET * counter + BRICK_SPACING * counter)); 
brickColor(); 
} 
}
