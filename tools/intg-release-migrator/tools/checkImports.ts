/**
 * Util for check imports in external source code and show warnings about old imports from '@semcore...'
 */
import { log } from './logger';
import { getDirectDependencies, getImportPaths } from './importUtils';

export async function checkImports(baseDir = 'src') {
  log('\nStart check direct dependencies...');

  const directImports = await getDirectDependencies();

  if (directImports.length > 0) {
    log(`  Found direct dependencies:\n    - ${directImports.join('\n    - ')}`);
  } else {
    log('  Not found direct imports!');
  }

  log('\nStart check old imports...');

  try {
    const pathsToPatchImports = await getImportPaths(baseDir);

    let oldImports = 0;

    Object.entries(pathsToPatchImports).forEach(([path, count]) => {
      oldImports = oldImports + count;

      // log(`  - Found ${count} old imports in: [${path}].`);
    });

    if (oldImports > 0) {
      log(
        `\n
***************************************************
*                                                 *
*         Found ${oldImports} uses of @semcore/* packages    *
*           We are recommending you to use        *
*              new intergalactic package          *
*                                                 *
*                 To migrate, run                 *
*            npx intergalactic-migrate            *
*                                                 *
***************************************************\n`,
      );
    }
  } catch (e) {
    console.error(e);
  }
}
