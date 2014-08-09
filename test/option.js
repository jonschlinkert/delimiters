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


describe('.option():', function () {
  it('should set an option:', function () {
    var delims = new Delimiters();

    delims.option('a', true);
    delims.option('a').should.be.true;
  });


  it('should update an option:', function () {
    var delims = new Delimiters();

    delims.option('a', true);
    delims.option('a').should.be.true;

    delims.option('a', false);
    delims.option('a').should.be.false;
  });

  it('should extend the options:', function () {
    var delims = new Delimiters();

    delims.option({a: true, b: false});
    delims.option('a').should.be.true;
    delims.option('b').should.be.false;
  });

});