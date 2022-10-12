/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
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
