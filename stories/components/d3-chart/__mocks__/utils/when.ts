export const identity = <D>(data: D) => data;
export const when = <D>(condition: boolean | undefined, effect: (data: D) => D) => condition ? effect : identity;
