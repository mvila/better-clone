'use strict';

import lodahCloneWith from 'lodash.clonewith';
import lodahCloneDeepWith from 'lodash.clonedeepwith';

export const customClone = Symbol.for('__betterClone.customClone__');

export function clone(value, isDeep) {
  let lodahClone = isDeep ? lodahCloneDeepWith : lodahCloneWith;
  return lodahClone(value, function(value) {
    if (value && typeof value[customClone] === 'function') {
      return value[customClone](isDeep);
    } else {
      return undefined;
    }
  });
}

export function cloneDeep(value) {
  return clone(value, true);
}

export default clone;
