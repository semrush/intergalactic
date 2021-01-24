/* eslint-disable */
export default function isPromise(resultFn) {
  return typeof resultFn.then === 'function';
}
