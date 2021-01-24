/* eslint-disable */
function rafTrottle(callback) {
  let ticking = null;

  let lastArgs;

  const update = (context) => () => {
    ticking = null;
    callback.apply(context, lastArgs);
  };

  const throttled = function (...args) {
    lastArgs = args;
    if (ticking === null) {
      ticking = requestAnimationFrame(update(this));
    }
  };

  throttled.cancel = () => {
    cancelAnimationFrame(ticking);
    ticking = null;
  };

  return throttled;
}

export default rafTrottle;
