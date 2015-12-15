'use strict';

import { assert } from 'chai';
import { clone, customClone } from './src';

describe('clone()', function() {
  describe('without the deep option', function() {
    it('should clone simple values', function() {
      assert.isUndefined(clone(undefined));
      assert.strictEqual(clone(true), true);
      assert.strictEqual(clone(123), 123);
      assert.strictEqual(clone('abc'), 'abc');
    });

    it('should shallow clone objects', function() {
      let person = { name: { first: 'Jean', last: 'Dupont' } };
      assert.notStrictEqual(clone(person), person);
      assert.strictEqual(clone(person).name, person.name);
    });

    it('should use customized clone method', function() {
      let immutable = {
        value: 123,
        [customClone]() {
          return this;
        }
      };
      assert.strictEqual(clone(immutable), immutable);
    });
  });

  describe('with the deep option', function() {
    it('should deep clone objects', function() {
      let person = { name: { first: 'Jean', last: 'Dupont' } };
      assert.notStrictEqual(clone(person, true).name, person.name);
      assert.deepEqual(clone(person, true).name, { first: 'Jean', last: 'Dupont' });
    });

    it('should use customized clone method', function() {
      let immutables = [
        {
          value: 123,
          [customClone]() {
            return this;
          }
        },
        {
          value: 456
        }
      ];
      let copy = clone(immutables, true);
      assert.strictEqual(copy[0], immutables[0]);
      assert.notStrictEqual(copy[1], immutables[1]);
      assert.deepEqual(copy[1], { value: 456 });
    });
  });
});
