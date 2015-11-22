var through = require('through');
var split = require('split');
var i = 1;
var result;
process.stdin
	.pipe(split())
	.pipe( through(function(line) {
		if (i > 0) {
			i = 0;
			result = line.toString().toLowerCase();
		} else { 
			i = 1; 
			result = line.toString().toUpperCase();
		}
		this.queue(result + '\n');
	}))
	.pipe(process.stdout);
