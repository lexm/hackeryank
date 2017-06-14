const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const stat = Promise.promisify(require('fs').stat);
//const fs = require('fs');
// const exec = require('child_process').exec;
const home = process.env.HOME;
// const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const repo = home + '/nothing/';
const filePath = process.argv[2] || home + '/Downloads/hr_download.json';
console.log('filePath: ', filePath);
var scriptData;
var bcrumb = '';

stat(repo)
// .then(function(stats1) {
//   console.log('stats1: ', stats1);
// })
.then(stat(repo + '.git/'))
.then(function(stats2) {
  console.log('stats2: ', stats2);
})
.catch(function(e) {
  if(e.code === 'ENOENT') {
    console.log('repo ' + repo + ' not found');
  }
})
.catch(function(e) {
  console.log('error 2: ', e);
  if(e.code === 'ENOENT') {
    console.log(repo + ' is not a repo');
  }
});

readFile(filePath, 'utf8')
.then(function(data) {
  scriptData = JSON.parse(data);
  var { pathArray, breadcrumb, message, filename, allCode } = scriptData;
})
.then(function() {
  console.log('pathArray: ', scriptData.pathArray);
  console.log('breadcrumb: ', scriptData.breadcrumb);
  console.log('message: ', scriptData.message);
  console.log('filename: ', scriptData.filename);
  console.log('allCode: ', scriptData.allCode);
})
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
