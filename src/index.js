'use strict';

var util = require('util');
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var through = require('through2');
var Promise = require('bluebird');

module.exports = function(name, callback, config) {

  if (!config) {
    config = {};
  }

  return function() {

    var args = [].slice.call(arguments);
    if(!args.length || typeof args[args.length - 1] !== 'object') args.push({});

    function transform(file, encoding, next) {
      /* jshint validthis:true */

      if(file.isNull()) {
        return next(null, file); // pass along
      }

      Promise.bind(this)
      .then(function() {
        return callback.apply(this, [file].concat(args));
      })
      .then(function() {
        if(config.debug) {
          gutil.log(util.format('Processed \'%s\' through %s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta(name)));
        }
        next(null, file);
      })
      .catch(function(err) {
        if(config.safe) {
          gutil.log(util.format('Encountered the following error while processing \'%s\' through %s\n%s', chalk.cyan(path.relative(process.cwd(), file.path)), chalk.magenta(name), chalk.red(err.stack || err)));
          return;
        }
        this.emit('error', new gutil.PluginError(name, err));
      });

    }

    return through.obj(transform);

  };

};
