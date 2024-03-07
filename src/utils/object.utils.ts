import { RecursivePartial } from '../types/recursivePartial';

/**
 * Updates the current object with the specified changes.
 * @param currentObject - The current object has default values.
 * @param changes - The changes to be applied to the currentObject.
 * @returns The updated object.
 */
export const updateObject = <T extends Object>(
  currentObject: T,
  changes: RecursivePartial<T>,
): T => {
  const newObject = currentObject;

  for (let key in changes) {
    if (newObject.hasOwnProperty(key)) {
      if (
        typeof changes[key] === 'object' &&
        typeof newObject[key] === 'object'
      ) {
        // @ts-ignore
        updateObject(newObject[key], changes[key]);
      } else {
        // @ts-ignore
        newObject[key] = changes[key];
      }
    }
  }

  return newObject;
};
