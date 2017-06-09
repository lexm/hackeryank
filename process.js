const fs = require('fs');
var scriptData;
fs.readFile('~/Downloads/itertools-combinations.json', 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
})
console.log(scriptData);
