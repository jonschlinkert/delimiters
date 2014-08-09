# delimiters [![NPM version](https://badge.fury.io/js/delimiters.png)](http://badge.fury.io/js/delimiters)

> Set and get custom template delimiters.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i delimiters --save-dev
```

## Usage

```js
var delimiters = require('delimiters');
```

## API
### Delimiters

Create a new instance of `Delimiters`, optionally
passing default `options` to use.

**Example:**

```js
var Delimiters = require('delimiters');
var delimiters = new Delimiters();
```

* `options` {Object}: Options to use.   


### .option

Set or get an option.

```js
delimiters.option('a', true)
delimiters.option('a')
// => true
```

* `key` {String} 
* `value` {*}  
* `return` {*} 


### .addDelims

Store delimiters by `name` with the given `options` for later use.

**Example:**

```js
delimiters.addDelims('curly', ['']);
delimiters.addDelims('angle', ['<%', '%>']);
delimiters.addDelims('es6', ['${', '}'], {
  // override the generated regex
  interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
});
```

[delims]: https://github.com/jonschlinkert/delims "Generate regex for delimiters"

* `name` {String}: The name to use for the stored delimiters. 
* `delims` {Array}: Array of delimiter strings. See [delims] for details. 
* `opts` {Object}: Options to pass to [delims]. You can also use the options to override any of the generated delimiters.   


### .useDelims

Specify by `name` the delimiters to make active.

```js
delimiters.useDelims('curly');
delimiters.useDelims('angle');
```

* `name` {String}

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 09, 2014._