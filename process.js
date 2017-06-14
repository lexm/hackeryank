const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const filePath = process.argv[2] || home + '/Downloads/hr_download.json';
console.log(filePath);
var scriptData;
fs.readFile(filePath, 'utf8', function(err, data) {
  if(err) throw err;
  scriptData = JSON.parse(data);
  var { breadcrumb, message, filename, allCode} = scriptData;
  console.log(message);
  fs.stat(repo, function(err, stats) {
    if(err) throw err;
    fs.stat(repo + breadcrumb, function(err2, stats2) {
      if(err2.code === 'ENOENT') {
        console.log('repo ' + repo + ' not found');
      }
      console.log(repo + breadcrumb);
      console.log(stats2);
    });
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
  });
});
