export default function pick<T extends {}, K extends keyof T>(obj: T, keys: K[]) {
  const res: any = {};
  const len = keys.length;
  let idx = -1;
  while (++idx < len) {
    const key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res as Pick<T, K>;
}
