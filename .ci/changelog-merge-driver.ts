import { mergeChangelogs } from '../tools/changelog-handler/index';
import fs from 'fs/promises';

try {
  const merged = await mergeChangelogs(process.argv[2], process.argv[3], '', '');
  await fs.writeFile(process.argv[2], merged);
} catch (error) {
  console.log(error);
  process.exit(1);
}
