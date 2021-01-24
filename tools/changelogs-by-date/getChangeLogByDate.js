const { promisify } = require('util');
const parseChangelog = promisify(require('changelog-parser'));

/**
 * Считывает ченджлоги перобразуя данные в след. формат:
 * @return {{
 *    date: string,
 *    component: string,
 *    version: string,
 *    changes: { type: string, data: string }[]
 *  }[]}
 */
async function getChangelogByDate(componentName, componentVersion, changelogPath) {
  const { versions } = await parseChangelog(changelogPath);
  return versions
    .map((version) => {
      const { date, parsed, title } = version;

      if (date === null) {
        console.error(`Date ${date} is invalid. Component: ${componentName}, section: "${title}"`);
        return;
      }

      const changes = Object.entries(parsed).reduce((acc, [key, value]) => {
        if (key !== '_') {
          const changes = value.map((change) => ({ type: key.toLowerCase(), data: change }));
          acc = [...acc, ...changes];
        }
        return acc;
      }, []);
      return {
        date,
        component: componentName,
        version: componentVersion,
        changes,
      };
    })
    .filter((data) => data !== undefined);
}

/**
 * Формирует список изменений компонентов по датам
 * @param changelogMeta - ReturnType<getChangelogByDate>
 * @return {{date: string, components: { name: string, changes: { type: string, data: string }[] }[] }[]}
 */
function mergeByDate(changelogMeta) {
  const dates = [];
  changelogMeta.forEach(({ date }) => {
    if (!dates.includes(date)) {
      dates.push(date);
    }
  });
  return dates.map((date) => {
    const changeLogsForDate = changelogMeta.filter((item) => item.date === date);
    const componentChangeLogs = changeLogsForDate.reduce((acc, changelog) => {
      const { component, version, changes } = changelog;
      const existedComponentIndex = acc.indexOf((comp) => comp.name === component);

      if (existedComponentIndex === -1) {
        acc.push({ name: component, version, changes });
      } else {
        acc[existedComponentIndex] = [...acc[existedComponentIndex], ...changes];
      }

      return acc;
    }, []);
    return {
      date,
      components: componentChangeLogs,
    };
  });
}

module.exports = {
  getChangelogByDate,
  mergeByDate,
};
