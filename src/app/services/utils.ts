/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const isObject = (
  object: Record<string, unknown> | unknown,
): boolean => {
  return object != null && typeof object === 'object'
}

// TODO better typing
export const deepEqual = (
  object1: any,
  object2: any,
  useKeyLength?: boolean,
): boolean => {
  // eslint-disable-next-line no-debugger
  // debugger
  const keys1 = Object.keys(object1)
  if (useKeyLength) {
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
      return false
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2, useKeyLength)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }

  return true
}

export default { deepEqual, isObject }
