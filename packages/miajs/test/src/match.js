/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { expect } = require('chai');
const minimatch = require("minimatch");
const {Minimatch} = minimatch;

const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {Variable, Term, Context, Assert, assert_, Retract, Believe, believe_, attempt_, Achieve} = runtime;
const {$_, __, $, module_,  Message, Policy, Rule, Trigger, onAssert, onRetract, onAttempt, Runner, Method} = runtime;
const {match} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Tuna, _Peas, _get} = require('./common');

const _make = $_('make');

const pattern = '*.js';
const options = {};

const mm = (pattern, options) => minimatch.makeRe(pattern, options);
const re  = mm('*.js');
//$$.$ 'Minimatch to RegExp'
//$$._ re

describe('Matching', function() {

  describe('Values', function() {
    it('match __, null', () => expect(match(__, null)).to.be.true);
    it('match null, null', () => expect(match(null, null)).to.be.true);
    it("match null, 'hello'", () => expect(match(null, 'hello')).to.be.false);
    it("match 'hello', 'hello'", () => expect(match('hello', 'hello')).to.be.true);
    it("match 'hello', 'goodbye'", () => expect(match('hello', 'goodbye')).to.be.false);
    it("match ((x) -> x == 10), 10", () => expect(match((x => x === 10), 10)).to.be.true);
    it("match ((x) -> x == 10), 20", () => expect(match((x => x === 10), 20)).to.be.false);
    return it("match ((x) -> x > 10), 20", () => expect(match((x => x > 10), 20)).to.be.true);
  });

  describe('Regular Expressions', function() {
    it("match(re, 'test.js')", () => expect(match(re, 'test.js')).to.be.true);
    return it("match(re, 'test.txt')", () => expect(match(re, 'test.txt')).to.be.false);
  });

  describe('Variable Binding', () => it("match($('x'), 10)", () => //$$._ match($('x'), 10)
  expect(match($('x'), 10)).to.have.property('$x', 10)));

  describe('Clauses', function() {
    it("believe_(_Bob, _likes, _Fish).match Believe, __, _likes, __", () => expect(believe_(_Bob, _likes, _Fish).match(Believe, __, _likes, __)).to.be.true);
    return it("believe_(_Bob, _likes, _Fish).match Believe, $('x'), _likes, $('y')", function() {
      const result = believe_(_Bob, _likes, _Fish).match(Believe, $('x'), _likes, $('y'));
      expect(result).to.have.property('$x', _Bob);
      return expect(result).to.have.property('$y', _Fish);
    });
  });

  describe('Messages', () => it("assert_(Believe, _Bob, _likes, _Fish).match Assert, Believe, $('x'), _likes, $('y')", function() {
    const result = assert_(Believe, _Bob, _likes, _Fish).match(Assert, Believe, $('x'), _likes, $('y'));
    expect(result).to.have.property('$x', _Bob);
    return expect(result).to.have.property('$y', _Fish);
  }));

  describe('Triggers', function() {
    it("onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)", function() {
      const result = onAssert(Believe, $('x'), _likes, $('y')).match(assert_(Believe, _Bob, _likes, _Fish));
      expect(result).to.have.property('$x', _Bob);
      return expect(result).to.have.property('$y', _Fish);
    });
    return it("onAssert(Believe, $('x'), _likes, $('y')).match attempt_(Believe, _Bob, _likes, _Fish)", function() {
      const result = onAssert(Believe, $('x'), _likes, $('y')).match(attempt_(Believe, _Bob, _likes, _Fish));
      return expect(result).to.be.false;
    });
  });

  return describe('Triggers with Xtras', () => it("onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)", function() {
    const result = onAssert(Believe, $('x'), _likes, $('y')).match(assert_(Believe, _Bob, _likes, _Fish));
    expect(result).to.have.property('$x', _Bob);
    return expect(result).to.have.property('$y', _Fish);
  }));
});
