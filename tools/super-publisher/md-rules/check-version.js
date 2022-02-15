module.exports = {
  names: ['validate-version'],
  description: `Doesn't have package current version`,
  tags: ['version'],
  function: function rule(params, onError) {
    const { version } = require(params.name.replace('CHANGELOG.md', 'package.json'));
    let haveValidVarsion = false;
    let isError = false;

    params.tokens
      .filter(function filterToken(token) {
        return token.type === 'heading_open' && token.tag === 'h2';
      })
      .forEach(function forToken(heading) {
        const option = heading.line.match(/\[.+]/)[0].slice(1, -1);

        if (option === version) {
          haveValidVarsion = true;
        }
        if (!haveValidVarsion && !isError) {
          isError = true;
          onError({
            lineNumber: heading.lineNumber,
            detail: 'Add change log version to CHANGELOG.md',
          });
        }
      });
  },
};
