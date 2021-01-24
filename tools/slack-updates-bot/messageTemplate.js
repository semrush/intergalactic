const MAP_TYPE_TO_SECTION_LABEL = {
  added: ':white_check_mark: ADDED',
  changed: ':recycle: CHANGED',
  fixed: ':hammer_and_wrench: FIXED',
  removed: ':wastebasket: REMOVED',
  break: ':interrobang: BREAK',
};

module.exports = function messageTemplate(data) {
  return data
    .map(({ component, version, changes }) => {
      return titleTemplate(component, version) + bodyTemplate(changes);
    })
    .join('\n');
};

function bodyTemplate(changes) {
  return changes
    .map((change) => {
      const { type, data } = change;
      return `${MAP_TYPE_TO_SECTION_LABEL[type] || type.toUpperCase()} \n${data
        .map((item) => `- ${item}`)
        .join(' \n')} `;
    })
    .join(' \n\n');
}

function titleTemplate(name, version) {
  return `-------- \n:black_heart: *${name}* v${version} \n\n`;
}
