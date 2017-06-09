const fs = require('fs');
fs.readFile('~/Downloads/itertools-combinations.json', 'utf8', function(err, data) {
  if(err) throw err;
  var scriptData = JSON.parse(data);
})
console.log(scriptData);
