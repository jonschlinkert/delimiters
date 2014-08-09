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

describe('.getDelims():', function () {
  describe('when multiple delimiters are defined:', function () {
    var delimiters = new Delimiters();

    delimiters.addDelims('a', ['{{', '}}']);
    delimiters.addDelims('b', ['<%', '%>']);
    delimiters.addDelims('c', ['[[', ']]']);

    it('should get the currently defined delimiters:', function () {
      delimiters.useDelims('c');

      delimiters.getDelims().should.eql({
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

    it('should get the specified delimiters:', function () {
      delimiters.getDelims('a').should.eql({
        beginning: '',
        matter: '([\\s\\S]+?)',
        body: '',
        end: '',
        flags: 'g',
        noncapture: false,
        escape: /\{\{-([\s\S]+?)\}\}/g,
        open: '\\{\\{',
        close: '\\}\\}',
        delims: ['{{', '}}'],
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g
      });
    });
  });
});