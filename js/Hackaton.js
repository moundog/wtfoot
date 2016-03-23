var actualElemPos = 0;
var isFinish = false;
var p = ["Eden Hazard", "Petr Čech"];
var a = [];
var j = [];
j[0] = [1, 1, 3];
j[1] = [3, 1, 5];
var r = [];
for (var l = 0; l < j.length; l++) {
    r[l] = [];
}
var t = [];

window.onload = function () {
    $('.question').hide();
    $('.question:eq(' + actualElemPos + ')').fadeIn(0);
}

function nextElement() {
    if (isFinish)
        return;
    $('.question:eq(' + actualElemPos + ')').fadeOut(500);
    actualElemPos++;
    if ($('.question').length - 1 < actualElemPos) {
        alert("Finish");
        isFinish = true;
        getResult();
        return;
    }
    setTimeout( showElem, 500 );
}

function showElem() {
    $('.question:eq(' + actualElemPos + ')').fadeIn(500);
    if ($('.question:eq(' + actualElemPos + ')').attr('id') == "goal-game")
        startGoalGame();
}

function storeAnswer(e) {
    a.push($(e).attr("value"));
    nextElement();
}

function storeAnswerStratGame(v) {
    a.push(v);
    nextElement();
}

function storeAnswerGoal(v) {
    a.push(v);
    nextElement();
}

function getResult() {
    for (var i = 0; i < j.length; i++) {
        for (var k = 0; k < a.length; k++) {
            r[i][k] = Math.abs(a[i] - j[i][k]);
        }
        var m = 0;
        $.each(r[i], function() {
            m += this;
        });
        t.push(m);
    }
    var mm = t.indexOf(Math.min.apply(Math, t));
    console.log(p[mm]);
}