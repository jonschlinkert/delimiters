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


describe('.useDelims:', function () {
  it('should use default built-in delimiters:', function () {
    var delimiters = new Delimiters();

    delimiters.useDelims('default');
    delimiters.getDelims().should.eql({
      beginning: '',
      matter: '([\\s\\S]+?)',
      body: '',
      end: '',
      flags: 'g',
      noncapture: false,
      escape: /\<\%-([\s\S]+?)\%\>/g,
      open: '\\<\\%',
      close: '\\%\\>',
      delims: ['<%', '%>'],
      evaluate: /\<\%([\s\S]+?)\%\>/g,
      interpolate: /\<\%=([\s\S]+?)\%\>/g
    });
  });

  it('should use es6 built-in delimiters:', function () {
    var delimiters = new Delimiters();

    delimiters.useDelims('es6');
    delimiters.getDelims().should.eql({
      beginning: '',
      matter: '([\\s\\S]+?)',
      body: '',
      end: '',
      flags: 'g',
      noncapture: false,
      open: '\\$\\{',
      close: '\\}',
      delims: ['${', '}'],
      escape: /\$\{-([\s\S]+?)\}/g,
      evaluate: /\$\{([\s\S]+?)\}/g,
      interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
    });
  });

  it('should allow default built-in delimiters to be overridden:', function () {
    var delimiters = new Delimiters();

    delimiters.addDelims('default', ['<<', '>>']);
    delimiters.useDelims('default');
    delimiters.getDelims().should.eql({
      beginning: '',
      matter: '([\\s\\S]+?)',
      body: '',
      end: '',
      flags: 'g',
      noncapture: false,
      escape: /\<\<-([\s\S]+?)\>\>/g,
      open: '\\<\\<',
      close: '\\>\\>',
      delims: ['<<', '>>'],
      evaluate: /\<\<([\s\S]+?)\>\>/g,
      interpolate: /\<\<=([\s\S]+?)\>\>/g
    });
  });

  it('should use the currently set delimiters:', function () {
    var delimiters = new Delimiters();

    var ctx = {
      name: '____Jon Schlinkert____'
    };

    delimiters.addDelims('lodash', ['<%', '%>']);
    delimiters.addDelims('hbs', ['{{', '}}']);
    delimiters.addDelims('square', ['[[', ']]']);

    delimiters.useDelims('lodash');
    delimiters.getDelims().should.eql({
      beginning: '',
      matter: '([\\s\\S]+?)',
      body: '',
      end: '',
      flags: 'g',
      noncapture: false,
      escape: /\<\%-([\s\S]+?)\%\>/g,
      open: '\\<\\%',
      close: '\\%\\>',
      delims: ['<%', '%>'],
      evaluate: /\<\%([\s\S]+?)\%\>/g,
      interpolate: /\<\%=([\s\S]+?)\%\>/g
    });

    delimiters.useDelims('square');
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

    delimiters.useDelims('hbs');
    delimiters.getDelims().should.eql({
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
