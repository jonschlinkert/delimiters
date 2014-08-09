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


describe('.init():', function () {

  it('should initialize with default settings:', function (done) {
    var delimiters = new Delimiters();
    delimiters.options.layoutDelims.should.eql(['{{', '}}']);
    delimiters.options.layoutTag.should.equal('body');
    delimiters.options.flags.should.equal('g');
    done();
  });

  it('should re-initialize default settings:', function (done) {
    var delimiters = new Delimiters();

    Object.keys(delimiters.delims).should.have.length(2);
    delimiters.addDelims('hbs', ['{{', '}}']);
    Object.keys(delimiters.delims).should.have.length(3);
    delimiters.addDelims('lodash', ['<%', '%>']);
    Object.keys(delimiters.delims).should.have.length(4);
    delimiters.addDelims('square', ['[[', ']]']);
    Object.keys(delimiters.delims).should.have.length(5);

    delimiters.init();

    Object.keys(delimiters.delims).should.have.length(2);
    done();
  });


  it('should re-initialize with passed in settings:', function (done) {
    var delimiters = new Delimiters();

    Object.keys(delimiters.delims).should.have.length(2);
    delimiters.addDelims('hbs', ['{{', '}}']);
    Object.keys(delimiters.delims).should.have.length(3);
    delimiters.addDelims('lodash', ['<%', '%>']);
    Object.keys(delimiters.delims).should.have.length(4);
    delimiters.addDelims('square', ['[[', ']]']);
    Object.keys(delimiters.delims).should.have.length(5);

    delimiters.init({
      delims: {
        foo: {},
        bar: {},
        baz: {},
      },
      layoutDelims: ['<<', '>>'],
      flags: 'gi'
    });

    Object.keys(delimiters.delims).should.have.length(5);
    delimiters.options.layoutDelims.should.eql(['<<', '>>']);
    delimiters.options.layoutTag.should.equal('body');
    delimiters.options.flags.should.equal('gi');
    done();
  });
});
