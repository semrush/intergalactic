import { mergeChangelogs } from '../tools/changelog-handler/index';
import fs from 'node:fs/promises';

try {
  const merge = await mergeChangelogs(process.argv[2], process.argv[3], '', '');
  await fs.writeFile(process.argv[2], merge.result);
  if (merge.conflictsCount > 0) {
    throw new Error(`Found ${merge.conflictsCount} conflicts`);
  }
} catch (error) {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(error);
  process.exit(1);
}
