var fs = require('fs');
var request = require('request');


module.exports = {
  pwd: function(){
    process.stdout.write(process.cwd());
  },
  date: function(){
    var today = new Date();
    process.stdout.write(today.toString());
  },
  ls: function(file, done){
    var output = "";
    fs.readdir('.', function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        output += file.toString() + '\n';
      });
      done(output);
    });
  },
  cat: function(fileArr) {
    var myFileContent = '';
    fileArr.forEach(function(file){
      fs.readFile(file, function(err, data){
        if (err) throw err;
        myFileContent = data;
        //console.log("myFileContent: ", myFileContent);
        process.stdout.write(myFileContent.toString());
        if (fileArr.indexOf(file) === fileArr.length - 1) {
          process.stdout.write('prompt > ');
        }
      });
    });
  },
  head: function(fileArr){
    fs.readFile(fileArr[0], function(err, data){
      if (err) throw err;

      var fileLine = data.toString().split('\n');
      var fileLen = fileLine.slice(0, 5);
      fileLen.forEach(function(line){
        process.stdout.write(line.toString() + '\n');
      });
      process.stdout.write('prompt > ');
    });
  },
  tail: function(fileArr){
    fs.readFile(fileArr[0], function(err, data){
      if (err) throw err;

      var fileLine = data.toString().split('\n');
      var fileLen = fileLine.slice(fileLine.length - 6);
      fileLen.forEach(function(line){
        process.stdout.write(line.toString() + '\n');
      });
      process.stdout.write('prompt > ');
    });
  },
  curl: function(httpReq) {
    request(httpReq[0], function(error, response, body){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
    process.stdout.write('prompt > ');
  }
};

