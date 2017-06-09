const fs = require('fs');
const home = process.env.HOME;
const filePath = '/Downloads/itertools-combinations.json';
console.log(home);
var scriptData;
fs.readFile(home + filePath, 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  console.log(scriptData);
})
