var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function (cmd, args) {
	stream = spawn(cmd, args)
	return duplexer(stream.stdin, stream.stdout);
};
