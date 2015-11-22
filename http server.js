var through = require('through');
var http = require('http');


var server = http.createServer(function(req, res) {
	if (req.method === 'POST') {
		req.pipe(through(function(buffer) {
			this.queue(buffer.toString().toUpperCase());
		})).pipe(res);
	}
});

server.listen(process.argv[2]);

