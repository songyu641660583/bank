export function deepCopy(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);
  
  const target = new source.constructor();
  
  Object.getOwnPropertyNames(source).forEach(prop => {
    target[prop] = deepCopy(source[prop]);
  });
  
  return target;
}