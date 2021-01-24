/* eslint-disable */
export default function compose(...fns): <T extends {}>(Component: T) => T {
  return fns.reverse().reduce(
    (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
    (value) => value,
  );
}

// TODO: think about it 🙄
