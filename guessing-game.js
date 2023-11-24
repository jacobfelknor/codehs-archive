var MIN = 0;
var MAX = 100;
var ANSWER = Randomizer.nextInt(MIN,MAX);
function start() {
    var guess = readInt("what is your guess? The range is from " + MIN + " to " + MAX);
    while (true){
        if(guess == null){
            break;
        }
        if(ANSWER>guess){
        var guess = readInt("Higher!");
        }if(ANSWER<guess){
        var guess = readInt("Lower!");
        }
        if(ANSWER==guess){
            break;
        
        }
    }
    if(ANSWER=guess){
        println("That's Correct! The number was " + ANSWER);
    }else{
        println("Why did you quit? Try again!");
    }
    
    
    
}


