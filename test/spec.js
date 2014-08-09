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


describe('delimiters usage:', function () {
  it('should use the currently set delimiters:', function () {
    var delimiters = new Delimiters();

    var ctx = {name: '____Jon Schlinkert____'};

    delimiters.addDelims('lodash', ['<%', '%>']);
    delimiters.addDelims('hbs', ['{{', '}}']);
    delimiters.addDelims('square', ['[[', ']]']);

    var process = function (str, context) {
      var settings = delimiters.getDelims();
      return _.template(str, context, settings);
    };

    // using default delimiters
    var a = process('${ name }[[= name ]]{{= name }}<%= name %>{%= name %}', ctx);
    a.should.equal('${ name }[[= name ]]{{= name }}____Jon Schlinkert____{%= name %}');

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
