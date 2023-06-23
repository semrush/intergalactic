const pathRegExp = /\[(\d+)]/g;

export default function getValue(obj, path, def?) {
  const paths = typeof path === 'string' ? path.replace(pathRegExp, '.$1') : path.join('.');
  return (
    paths
      .split('.')
      .filter(Boolean)
      // rome-ignore lint/suspicious/noAssignInExpressions:
      .every((step) => (obj = obj[step]) !== undefined)
      ? obj
      : def
  );
}
