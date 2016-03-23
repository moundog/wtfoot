var score = 0;
var timeout = null;
var nbShoot = 6;

window.onload = function () {
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
        document.getElementById("score-contener").innerHTML = "final : " + score;
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
        document.getElementById("score-contener").innerHTML = score;
    }

$(document).mousemove(function(e){
    $("#hand-cursor").css({left:e.pageX, top:e.pageY});
});