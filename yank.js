
var outCode = '';
$(".CodeMirror-code div pre > span").each(function() {
  outCode += this.textContent + '\n';
});
var pathArray = [];
$(".bcrumb span").each(function() {
  pathArray.push(this.textContent);
});
var urlArray = window.location.pathname.split('/');
if(urlArray[3] === 'submissions') {
  var lang = $(".pull-left .msT").text().replace(/^\s+|\s+$/g,'').split(' ')[1];
  var spot = $(".submissions-details .pull-left p");

} else {
  var lang = $(".select2-container span").text().split(' ')[0];
  var spot = $(".grey-header div:nth-child(5)");
}
var ext = '';
if(lang === 'Python' || lang === 'Pypy') {
  ext = '.py';
} else if(lang === 'JavaScript') {
  ext = '.js';
}
var filename = urlArray[2] + ext;
var spotText = spot.text();
spot.html("<a>" + spotText + "</a>");
tag = spot.find("a");
tag.attr("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(outCode));
tag.attr("download", filename);
