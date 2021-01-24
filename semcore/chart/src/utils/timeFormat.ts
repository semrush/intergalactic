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
