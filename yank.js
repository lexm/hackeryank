var outCode = "";
$(".CodeMirror-code div pre > span").each(function() {
  outCode += this.textContent + "\n";
});
var pathArray = [];
$(".bcrumb span").each(function() {
  pathArray.push(this.textContent);
});
var lang1 = $(".select2-container span").text();
var lang2 = $(".pull-left .msT").text().split(' ')[1];
var urlArray = window.location.pathname.split('/');
var fName = urlArray[2];
