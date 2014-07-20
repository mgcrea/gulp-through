# gulp-through [![Build Status](https://secure.travis-ci.org/mgcrea/gulp-through.png?branch=master)](http://travis-ci.org/#!/mgcrea/gulp-through)

> Gulp stream transform factory that enables quick and easy gulp integration of any NodeJS library into your Gulp workflow.
> You can directly link against used libraries (uglify, less, etc.) instead of relying on basic gulp wrappers (often outdated).


## Getting Started

This plugin requires Gulp `^3.0.0`

If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a [Gulpfile](https://github.com/gulpjs/gulp/blob/master/docs/API.md) as well as install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-through --save-dev
```

Once the plugin has been installed, it may be required inside your Gulpfile with this line of JavaScript:

```js
var through = require('gulp-through');
```


## Usage

```javascript
var through = require('gulp-through');
var less = require('less');

var gulpLess = through('less', function(file, config) {
  less.render(String(file.contents), config, function(err, result) {
    if(path.extname(file.path) !== '.less') return;
    if(err) return this.emit('error', new gutil.PluginError('less', err));
    file.contents = new Buffer(result);
    file.path = gutil.replaceExtension(file.path, '.css');
  });
}, defaults);
```

## Options

#### name (String)

- Name of the transform (for logging and error purposes).

#### callback (Function)

- `Function` - Callback to transform streamed File objects.

#### defaults (Objects)

- `Object` - Defaults to be merged with given options as a config object provided to the callback.
- Default: `{}`


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea


## Copyright and license

    The MIT License

    Copyright (c) 2014 Olivier Louvignes

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
