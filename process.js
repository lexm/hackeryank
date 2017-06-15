const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
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
let fullPath = makeCodeDir(repo, pathArray);
fs.writeFile(fullPath + filename, allCode, function(err){
  if(err) throw err;
  console.log('File ' + filename + ' written');
  exec('cd ' + repo + breadcrumb + '/;git add ' + filename, function(error) {
    if(error) console.error(error);
    exec('cd ' + repo + breadcrumb + '/;git commit -m "' + message + '"', function(error) {
      if(error) console.error(error);
    });
  });
});
