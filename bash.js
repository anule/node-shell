// var command = require('./command.js');

// var done = function(output){
//   process.stdout.write(output);
//   process.stdout.write('prompt > ');
// }
// //output a prompt
// process.stdout.write('prompt > ');

// //the stdin 'data' event fires after a user types in a line
// process.stdin.on('data', function(data){
//   var cmd = data.toString().trim();
//   var cmdArr = cmd.split(' ');
//   command[cmdArr[0]](cmdArr.slice(1), done);

//   if (cmdArr[0] === 'curl'){
//     command.curl(cmdArr.slice(1));
//   }
//  // process.stdout.write('You typed: ' + cmd);
// });

//PIPELINE

var command = require('./command.js');

var done = function(output){
  process.stdout.write(output);
  if (cmdArrList.length > 1) {
    if (cmdArrList[1].includes(' ')) {//[cat bash.js, head]
      var headArg = cmdArrList[1].split(' ');
      command[headArg[0]](headArg[1], done);
    }
    command[cmdArrList[1]](output, fileArr, done);
  }
  process.stdout.write('prompt > ');
}
//output a prompt
process.stdout.write('prompt > ');

//the stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data){
  var cmd = data.toString().trim();// cmd = cat bas.js| head
  var cmdArrList = cmd.split(/\s*\|\s*/g);// [cat bash.js, head]
  var cmdArr = cmdArrList[0].split(' ');  //[cat, bash.js]
  command[cmdArr[0]](cmdArr.slice(1), done); //command[cat](bash.js)

  if (cmdArr[0] === 'curl'){
    command.curl(cmdArr.slice(1));
  }
 // process.stdout.write('You typed: ' + cmd);
});

