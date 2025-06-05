import fs from 'fs/promises';

import { mergeChangelogs } from '../tools/changelog-handler/index';

try {
  const merge = await mergeChangelogs(process.argv[2], process.argv[3], '', '');
  await fs.writeFile(process.argv[2], merge.result);
  if (merge.conflictsCount > 0) {
    throw new Error(`Found ${merge.conflictsCount} conflicts`);
  }
} catch (error) {
  console.log(error);
  process.exit(1);
}
