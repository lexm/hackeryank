function downloadCode(code, fname) {
  var link = '<a href="data:text/html,' + code + '" download="' + fname + '">'
  $(".grey-header div:nth-child(5)").append(link);
}

var outCode = '';
$(".CodeMirror-code div pre > span").each(function() {
  outCode += this.textContent + '\n';
});
var pathArray = [];
$(".bcrumb span").each(function() {
  pathArray.push(this.textContent);
});
var ext = '';
var lang1 = $(".select2-container span").text().split(' ')[0];
var lang2 = $(".pull-left .msT").text().split(' ')[1];
var lang = lang1 ? lang1 : lang2;
if(lang === 'Python' || lang === 'Pypy') {
  ext = '.py';
}
var urlArray = window.location.pathname.split('/');
var filename = urlArray[2] + ext;
