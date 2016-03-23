window.onload = function () {
    setTimeout( showFirst, 500 );
    setTimeout( showSecond, 1000 );
    setTimeout( showThird, 1800 );
    setTimeout( showRest, 3300 );
}

function showFirst() {
    document.getElementById("what").style.display = "block";
}
function showSecond() {
    document.getElementById("the").style.display = "block";
}
function showThird() {
    document.getElementById("foot").style.display = "block";
    document.getElementById("foot").style.width = "150%";
    document.getElementById("foot").style.marginLeft = "-25%";
    $("#foot").animate({width: "75%", marginLeft: "12.5%"}, 1500 );
}
function showRest() {
    document.getElementById("rest").className = "restV";
}