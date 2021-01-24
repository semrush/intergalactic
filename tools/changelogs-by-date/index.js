const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);
const { getChangelogByDate, mergeByDate } = require('./getChangeLogByDate');
const { isDateValid, dateSorter, isDateInRange } = require('./dateUtils');

/**
 * Возвращает список изменений по датам
 * @param startDate - начало периода (исключено из периода)
 * @param endDate - конец периода (включено в период)
 * @param source - директория с пакетами, changelog'и которых собираем
 * @return {Promise<{date: string, components: { name: string, changes: { type: string, data: string }[] }[] }[]>}
 */
async function getChangelogMeta(startDate, endDate, source = '../../semcore') {
  const sourceDir = path.resolve(__dirname, source);
  const components = await readdir(sourceDir);
  const componentDirs = components
    .filter((dir) => !dir.startsWith('_')) // skipping unpublished components & hidden dirs
    .map((dir) => path.resolve(sourceDir, dir));

  let changelogMeta = [];

  for (const dir of componentDirs) {
    const packageJsonPath = path.resolve(dir, 'package.json');
    const changeLogPath = path.resolve(dir, 'CHANGELOG.md');

    const packageJsonExists = await exists(packageJsonPath);
    if (!packageJsonExists) {
      console.error(`No package.json in ${dir}`);
      continue;
    }
    const changeLogExists = await exists(changeLogPath);
    if (!changeLogExists) {
      console.error(`No CHANGELOG.md in ${dir}`);
      continue;
    }

    const { name: componentName, version: componentVersion } = require(packageJsonPath);
    const changelogByDate = await getChangelogByDate(
      componentName,
      componentVersion,
      changeLogPath,
    );
    changelogMeta = [...changelogMeta, ...changelogByDate];
  }

  if (isDateValid(startDate) && isDateValid(endDate)) {
    changelogMeta = changelogMeta.filter(({ date }) => isDateInRange(date, startDate, endDate));
  }

  return mergeByDate(changelogMeta).sort((a, b) => dateSorter(a.date, b.date));
}

module.exports = getChangelogMeta;
