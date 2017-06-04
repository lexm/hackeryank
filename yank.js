var outCode = "";
$(".CodeMirror-code div pre > span").each(function() {
  outCode += this.textContent + "\n";
});
var pathArray = [];
$(".bcrumb span").each(function() {
  pathArray.push(this.textContent);
});
var lang1 = $(".select2-container span").text().split(' ')[0];
var lang2 = $(".pull-left .msT").text().split(' ')[1];
var lang = lang1 ? lang1 : lang2;
var urlArray = window.location.pathname.split('/');
var fName = urlArray[2];
