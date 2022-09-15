/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
export function timeFormat(options?: {}, local = 'en-US') {
  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  if (Array.isArray(options)) {
    options = options.reduce((opts, name) => {
      return { ...opts, [name]: defaultOptions[name] };
    }, {});
  }

  return (date) => {
    return new Intl.DateTimeFormat(local, options).format(date);
  };
}
