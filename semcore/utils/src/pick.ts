/* eslint-disable */
export default function pick(obj, keys) {
  const res = {};
  const len = keys.length;
  let idx = -1;
  while (++idx < len) {
    const key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res;
}
