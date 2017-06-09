const fs = require('fs');
const home = process.env.HOME;
repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const filePath = '/Downloads/itertools-combinations.json';
console.log(repo);
var scriptData;
fs.readFile(home + filePath, 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  console.log(scriptData);
})
