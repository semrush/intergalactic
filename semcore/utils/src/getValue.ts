const pathRegExp = /\[(\d+)]/g;

export default function getValue(obj: any, path: string | string[], def?: any) {
  const paths = typeof path === 'string' ? path.replace(pathRegExp, '.$1') : path.join('.');
  return (
    paths
      .split('.')
      .filter(Boolean)
      // biome-ignore lint/suspicious/noAssignInExpressions:
      .every((step: string) => (obj = obj[step]) !== undefined)
      ? obj
      : def
  );
}
