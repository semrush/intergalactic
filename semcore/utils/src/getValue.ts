/* eslint-disable */
const pathRegExp = /\[(\d+)]/g;

export default function getValue(obj, path, def?) {
  const paths = typeof path === 'string' ? path.replace(pathRegExp, '.$1') : path.join('.');
  return paths
    .split('.')
    .filter(Boolean)
    .every((step) => (obj = obj[step]) !== undefined)
    ? obj
    : def;
}
