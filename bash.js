var command = require('./command.js');

//output a prompt
process.stdout.write('prompt > ');

//the stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data){
  var cmd = data.toString().trim();
  if (cmd === 'pwd') {
    command.pwd();
  }
  if (cmd === 'date') {
    command.date();
  }
  if (cmd === 'ls') {
    command.ls();
  }
  var array = cmd.split(' ');
  if (array[0] === 'echo') {
    process.stdout.write(array.slice(1).join(' ').toString());
  }
  if (array[0] === 'cat') {
    command.cat(array.slice(1));
    // process.stdout.write('prompt > ');
  }
  if (array[0] === 'head'){
    command.head(array.slice(1));
  }
  if (array[0] === 'tail'){
    command.tail(array.slice(1));
  }
  if (array[0] === 'curl'){
    command.curl(array.slice(1));
  }
  else {
    process.stdout.write('You typed: ' + cmd);
  }
  process.stdout.write('\nprompt > ');
});
