export default function compose(...fns: any[]): <T extends {}>(Component: T) => T {
  return fns.reverse().reduce(
    (prevFn, nextFn) => (value: any) => nextFn(prevFn(value)),
    (value: any) => value,
  );
}

// TODO: think about it 🙄
