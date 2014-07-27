'use strict';

var util = require('util');
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var through = require('through2');
var Promise = require('bluebird');
var extend = require('xtend');

module.exports = function(name, callback, defaults) {

  return function(options) {

    var config = extend(defaults, options);

    function transform(file, encoding, next) {

      var emit = this.emit;

      if(file.isNull()) {
        return next(null, file); // pass along
      }

      Promise.resolve(callback.call(this, file, config))
      .then(function() {
        if(config.debug) {
          gutil.log(util.format('Processed \'%s\' through %s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta(name)));
        }
        next(null, file);
      })
      .catch(function(err) {
        if(config.safe) {
          return gutil.log(util.format('Encountered the following error while processing \'%s\' through %s\n%s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta('jade'), chalk.red(err)));
        }
        emit('error', new gutil.PluginError(name, err));
      });

    }

    return through.obj(transform);

  }

};
