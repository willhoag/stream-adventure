var combine = require('stream-combiner');
var zlib = require('zlib');
var split = require('split');
var through = require('through');

module.exports = function () {
  var list = undefined
  return combine(
	// make through stream to read newline-separated json,
    split(),
	// make through stream to group books into genres,
    through(function writeable (line) {
      if (!line) return
      line = JSON.parse(line)
      if(line.type === 'genre') {
        if (list) this.queue(JSON.stringify(list) + '\n')
        list = {name: line.name, books: []}
      }
      if(line.type === 'book') {
        list.books.push(line.name)
      }
    }, function end () {
      if (list) this.queue(JSON.stringify(list) + '\n')
      this.queue(null)
    }),
	// make through stream that gzips the output
    zlib.createGzip()
  )
}

