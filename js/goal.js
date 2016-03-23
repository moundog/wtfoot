var score = 0;
var timeout = null;
var nbShoot = 5;
var goalIsFinish = false;


function startGoalGame() {
    var cw = $('#goal-table').width();
    console.error(cw);
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
        
        timeout = setTimeout( catchBall, 1500 );
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
     document.getElementById("hand-cursor").src = "img/hands.png";
}

function mouseDown() {
    var hand = document.getElementById("hand-cursor");
    hand.src = "img/hands_grab.png";
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
    console.error(offsetTopBall + " : " + offsetLeftBall + " : " + offsetTopHand + " : " + offsetLeftHand);
    if ((offsetTopBall + 40 > offsetTopHand && offsetTopBall - 40 < offsetTopHand) 
        && (offsetLeftBall + 40 > offsetLeftHand && offsetLeftBall - 40 < offsetLeftHand))
        catchBall(true);
    }        
        
$(document).mousemove(function(e){
    $("#hand-cursor").css({left:e.pageX, top:e.pageY});
});