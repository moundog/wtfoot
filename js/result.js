var images = ["zlatan", "Hazard", "ronaldo", "cech", "rakitic", "lewandowski", "iniesta", "sergioramos", "buffon", "pogba", "benzema", "rooney", "bale", "thomasmueller", "lichtsteiner", "shaqiri"];


var p = ["Zlatan Ibrahimovic", "Eden Hazard", "Cristiano Ronaldo", "Petr Cech", "Ivan Rakitic", "Robert	Lewandowski", "Andres Iniesta", " Sergio Ramos", "Gianluigi Buffon", "Paul Pogba", "Karim Benzema", "Wayne Rooney", "Gareth Bale", "Thomas Mueller", "Stephan Lichtsteiner", "Xherdan Shaqiri"];


function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
    return "";
}

window.onload = function () {
    var result = getQueryVariable("result");
    document.getElementById("picture").src = "img/footballer/" + images[result] + ".jpg";
    document.getElementById("result-name").innerHTML = capitalizeFirstLetter(images[result]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}