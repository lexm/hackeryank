const fs = require('fs');
const home = process.env.HOME;
repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const filePath = '/Downloads/hr_download.json';
console.log(repo);
var scriptData;
fs.readFile(home + filePath, 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  var { breadcrumb, message, filename, allCode} = scriptData;
  fs.stat(repo, function(err, stats) {
    if(err) throw err;
    fs.writeFile(repo + filename, allCode, function(err){
      if(err) throw err;
      console.log('File ' + filename + ' written');
    })
  })
})
