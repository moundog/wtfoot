var score = 0;
var timeout = null;
var nbShoot = 5;
var goalIsFinish = false;
var shotSpeed = 1500;
var decrementSpeed = 150;


function startGoalGame() {
    var cw = $('#goal-table').width();
    $('#goal-table').css({
        'height': Math.round(cw / 2) + 'px'
    });
    setTimeout( generateBombs, 2000 );
}

    function generateBombs()
    {
        nbShoot--;
        if (nbShoot < 0) {
            if (!goalIsFinish)
                setTimeout( storeAnswerGoal(score), 1000 );
            goalIsFinish = true;
            return;
        }
            
        if (timeout != null)
            clearTimeout(timeout);
        
        if (document.getElementById("ball-catch") != null) {
            
        }
        
        var targetTable = document.getElementById("goal-table"),
            x,
            y;

        y = Math.floor(Math.random() * 8);
        x = Math.floor(Math.random() * 4);
        elem = targetTable.getElementsByTagName('tr')[x]
            .getElementsByTagName('td')[y];
        
        elem.innerHTML = '<img src="img/ball.png" width="100%" id="ball-catch" onclick="catchBall(true)"/>';
        
        timeout = setTimeout( catchBall, shotSpeed );
        shotSpeed -= decrementSpeed;
    }

    function catchBall(isClick) {
        if (timeout != null)
            clearTimeout(timeout);
        if (isClick)
            score++;
        var el = document.getElementById("ball-catch");
        el.parentElement.removeChild(el);
        timeout = setTimeout( generateBombs, 500 );
        document.getElementById("score-goal-contener").innerHTML = score;
    }

function mouseUp() {
     document.getElementById("hand-cursor").style.width = "10%";
}

function mouseDown() {
    var hand = document.getElementById("hand-cursor");
    hand.style.width = "8%";
    clickBall();
}

function clickBall() {
    var hand = document.getElementById("hand-cursor");
    var ball = document.getElementById("ball-catch");
    var bodyRect = document.body.getBoundingClientRect(),
    handRect = hand.getBoundingClientRect(),
    ballRect = ball.getBoundingClientRect(),
    offsetTopBall   = ballRect.top - bodyRect.top
    offsetLeftBall   = ballRect.left - bodyRect.top
    offsetTopHand   = handRect.top - bodyRect.top
    offsetLeftHand   = handRect.left - bodyRect.top;
    if ((offsetTopBall + 40 > offsetTopHand && offsetTopBall - 40 < offsetTopHand) 
        && (offsetLeftBall + 40 > offsetLeftHand && offsetLeftBall - 40 < offsetLeftHand))
        catchBall(true);
    }        
        
$(document).mousemove(function(e){
    $("#hand-cursor").css({left:e.pageX, top:e.pageY});
});