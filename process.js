const fs = require('fs');
const home = process.env.HOME;
console.log(home);
var scriptData;
fs.readFile(home + '/Downloads/itertools-combinations.json', 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  console.log(scriptData);
})
