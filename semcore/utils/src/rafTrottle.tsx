function rafTrottle<T extends (...args: any[]) => any>(callback: T) {
  let ticking: number | null = null;

  let lastArgs: any;

  const update = (context: any) => () => {
    ticking = null;
    callback.apply(context, lastArgs);
  };

  const throttled = function (this: any, ...args: any[]) {
    lastArgs = args;
    if (ticking === null) {
      ticking = requestAnimationFrame(update(this));
    }
  };

  throttled.cancel = () => {
    if (typeof ticking === 'number') cancelAnimationFrame(ticking);
    ticking = null;
  };

  return throttled as any as T;
}

export default rafTrottle;
