#!/usr/bin/env tsm

/**
 * Util for check imports in external source code and show warnings about old imports from '@semcore...'
 */

import {getDirectDependencies, getImportPaths} from "./importUtils";

console.log('\nStart check direct dependencies');

const directImports = await getDirectDependencies();

if (directImports.length > 0) {
    console.warn(`  Found direct dependencies:\n    - ${directImports.join('\n    - ')}`);
} else {
    console.log('  Not found direct imports!');
}

console.log('\nStart check old imports');

const pathsToPatchImports: Record<string, number> = await getImportPaths();

let haveOldImports = false;

Object.entries(pathsToPatchImports).forEach(([path, count]) => {
    haveOldImports = true;

    console.warn(`  - Found ${count} old imports in: [${path}].`);
});

if (haveOldImports) {
    console.warn(`\nYou could replace old @semcore/ui* imports to new intergalactic/* by run 'npx intergalactic patch-imports'\n`);
}

