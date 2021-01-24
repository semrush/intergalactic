const postcss = require('postcss');
const plugin = require('../');

async function run(input, output, opts) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

describe('postcss-theme-replacer', () => {
  it(`Doesnt replace import paths if options.varsFile isn't specified`, async () => {
    const options = {};
    const input = "@import './themes/amazon.vars.css';";

    await run(input, input, options);
  });

  it(`Doesn't replace path for import from dir different of varsFile source`, async () => {
    const options = { varsFile: 'themes/sm.vars.css' };
    const input = "@import '@semcore/utils/style/var.css';";

    await run(input, input, options);
  });

  it(`Replace theme variables path if they are not equal`, async () => {
    const options = { varsFile: 'themes/sm.vars.css' };
    const input = "@import './themes/amazon.vars.css';";
    const output = `@import '${options.varsFile}';`;

    await run(input, output, options);
  });
});
