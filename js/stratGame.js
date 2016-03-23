
var w = window.innerWidth; //* window.devicePixelRatio;
var h = window.innerHeight; //* window.devicePixelRatio;
var ballImg, background, footballerOne, footballerTwo, footballerThree, footballerFour, footballerFive;
var targetX = -1;
var targetY = -1;
var ballStartPosY = -1;
var goalPosY = w / 20;
var isOneMove = false, isSecondMove = false, isThirdMove = false, isFourMove = false, isFiveMove = false;
var speedRatio = w/ 500;
var ballSpeed = 100 * speedRatio, oneSpeed = 140 * speedRatio, twoSpeed = 160 * speedRatio, threeSpeed = 180 * speedRatio;
var game = new Phaser.Game(w, w / 1.2, Phaser.CANVAS, 'game-contener', { preload: preload, create: create, resize:onResize, update: update });

var stratIsFinish = false;

function preload() {
    game.load.image('field', 'img/field.png', w, w / 2);
    game.load.image('ball', 'img/ball.png', 40, 40);
    game.load.image('footballer', 'img/footballer.png', 40, 40);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // background generation and placement
    background = game.add.sprite(0, 0, 'field');
    background.width = w;
    background.height = w * 1.5;
    
    // Ball generation and placement
    ballImg = game.add.sprite(0, 0, 'ball');
    ballImg.width = w / 30;
    ballImg.height = w / 30;

    ballImg.x = w / 2 - ballImg.width / 2;
    ballStartPosY = w * 1.5 / 2 - ballImg.width / 2;
    ballImg.y = ballStartPosY;
    
    // Creation of adverse team;
    footballerOne = game.add.sprite(0, 0, 'footballer');
    footballerOne.x = w / 20 * 14;
    footballerOne.y = w / 20 * 9;
    footballerOne.width = w / 20;
    footballerOne.height = w / 18;
    footballerTwo = game.add.sprite(0, 0, 'footballer');
    footballerTwo.x = w / 20 * 5;
    footballerTwo.y = w / 20 * 7;
    footballerTwo.width = w / 20;
    footballerTwo.height = w / 18;
    footballerThree = game.add.sprite(0, 0 , 'footballer');
    footballerThree.x = w / 20 * 10;
    footballerThree.y = w / 20 * 6;
    footballerThree.width = w / 20;
    footballerThree.height = w / 18;
    footballerFour = game.add.sprite(0, 0 , 'footballer');
    footballerFour.x = w / 20 * 4;
    footballerFour.y = w / 20 * 5;
    footballerFour.width = w / 20;
    footballerFour.height = w / 18;
    footballerFive = game.add.sprite(0, 0 , 'footballer');
    footballerFive.x = w / 20 * 11;
    footballerFive.y = w / 20 * 3;
    footballerFive.width = w / 20;
    footballerFive.height = w / 18;
    
    // Enable physics to move the ball
    game.physics.arcade.enable(ballImg);
	ballImg.body.collideWorldBounds = true;
    
    // Enable footballer physics
    game.physics.arcade.enable(footballerOne);
    game.physics.arcade.enable(footballerTwo);
    game.physics.arcade.enable(footballerThree);
    game.physics.arcade.enable(footballerFour);
    game.physics.arcade.enable(footballerFive);
	footballerOne.body.collideWorldBounds = true;
	footballerTwo.body.collideWorldBounds = true;
	footballerThree.body.collideWorldBounds = true;
	footballerFour.body.collideWorldBounds = true;
	footballerFive.body.collideWorldBounds = true;
	footballerOne.body.immovable = true;
	footballerTwo.body.immovable = true;
	footballerThree.body.immovable = true;
	footballerFour.body.immovable = true;
	footballerFive.body.immovable = true;
    
    // Adding click listener on the background
    background.inputEnabled = true;
    //background.events.onInputDown.add(clickListener, this);
    // Add touch event
    game.input.onDown.add(touchListener, this);
}

function update () {

    var score = Math.round((ballStartPosY - ballImg.y) / (ballStartPosY - goalPosY) * 100);
    
    document.getElementById("score-contener").innerHTML =  score;
    
    if (score >= 100) {
        if (ballImg.x > w / 2 - w / 10 && ballImg.x < w / 2 + w / 18) {
            var text = "GOAL !!!";
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

            var t = game.add.text(w / 3, w / 3, text, style);
            if (!stratIsFinish)
                setTimeout(storeAnswerStratGame(1), 1500 );
            stratIsFinish = true;
        }
        if (!stratIsFinish)
            setTimeout(storeAnswerStratGame(0), 1500 );
        stratIsFinish = true;
    }
    
    // Detect Collisions
	if (game.physics.arcade.collide(ballImg, footballerOne) ||
        game.physics.arcade.collide(ballImg, footballerTwo) ||
	    game.physics.arcade.collide(ballImg, footballerThree)||
	    game.physics.arcade.collide(ballImg, footballerFour)||
	    game.physics.arcade.collide(ballImg, footballerFive)) {
        var text = "BLOCKED!";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(w / 3, w / 3, text, style);
            if (!stratIsFinish)
                setTimeout(storeAnswerStratGame(0), 1500 );
            stratIsFinish = true;
    }
    
    //  If the sprite is > 8px away from the pointer then let's move to it
    if (targetX != -1 && game.physics.arcade.distanceToXY(ballImg, targetX, targetY) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        if (targetY > ballImg.y)
            targetY = ballImg.y;
        game.physics.arcade.moveToXY(ballImg, targetX, targetY, ballSpeed);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        ballImg.body.velocity.set(0);
    }
    
    startFootballer();
}

function onResize(){
    w = window.innerWidth;
    h = window.innerHeight;
    background.width = w;
    background.height = w * 1.5;	
    ballImg.width = ballImg.width * 4 / w;
    ballImg.height = ballImg.height * 4 / w;	
}


function touchListener (pointer) {
    targetX = pointer.x;
    targetY = pointer.y;
}

function clickListener () {
    targetX = game.input.mousePointer.x;
    targetY = game.input.mousePointer.y;
}

// Function that launch footballer when the ball is close
function startFootballer() {
    if (!isOneMove && ballImg.y < footballerOne.y + w / 5) {
        game.physics.arcade.moveToXY(footballerOne, ballImg.x, ballImg.y, oneSpeed);
        isOneMove = true;
    }
    else if (!isSecondMove && ballImg.y < footballerTwo.y + w / 5) {
        game.physics.arcade.moveToXY(footballerTwo, ballImg.x, ballImg.y, oneSpeed);
        isSecondMove = true;
    }
    else if (!isThirdMove && ballImg.y < footballerThree.y + w / 4) {
        game.physics.arcade.moveToXY(footballerThree, ballImg.x, ballImg.y, twoSpeed);
        isThirdMove = true;
    }
    else if (!isFourMove && ballImg.y < footballerFour.y + w / 4) {
        game.physics.arcade.moveToXY(footballerFour, ballImg.x, ballImg.y, threeSpeed);
        isFourMove = true;
    }
    else if (!isFiveMove && ballImg.y < footballerFive.y + w / 8) {
        game.physics.arcade.moveToXY(footballerFive, ballImg.x, ballImg.y, threeSpeed);
        isFiveMove = true;
    }
}
