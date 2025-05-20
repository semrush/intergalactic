function arraysEqual(a: any, b: any) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function handlerBinder(fn: any) {
  return function (...depsArgs: any[]) {
    let memoizeds = [];
    if (handlerBinder.hasher.has(fn)) {
      memoizeds = handlerBinder.hasher.get(fn);
      const memoized = memoizeds.find((memoized: any) => arraysEqual(memoized.deps, depsArgs));
      if (memoized) return memoized.fn;
    }

    const bindFn = fn(...depsArgs).bind(fn);
    memoizeds.push({
      deps: depsArgs,
      fn: bindFn,
    });
    handlerBinder.hasher.set(fn, memoizeds);
    return bindFn;
  };
}

handlerBinder.hasher = new WeakMap();

function Enhancement() {
  return {
    condition: function (Component: any, isFunction: boolean) {
      return !isFunction;
    },
    init: function (this: any) {
      Object.keys(this)
        .filter((field) => field.startsWith('bindHandler'))
        .forEach((name) => {
          this[name] = handlerBinder(this[name].bind(this));
        });
    },
  };
}

export default Enhancement;
