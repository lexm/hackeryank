const fs = require('fs');
const home = process.env.HOME;
repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const filePath = process.argv[1];
console.log(filePath);
var scriptData;
fs.readFile(home + filePath, 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  var { breadcrumb, message, filename, allCode} = scriptData;
  console.log(message);
  fs.stat(repo, function(err, stats) {
    if(err) throw err;
    fs.writeFile(repo + breadcrumb + '/' + filename, allCode, function(err){
      if(err) throw err;
      console.log('File ' + filename + ' written');
    });
  });
});
