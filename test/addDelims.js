/*!
 * delimiters <https://github.com/jonschlinkert/delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var Delimiters = require('..');
var _ = require('lodash');


describe('.addDelims():', function () {
  it('should addDelims delimiters by `name` on `delimiters`:', function () {
    var delimiters = new Delimiters();
    Object.keys(delimiters.delims).should.have.length(2);
    delimiters.addDelims('hbs', ['{{', '}}']);
    Object.keys(delimiters.delims).should.have.length(3);
    delimiters.addDelims('lodash', ['<%', '%>']);
    Object.keys(delimiters.delims).should.have.length(4);
    delimiters.addDelims('square', ['[[', ']]']);
    Object.keys(delimiters.delims).should.have.length(5);
  });
});
