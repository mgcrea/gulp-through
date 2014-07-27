'use strict';

var util = require('util');
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var through = require('through2');
var extend = require('xtend');

module.exports = function(name, callback, defaults) {

  return function(options) {

    var config = extend(defaults, options);

    function transform(file, encoding, next) {

      var emit = this.emit;
      function error(err) {
        emit('error', new gutil.PluginError(name, err));
      }

      if(file.isNull()) {
        return next(null, file); // pass along
      }

      try {
        callback.call(this, file, config, function(err) {
          // Gracefully recover from an error
          return gutil.log(util.format('Encountered the following error while processing \'%s\' through %s\n%s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta('jade'), chalk.red(err)));
        });
      } catch(err) {
        return error(err);
      }

      if(config.debug) {
        gutil.log(util.format('Processed \'%s\' through %s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta(name)));
      }

      next(null, file);

    }

    return through.obj(transform);

  }

};
