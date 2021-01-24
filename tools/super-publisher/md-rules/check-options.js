const MAP_HEADING = {
  add: 'Added',
  fix: 'Fixed',
  chang: 'Changed',
  remov: 'Removed',
  break: 'BREAK',
};

const KEYS_MAP_HEADING = Object.keys(MAP_HEADING);
const VALUES_MAP_HEADING = Object.values(MAP_HEADING);

module.exports = {
  names: ['validate-options'],
  description: `Invalidate name heading`,
  tags: ['options'],
  function: function rule(params, onError) {
    params.tokens
      .filter(function filterToken(token) {
        return token.type === 'heading_open' && token.tag === 'h3';
      })
      .forEach(function forToken(heading) {
        const option = heading.line.replace('### ', '');
        const valid_option =
          MAP_HEADING[KEYS_MAP_HEADING.find((name) => option.toLocaleLowerCase().includes(name))];

        if (valid_option !== option) {
          onError({
            lineNumber: heading.lineNumber,
            detail: `'${option}' in not true for list (${VALUES_MAP_HEADING.join()})`,
            fixInfo: {
              lineNumber: heading.lineNumber,
              editColumn: 4,
              deleteCount: option.length + 1,
              insertText: ` ${valid_option}`,
            },
          });
        }
      });
  },
};
