var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();

var toUpper = through(function(buf) {
	this.queue(buf.toString().toUpperCase());
});

var loud = tr.select('.loud').createStream()
loud.pipe(toUpper).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);
