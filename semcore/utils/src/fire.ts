/* eslint-disable */
import getValue from './getValue';

export default function fire<T extends {}>(context: T, eventName: string, ...args: any) {
  const fn = getValue(context, `props.${eventName}`);
  if (fn) return fn.call(context, ...args);
}

export function fireFn(fn: (...args: any) => void, ...args) {
  if (typeof fn === 'function') return fn(...args);
}
