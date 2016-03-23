var actualElemPos = 0;
var isFinish = false;

window.onload = function () {
    $('.question').hide();
    $('.question:eq(' + actualElemPos + ')').fadeIn(0);
}

function nextElement() {
    if (isFinish)
        return;
    $('.question:eq(' + actualElemPos + ')').fadeOut(500);
    actualElemPos++;
    if (document.getElementById("form-div").getElementsByClassName('question').length - 1 < actualElemPos) {
        alert("Finish");
        isFinish = true;
        return;
    }
    setTimeout( showElem, 500 );
}

function showElem() {
    $('.question:eq(' + actualElemPos + ')').fadeIn(500);
}