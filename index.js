'use strict';

var extend = require('extend-shallow');
var makeDelims = require('delimiter-regex');

/**
 * Expose `Delimiters`
 */

module.exports = Delimiters;

/**
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

function Delimiters() {
  this.delims = {};
}

/**
 * Pass custom delimiters to Lo-Dash.
 *
 * **Example:**
 *
 * ```js
 * delims.makeDelims(['${', '}'], {
 *   // override the generated regex
 *   interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
 * });
 * ```
 *
 * @param  {Array} `arr` Array of delimiters.
 * @param  {Object} `settings` Override specific generated delimiters with custom values.
 * @api public
 */

Delimiters.prototype.makeDelims = function(arr, settings) {
  var res = {original: arr};
  res.escape = makeDelims(arr[0] + '-', arr[1], settings);
  res.evaluate = makeDelims(arr[0], arr[1], settings);
  res.interpolate = makeDelims(arr[0] + '=', arr[1], settings);
  return res;
};

/**
 * Cache delimiters by `ext` with the given `options` for later use.
 *
 * **Example:**
 *
 * ```js
 * delims.setDelims('curly', ['{%', '%}']);
 * delims.setDelims('angle', ['<%', '%>']);
 * delims.setDelims('es6', ['${', '}'], {
 *   // override the generated regex
 *   interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
 * });
 * ```
 *
 * @param {String} `ext` The name to use for the stored delimiters.
 * @param {Array} `arr` Array of delimiter strings.
 * @api public
 */

Delimiters.prototype.setDelims = function(ext, arr, settings) {
  if (typeof ext !== 'string') {
    throw new Error('setDelims expects a string for `ext`');
  }

  var res = {orig: null, interpolate: null, evaluate: null, escape: null};
  if (Array.isArray(arr)) {
    res = extend({}, this.makeDelims(arr, settings));
  } else if (arr instanceof RegExp) {
    res = extend(res, {interpolate: arr});
  } else if (typeof arr === 'string') {
    res = extend(res, {interpolate: new RegExp(arr, 'g')});
  } else if (typeof arr === 'object') {
    res = extend(res, arr, settings);
  }

  this.delims[ext] = res;
  return this;
};

/**
 * The `ext` of the stored delimiters to pass to the current delimiters engine.
 * The engine must support custom delimiters for this to work.
 *
 * @param  {Array} `ext` The ext of the stored delimiters to pass.
 * @api private
 */

Delimiters.prototype.getDelims = function(ext) {
  if(this.delims.hasOwnProperty(ext)) {
    return this.delims[ext];
  }
  ext = this.currentDelims || 'default';
  return this.delims[ext];
};

/**
 * Specify by `ext` the delimiters to make active.
 *
 * ```js
 * delimiters.useDelims('curly');
 * delimiters.useDelims('angle');
 * ```
 *
 * @param {String} `ext`
 * @api public
 */

Delimiters.prototype.useDelims = function(ext) {
  return this.currentDelims = ext;
};
