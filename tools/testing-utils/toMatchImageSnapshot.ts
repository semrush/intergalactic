import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copy = promisify(fs.cp);

const resizeImage = (image: PNG, w: number, h: number) => {
  const result = new PNG({ width: w, height: h, fill: true, inputHasAlpha: true });

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const index = ((w * y + x) << 2) + 3;
      result.data[index] = 64;
    }
  }

  PNG.bitblt(image, result, 0, 0, image.width, image.height, 0, 0);

  return result;
};

export async function toMatchImageSnapshot(snapshot: Buffer, task: any) {
  if (!task) {
    return {
      pass: false,
      message: () =>
        `You must provide task from test context as an argument of toMatchImageSnapshot.`,
    };
  }

  const testPath = resolveDirname(task.file.filepath);
  const snapshotIndex = task.__snapshot_order_index ?? 1;
  task.__snapshot_order_index = snapshotIndex + 1;
  let testName = task.name;
  let suite = task.suite;
  while (suite.name) {
    testName = suite.name + ' ' + testName;
    suite = suite.suite;
  }
  testName = testName
    .replace(/[\W\s_]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  if (snapshotIndex !== 1) {
    testName += '-' + snapshotIndex;
  }
  const snapshotsDir = resolvePath(testPath, '__image_snapshots__');
  const snapshotPath = resolvePath(snapshotsDir, testName + '.png');

  await mkdir(snapshotsDir, { recursive: true });

  if (this.snapshotState._updateSnapshot === 'all') {
    await writeFile(snapshotPath, snapshot);

    return {
      pass: true,
      message: () => 'ok',
    };
  }

  try {
    await stat(snapshotPath);
  } catch (err) {
    if (this.snapshotState._updateSnapshot === 'new') {
      await writeFile(snapshotPath, snapshot);

      return {
        pass: true,
        message: () => 'ok',
      };
    } else {
      return {
        pass: true,
        message: () => `Snapshot ${snapshotPath} not found.`,
      };
    }
  }
  const savedSnapshot = await readFile(snapshotPath);
  let snapshotImage: PNG = PNG.sync.read(snapshot);
  let savedSnapshotImage: PNG = PNG.sync.read(savedSnapshot);

  const width = Math.max(snapshotImage.width, savedSnapshotImage.width);
  const height = Math.max(snapshotImage.height, savedSnapshotImage.height);
  if (snapshotImage.width < width || snapshotImage.height < height) {
    snapshotImage = resizeImage(snapshotImage, width, height);
  }
  if (savedSnapshotImage.width < width || savedSnapshotImage.height < height) {
    savedSnapshotImage = resizeImage(savedSnapshotImage, width, height);
  }
  const diff = new PNG({ width, height });
  const mismatch = pixelmatch(
    snapshotImage.data,
    savedSnapshotImage.data,
    diff.data,
    width,
    height,
    {
      threshold: 0,
    },
  );

  if (mismatch === 0) {
    return {
      pass: true,
      message: () => 'ok',
    };
  }

  const diffDir = resolvePath(snapshotsDir, '__diff_output__');
  const newPath = resolvePath(diffDir, testName + '-new.png');
  const diffPath = resolvePath(diffDir, testName + '-diff.png');
  const oldPath = resolvePath(diffDir, testName + '-old.png');

  await mkdir(diffDir, { recursive: true });

  await Promise.all([
    writeFile(newPath, snapshot),
    writeFile(diffPath, PNG.sync.write(diff)),
    copy(snapshotPath, oldPath),
  ]);

  const message = `Image snapshot mismatch for ${mismatch} pixels.
Snapshots diff: ${diffPath};    
Old snapshot: ${oldPath};    
New snapshot: ${newPath};    
`;

  return { pass: false, message: () => message };
}
