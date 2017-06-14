const Promise = require('bluebird');
// const readFile = Promise.promisify(require('fs').readFile);
const fs = require('fs');
// const stat = Promise.promisify(require('fs').stat);
//const fs = require('fs');
// const exec = require('child_process').exec;
const home = process.env.HOME;
// const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
// const repo = home + '/nothing/';
let repo = home + '/';
const filePath = process.argv[2] || home + '/Downloads/hr_download.json';
console.log('filePath: ', filePath);



// var scriptData;
// var bcrumb = '';

const makeCodeDir = function(repo, pathArray) {
  let codeDir = repo;
  while(true) {
    let stats = fs.statSync(codeDir);
    if(!stats.isDirectory) {
      console.error('repo ' + codeDir + ' does not exist');
      return null;
    }
    if(!filePath.length) break;
    codeDir += filePath.splice(0, 1)[0];
  }
  return codeDir;
};

let scriptData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let { pathArray, breadcrumb, message, filename, allCode} = scriptData;
console.log('pathArray: ', pathArray);
console.log('breadcrumb: ', breadcrumb);
console.log('message: ', message);
console.log('filename: ', filename);
console.log('allCode: ', allCode);

// stat(repo)
// .then(function(stats1) {
//   // console.log('stats1: ', stats1);
//   return stat(repo + '.git/');
// })
// // .then(stat(repo + '.git/'))
// .then(function(stats2) {
//   // console.log('stats2: ', stats2);
// })
// .catch(function(e) {
//   // console.error('error 1: ', e);
//   // if(e.code === 'ENOENT') {
//   //   // console.log('repo ' + repo + ' not found');
//     throw e;
//   // }
// })
// .catch(function(e) {
//   console.log('error 2: ', e);
//   if(e.code === 'ENOENT') {
//     console.log(repo + ' is not a repo');
//   }
// })
// .catch(function(e) {
//   console.log('error 3: ', e);
// });

// readFile(filePath, 'utf8')
// .then(function(data) {
//   scriptData = JSON.parse(data);
//   var { pathArray, breadcrumb, message, filename, allCode } = scriptData;
// })
// .then(function() {
//   console.log('pathArray: ', scriptData.pathArray);
//   console.log('breadcrumb: ', scriptData.breadcrumb);
//   console.log('message: ', scriptData.message);
//   console.log('filename: ', scriptData.filename);
//   console.log('allCode: ', scriptData.allCode);
// })
// fs.readFile(filePath, 'utf8', function(err, data) {
//   if(err) throw err;
//   scriptData = JSON.parse(data);
//   var { breadcrumb, message, filename, allCode} = scriptData;
//   console.log(message);
//   fs.stat(repo, function(err, stats) {
//     if(err) throw err;
//     fs.stat(repo + breadcrumb, function(err2, stats2) {
//       if(err2 && err2.code === 'ENOENT') {
//         console.log('repo ' + repo + ' not found');
//       }
//       console.log(repo + breadcrumb);
//       console.log(stats2);
//     });
    // fs.writeFile(repo + breadcrumb + '/' + filename, allCode, function(err){
    //   if(err) throw err;
    //   console.log('File ' + filename + ' written');
    //   var child1 = exec('cd ' + repo + breadcrumb + '/;git add ' + filename, function(error, stdout, stderr) {
    //     console.log('stdout: ', stdout);
    //     console.log('stderr: ', stderr);
    //     if(error) console.error(error);
    //     var child2 = exec('cd ' + repo + breadcrumb + '/;git commit -m "' + message + '"', function(error, stdout, stderr) {
    //       console.log('stdout: ', stdout);
    //       console.log('stderr: ', stderr);
    //       if(error) console.error(error);
    //     });
    //   });
    // });
//   });
// });
