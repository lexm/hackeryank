// const Promise = require('bluebird');
// const readFile = Promise.promisify(require('fs').readFile);
const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
// const repo = home + '/nothing/';
// let repo = home + '/';
const filePath = process.argv[2] || home + '/Downloads/hr_download.json';
console.log('filePath: ', filePath);

const makeCodeDir = function(repo, pathArray) {
  let codeDir = repo;
  while(true) {
    try {
      fs.statSync(codeDir);
    } catch(e) {
      fs.mkdirSync(codeDir);
    }
    if(!pathArray.length) break;
    codeDir += pathArray.splice(0, 1)[0] + '/';
  }
  return codeDir;
};

let scriptData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let { pathArray, breadcrumb, message, filename, allCode} = scriptData;
// console.log('pathArray: ', pathArray);
// console.log('breadcrumb: ', breadcrumb);
// console.log('message: ', message);
// console.log('filename: ', filename);
// console.log('allCode: ', allCode);
let fullPath = makeCodeDir(repo, pathArray);
fs.writeFile(fullPath + filename, allCode, function(err){
  if(err) throw err;
  console.log('File ' + filename + ' written');
  var child1 = exec('cd ' + repo + breadcrumb + '/;git add ' + filename, function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if(error) console.error(error);
    var child2 = exec('cd ' + repo + breadcrumb + '/;git commit -m "' + message + '"', function(error, stdout, stderr) {
      console.log('stdout: ', stdout);
      console.log('stderr: ', stderr);
      if(error) console.error(error);
    });
  });
});
// fs.writeFileSync(fullPath + filename, allCode);
  // });
// });
