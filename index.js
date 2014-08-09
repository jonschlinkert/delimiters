/*!
 * delimiters <https://github.com/jonschlinkert/delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var _ = require('lodash');
var Delims = require('delims');
var delims = new Delims();


/**
 * ## Delimiters
 *
 * Create a new instance of `Delimiters`, optionally
 * passing default `options` to use.
 *
 * **Example:**
 *
 * ```js
 * var Delimiters = require('delimiters');
 * var delimiters = new Delimiters();
 * ```
 *
 * @class `Delimiters`
 * @param {Object} `options` Options to use.
 * @api public
 */

function Delimiters(options) {
  this.options = options || {};
  this.init();
}


/**
 * Initialize default configuration, or
 * initialize with given `options`.
 *
 * @api private
 */

Delimiters.prototype.init = function(options) {
  var opts = options || this.options;
  this.delims = opts.delims || {};

  this.option('flags', opts.flags || 'g');
  this.option('layoutDelims', opts.layoutDelims || ['{{', '}}']);
  this.option('layoutTag', opts.layoutTag || 'body');

  this.addDelims('default', ['<%', '%>']);
  this.addDelims('es6', ['${', '}'], {
    interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
  });
};


/**
 * ## .option
 *
 * Set or get an option.
 *
 * ```js
 * delimiters.option('a', true)
 * delimiters.option('a')
 * // => true
 * ```
 *
 * @method option
 * @param {String} `key`
 * @param {*} `value`
 * @return {*}
 * @api public
 */

Delimiters.prototype.option = function(key, value) {
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeof key === 'string') {
    return this.options[key];
  }

  if (typeof key === 'object' && !Array.isArray(key)) {
    _.extend.apply(_, [this.options].concat(args));
    return this;
  }

  this.options[key] = value;
  return this;
};


/**
 * ## .makeTag
 *
 * Generate the default body tag to use as a
 * fallback, based on the `tag` and `delims`
 * defined in the options.
 *
 * @param  {Object} options
 * @return {String} The actual body tag, e.g. `{{ body }}`
 * @api private
 */

Delimiters.prototype.makeTag = function (options) {
  var opts = _.extend({}, this.options, options);

  return [
    opts.delims[0],
    opts.tag,
    opts.delims[1]
  ].join(opts.sep || ' ');
};


/**
 * ## .makeRegex
 *
 * Return a regular expression for the "body" tag based on the
 * `tag` and `delims` defined in the options.
 *
 * @param  {Object} `options`
 * @return {RegExp}
 * @api private
 */

Delimiters.prototype.makeRegex = function (options) {
  var opts = _.extend({sep: '\\s*'}, this.options, options);
  var tag = this.makeTag(opts).replace(/[\]()[{|}]/g, '\\$&');
  return new RegExp(tag, opts.flags);
};


/**
 * ## .makeDelims
 *
 * Pass custom delimiters to Lo-Dash.
 *
 * **Example:**
 *
 * ```js
 * delimiters.makeDelims(['{%', '%}'], ['{{', '}}'], opts);
 * ```
 *
 * @param  {Array} `delims` Array of delimiters.
 * @param  {Array} `layoutDelims` layout-specific delimiters to use. Default is `['{{', '}}']`.
 * @param  {Object} `options` Options to pass to [delims].
 * @api private
 */

Delimiters.prototype.makeDelims = function (delimiters, options) {
  var settings = _.defaults({escape: true}, options);
  return _.extend(delims.templates(delimiters, settings), options);
};


/**
 * ## .addDelims
 *
 * Store delimiters by `name` with the given `options` for later use.
 *
 * **Example:**
 *
 * ```js
 * delimiters.addDelims('curly', ['{%', '%}']);
 * delimiters.addDelims('angle', ['<%', '%>']);
 * delimiters.addDelims('es6', ['${', '}'], {
 *   // override the generated regex
 *   interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
 * });
 * ```
 *
 * [delims]: https://github.com/jonschlinkert/delims "Generate regex for delimiters"
 *
 * @param {String} `name` The name to use for the stored delimiters.
 * @param {Array} `delims` Array of delimiter strings. See [delims] for details.
 * @param {Object} `opts` Options to pass to [delims]. You can also use the options to
 *                        override any of the generated delimiters.
 * @api public
 */

Delimiters.prototype.addDelims = function (name, delimiters, opts) {
  var delims = this.makeDelims(delimiters, opts);
  this.delims[name] = _.defaults({}, opts, delims);
  return this;
};


/**
 * ## .getDelims
 *
 * The `name` of the stored delimiters to pass to the current delimiters engine.
 * The engine must support custom delimiters for this to work.
 *
 * @param  {Array} `name` The name of the stored delimiters to pass.
 * @api private
 */

Delimiters.prototype.getDelims = function(name) {
  if(this.delims.hasOwnProperty(name)) {
    return this.delims[name];
  }
  name = this.currentDelims || 'default';
  return this.delims[name];
};


/**
 * ## .useDelims
 *
 * Specify by `name` the delimiters to make active.
 *
 * ```js
 * delimiters.useDelims('curly');
 * delimiters.useDelims('angle');
 * ```
 *
 * @param {String} `name`
 * @api public
 */

Delimiters.prototype.useDelims = function(name) {
  return this.currentDelims = name;
};


/**
 * ## .assertDelims
 *
 * Return `true` if delimiters are found in the given `str`.
 *
 * @param  {String} `str`
 * @return {Boolean}
 * @api private
 */

Delimiters.prototype.assertDelims = function (str, re) {
  re = re || this.getDelims();

  return re ? str.indexOf(re.delims[0]) !== -1 &&
    str.indexOf(re.delims[1]) !== -1 :
    str.indexOf('<%') !== -1 ||
    str.indexOf('${') !== -1;
};


module.exports = Delimiters;
