import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export default () => {
  function readFrontMatter(fullPath: string, cache: Map<any, any>) {
    const timestamp = fs.statSync(fullPath).mtimeMs;

    const cached = cache.get(fullPath);
    if (cached && timestamp === cached.timestamp) return cached.post;

    const src = fs.readFileSync(fullPath, 'utf-8');
    return matter(src, { excerpt_separator: '\n\n', excerpt: true });
  }

  function folderDir(name: string): string {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const resolvedPath = path.resolve(dirname, `../../../blog/${name}`);

    return resolvedPath;
  }

  return { folderDir, readFrontMatter };
};
