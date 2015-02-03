/*!
 * delimiters <https://github.com/jonschlinkert/delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var _ = require('lodash');
var Delimiters = require('./');
var delimiters;

describe('.setDelims():', function () {
  beforeEach(function () {
    delimiters = new Delimiters();
  });

  describe('.setDelims():', function () {
    it('should setDelims delimiters by `name` on `delimiters`:', function () {
      delimiters.setDelims('a', ['\\{\\{', '\\}\\}']);
      delimiters.setDelims('b', ['<%', '%>']);
      delimiters.setDelims('c', ['\\[\\[', '\\]\\]']);
      Object.keys(delimiters.delims).should.have.length(3);
      delimiters.delims.should.have.properties(['a','b','c']);
    });

    it('should allow delimiters to be defined as an object`:', function () {
      delimiters.setDelims('es6', {
        interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
      });
      delimiters.setDelims('foo', /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g);
      delimiters.setDelims('bar', '\\$\\{([^\\\\}]*(?:\\\\.[^\\\\}]*)*)\\}');
      delimiters.delims.should.have.property('es6');
      delimiters.delims.should.have.property('foo');
      delimiters.delims.should.have.property('bar');
      delimiters.delims['es6'].interpolate.should.eql(/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g);
      delimiters.delims['foo'].interpolate.should.eql(/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g);
      delimiters.delims['bar'].interpolate.should.eql(/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g);
    });
  });

  describe('.makeDelims():', function () {
    it('should make delimiters', function () {
      delimiters.makeDelims(['\\[\\[', '\\]\\]']).should.eql({
        original: ['\\[\\[', '\\]\\]'],
        escape: /\[\[-([\s\S]+?)\]\]/,
        evaluate: /\[\[([\s\S]+?)\]\]/,
        interpolate: /\[\[=([\s\S]+?)\]\]/
      });
    });
  });

  describe('.getDelims():', function () {
    it('should get the currently defined delimiters:', function () {
      delimiters.setDelims('c', ['\\[\\[', '\\]\\]']);
      delimiters.getDelims('c').should.eql({
        original: ['\\[\\[', '\\]\\]'],
        escape: /\[\[-([\s\S]+?)\]\]/,
        evaluate: /\[\[([\s\S]+?)\]\]/,
        interpolate: /\[\[=([\s\S]+?)\]\]/
      });
    });

    it('should get the specified delimiters:', function () {
      delimiters.setDelims('a', ['\\{\\{', '\\}\\}']);
      delimiters.getDelims('a').should.eql({
        original: ['\\{\\{', '\\}\\}'],
        escape: /\{\{-([\s\S]+?)\}\}/,
        evaluate: /\{\{([\s\S]+?)\}\}/,
        interpolate: /\{\{=([\s\S]+?)\}\}/
      });
    });
  });
});


describe('delimiters usage:', function () {
  it('should use the currently set delimiters:', function () {
    var delimiters = new Delimiters();

    var ctx = {name: '____Jon Schlinkert____'};


    delimiters.setDelims('es6', '\\$\\{([^\\\\}]*(?:\\\\.[^\\\\}]*)*)\\}');
    delimiters.setDelims('lodash', ['<%', '%>']);
    delimiters.setDelims('hbs', ['{{', '}}']);
    delimiters.setDelims('square', ['\\[\\[', '\\]\\]']);

    var process = function (str, context) {
      var settings = delimiters.getDelims() || {}
      return _.template(str, settings)(context);
    };

    // using default delimiters
    var a = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    a.should.equal('____Jon Schlinkert____[[= name ]]{{= name }}____Jon Schlinkert____{%= name %}');

    delimiters.useDelims('lodash');
    var a = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    a.should.equal('${ name }[[= name ]]{{= name }}____Jon Schlinkert____{%= name %}');

    delimiters.useDelims('es6');
    var b = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    b.should.equal('____Jon Schlinkert____[[= name ]]{{= name }}<%= name %>{%= name %}');

    delimiters.useDelims('square');
    var c = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    c.should.equal('${ name }____Jon Schlinkert____{{= name }}<%= name %>{%= name %}');

    delimiters.useDelims('hbs');
    var d = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    d.should.equal('${ name }[[= name ]]____Jon Schlinkert____<%= name %>{%= name %}');
  });
});
