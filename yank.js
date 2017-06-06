var SolutionData = function(pathArray, filename) {
  pathArray.shift();
  this.progName = pathArray.pop();
  this.breadcrumb = pathArray.join('/');
  this.message = 'Solution to ' + pathArray.join(' > ') + ' > ' + this.progName;
  this.filename = filename;
  this.outCode = [];
  this.addCode = function(text) {
    this.outCode.push(text);
  }
}

SolutionData.prototype.genScript = function() {
  script = '#!/bin/bash\n';
  script += 'HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code\n';
  script += 'BCRUMB=' + this.breadcrumb + '\n';
  script += 'CODE_FILENAME=' + this.filename + '\n';
  script += 'if [ ! -d $HACKERRANK_REPO ]; then\n';
  script += '  echo $HACKERRANK_REPO does not exist;\n';
  script += 'elif [ ! -d $HACKERRANK_REPO/.git ]; then\n';
  script += '  echo $HACKERRANK_REPO is not a git repo;\n';
  script += 'else\n';
  script += '  mkdir -p $HACKERRANK_REPO/$BCRUMB\n';
  script += '  if [ -d $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME ]; then\n';
  script += '    echo $CODE_FILENAME already exists;\n';
  script += '  else\n';
  script += '    touch $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME\n';
  this.outCode.forEach(function(cur) {
    script += '    echo "' + cur + '" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;\n';
  });
  script += ' fi\n';
  script += 'fi\n';
  script += 'cd $HACKERRANK_REPO/$BCRUMB/\n';
  script += 'git add $CODE_FILENAME\n';
  script += 'git commit -m "' + this.message + '"\n'
  return script;
}

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
var scriptName = urlArray[2] + '_solution.sh';
var solution = new SolutionData(pathArray, filename);
$(".CodeMirror-code div pre > span").each(function() {
  solution.addCode(this.textContent);
});

var spotText = spot.text();
spot.html("<a>" + spotText + "</a>");
tag = spot.find("a");
tag.attr("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(solution.genScript()));
tag.attr("download", scriptName);
