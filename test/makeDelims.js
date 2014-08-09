/*!
 * delims <https://github.com/jonschlinkert/delims>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var Delimiters = require('..');
var _ = require('lodash');

describe('.makeDelims():', function () {
  it('should make delimiters', function () {
    var delimiters = new Delimiters();

    var delims = delimiters.makeDelims(['[[', ']]']);
    delims.should.eql({
      beginning: '',
      matter: '([\\s\\S]+?)',
      body: '',
      end: '',
      flags: 'g',
      noncapture: false,
      escape: /\[\[-([\s\S]+?)\]\]/g,
      open: '\\[\\[',
      close: '\\]\\]',
      delims: ['[[', ']]'],
      evaluate: /\[\[([\s\S]+?)\]\]/g,
      interpolate: /\[\[=([\s\S]+?)\]\]/g
    });
  });
});