var fs = require('fs');
var request = require('request');


module.exports = {
  pwd: function(fileName, done){
    var output = '';
    output += process.cwd();
    done(output);
  },
  date: function(fileName, done){
    var output = '';
    var today = new Date();
    output += today.toString();
    done(output);
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
  cat: function(fileArr, done) {
    var output = '';
    var myFileContent = '';
    fileArr.forEach(function(file){
      fs.readFile(file, function(err, data){
        if (err) throw err;
        myFileContent = data;
        //console.log("myFileContent: ", myFileContent);
        output += myFileContent.toString();
        //console.log('my output: ', output);
        done(output);
      });

    });

  },
  head: function(fileArr, done){
    var output = '';
    fs.readFile(fileArr[0], function(err, data){
      if (err) throw err;

      var fileLine = data.toString().split('\n');
      var fileLen = fileLine.slice(0, 5);
      fileLen.forEach(function(line){
        output += line.toString() + '\n';

      });
      done(output);
    });

  },
  tail: function(fileArr, done){
    var output = '';
    fs.readFile(fileArr[0], function(err, data){
      if (err) throw err;

      var fileLine = data.toString().split('\n');
      var fileLen = fileLine.slice(fileLine.length - 6);
      fileLen.forEach(function(line){
        output += line.toString() + '\n';
      });
      done(output);
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

