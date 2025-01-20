export default function isPromise(resultFn: any) {
  return typeof resultFn.then === 'function';
}
