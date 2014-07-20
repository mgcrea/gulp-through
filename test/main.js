var pkg = require('../package.json');
var through = require('../' + pkg.main);
var path = require('path');
var extend = require('xtend');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
var should = require('should');
var sinon = require('sinon');
require('mocha');

describe('gulp-through', function() {

  var defaults = {
    path: '/tmp/test/fixture/baz.js',
    cwd: '/tmp/test/',
    base: '/tmp/test/fixture/'
  };

  beforeEach(function() {
  });

  describe('gulp-through()', function() {

    it('should be correctly called', function(done) {

      var fixture = new File(extend(defaults, {contents: new Buffer('foo();')}));

      var spy = sinon.spy();
      var transform = through('test', spy);
      var stream = transform();
      stream.on('data', function(){});
      stream.once('end', done);
      stream.write(fixture);
      spy.called.should.equal.true;
      stream.end();

    });

    it('should pass through files', function(done) {

      var fixture = new File(extend(defaults, {contents: new Buffer('foo();')}));

      var transform = through('test', function(file, config) {
        should.exist(file);
        should.exist(file.path);
        should.exist(file.relative);
        should.exist(file.contents);
        should.equal(file.contents.toString(), 'foo();');
        file.path.should.equal('/tmp/test/fixture/baz.js');
        file.relative.should.equal('baz.js');
      });
      var stream = transform();
      stream.on('data', function(){});
      stream.once('end', done);
      stream.write(fixture);
      stream.end();

    });

    it('should merge defaults', function(done) {

      var fixture = new File(extend(defaults, {contents: new Buffer('foo();')}));

      var transform = through('test', function(file, config) {
        config.should.containDeep({foo: 'baz', qux: true});
      }, {foo: 'bar'});
      var stream = transform({foo: 'baz', qux: true});
      stream.on('data', function(){});
      stream.once('end', done);
      stream.write(fixture);
      stream.end();

    });

  });

});
