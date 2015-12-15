'use strict';

import lodahClone from 'lodash.clone';

export const customClone = Symbol.for('__betterClone.customClone__');

export function clone(value, isDeep) {
  return lodahClone(value, isDeep, function(value) {
    if (value && typeof value[customClone] === 'function') {
      return value[customClone](isDeep);
    }
  });
}

export function cloneDeep(value) {
  return clone(value, true);
}

export default clone;
