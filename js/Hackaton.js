var actualElemPos = 0;
var isFinish = false;
var p = ["Zlatan Ibrahimovic", "Eden Hazard", "Cristiano Ronaldo", "Petr Cech", "Ivan Rakitic", "Robert	Lewandowski", "Andres Iniesta", " Sergio Ramos", "Gianluigi Buffon", "Paul Pogba", "Karim Benzema", "Wayne Rooney", "Gareth Bale", "Thomas Mueller", "Stephan Lichtsteiner", "Xherdan Shaqiri"];

var a = [];
var j = [];
j[0] = [2, 1, 3, 4, 0, 3, 1, 2];
j[1] = [1, 1, 4, 1, 4, 1, 5, 2];
j[2] = [2, 1, 1, 4, 0, 1, 5, 1];
j[3] = [3, 0, 2, 3, 5, 4, 6, 1];
j[4] = [2, 0, 4, 1, 3, 4, 6, 4];
j[5] = [1, 1, 3, 1, 1, 2, 6, 1];
j[6] = [1, 0, 2, 3, 2, 4, 3, 1];
j[7] = [2, 0, 1, 4, 4, 3, 3, 3];
j[8] = [3, 0, 2, 3, 5, 1, 4, 4];
j[9] = [2, 0, 4, 4, 3, 3, 4, 2];
j[10] = [1, 1, 3, 4, 1, 1, 4, 3];
j[11] = [2, 1, 1, 2, 0, 1, 2, 3];
j[12] = [1, 1, 4, 2, 2, 2, 2, 1];
j[13] = [1, 1, 3, 2, 1, 2, 2, 2];
j[14] = [2, 0, 1, 1, 4, 3, 3, 4];
j[15] = [1, 0, 3, 3, 2, 2, 1, 4];
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
    document.location.href = 'result.html?result=' + mm;
}