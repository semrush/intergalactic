#!/usr/bin/env tsm

/**
 * Util for check imports in external source code and show warnings about old imports from '@semcore...'
 */
import {log} from "../tools/logger";
import {getDirectDependencies, getImportPaths} from '../tools/importUtils';

log('\nStart check direct dependencies...');

const directImports = await getDirectDependencies();

if (directImports.length > 0) {
    log(`  Found direct dependencies:\n    - ${directImports.join('\n    - ')}`);
} else {
    log('  Not found direct imports!');
}

log('\nStart check old imports...');

try {
    const pathsToPatchImports: Record<string, number> = await getImportPaths();

    let haveOldImports = false;

    Object.entries(pathsToPatchImports).forEach(([path, count]) => {
        haveOldImports = true;

        log(`  - Found ${count} old imports in: [${path}].`);
    });

    if (haveOldImports) {
        log(`\nYou could replace old @semcore/ui* imports to new @semrush/intergalactic/* by run 'pnpm patch-imports'\n`);
    }
} catch(e) {
    console.error(e);
}
