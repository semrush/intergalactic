import { mergeChangelogs } from '../tools/changelog-handler/index';
import fs from 'fs/promises';

try {
  const merge = await mergeChangelogs(process.argv[2], process.argv[3], '', '');
  await fs.writeFile(process.argv[2], merge.result);
  if (merge.conflictsCount > 0) {
    throw new Error(`Found ${merge.conflictsCount} conflicts`);
  }
} catch (error) {
  // rome-ignore lint/nursery/noConsoleLog: <explanation>
  console.log(error);
  process.exit(1);
}
