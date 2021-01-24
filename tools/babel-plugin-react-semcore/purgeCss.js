const cssPurge = require('css-purge');
const [styles, optionsArg] = process.argv.slice(2);

const options = optionsArg ? JSON.parse(optionsArg) : {};

const defaultOptions = {
  shorten: false,
};

cssPurge.purgeCSS(
  styles,
  {
    ...defaultOptions,
    ...options,
  },
  (err, css) => {
    let res = {};
    if (err) res.error = err.message;
    if (css) res.css = css;
    process.stdout.write(JSON.stringify(res));
  },
);
