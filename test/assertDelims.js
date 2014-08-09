/*!
 * delimiters <https://github.com/jonschlinkert/delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var Delimiters = require('..');
var delimiters = new Delimiters();
var _ = require('lodash');


describe('.assertDelims():', function () {
  delimiters.addDelims('lodash', ['<%', '%>']);
  delimiters.addDelims('swig', ['{%', '%}']);
  delimiters.addDelims('hbs', ['{{', '}}']);
  delimiters.addDelims('square', ['[[', ']]']);

  var hbs = delimiters.getDelims('hbs');
  var swig = delimiters.getDelims('swig');
  var lodash = delimiters.getDelims('lodash');
  var es6 = delimiters.getDelims('es6');

  it('should return true if lodash delims are found in the string:', function () {
    delimiters.assertDelims('alal${ name }ala', lodash).should.equal(false);
    delimiters.assertDelims('alal<%= name %>ala', lodash).should.equal(true);
    delimiters.assertDelims('alal<%- name %>ala', lodash).should.equal(true);
    delimiters.assertDelims('alal<% name %>ala', lodash).should.equal(true);
  });

  it('should return true if swig delims are found in the string:', function () {
    delimiters.assertDelims('alal${ name }ala', swig).should.equal(false);
    delimiters.assertDelims('alal{% name %}ala', swig).should.equal(true);
  });

  it('should return true if hbs delims are found in the string:', function () {
    delimiters.assertDelims('alal{{ name }}ala', hbs).should.equal(true);
    delimiters.assertDelims('alal<%= name %>ala', hbs).should.equal(false);
    delimiters.assertDelims('alal<%- name %>ala', hbs).should.equal(false);
    delimiters.assertDelims('alal<% name %>ala', hbs).should.equal(false);
  });

  it('should return true if es6 delims are found in the string:', function () {
    delimiters.assertDelims('alal${ name }ala', es6).should.equal(true);
    delimiters.assertDelims('alal${ name }ala', lodash).should.equal(false);
  });

  describe('if a second arg is not passed:', function () {
    it('should return true if default delims are found in the string:', function () {
      delimiters.assertDelims('alal<%= name %>ala', delimiters.getDelims()).should.equal(true);
    });
  });
});
