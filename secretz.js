var crypto = require('crypto')
var through = require('through')
var zlib = require('zlib')
var tar = require('tar')
var path = require('path')

var stream = crypto.createDecipher(process.argv[2], process.argv[3])
var parser = tar.Parse()

process.stdin
  .pipe(stream)
  .pipe(zlib.createGunzip())
  .pipe(parser)

parser.on('entry', function (e) {
  if (!(e.type === 'File')) return
  var hash = crypto.createHash('md5', { encoding: 'hex' })
  e.pipe(hash)
  .pipe(through(function (hash) {
    this.queue(hash + ' ' + e.path + '\n')
  }))
  .pipe(process.stdout)
})

