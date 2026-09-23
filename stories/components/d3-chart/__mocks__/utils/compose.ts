export const compose = <D>(...fns: Array<(base: D) => D>) => (base: D) => fns.reduce((acc, fn) => fn(acc), base);
