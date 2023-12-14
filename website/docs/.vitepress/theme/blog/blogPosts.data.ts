import fs from 'fs/promises';
import path from 'node:path';
import type { MarkdownRenderer } from 'vitepress';
import { createMarkdownRenderer } from 'vitepress';
import useBlogFile from './useBlogFile';

let md: MarkdownRenderer;
const { folderDir, readFrontMatter } = useBlogFile();

const dir = folderDir('');

export interface Post {
  title: string;
  slug: string;
  image?: string;
  excerpt: string;
  date: {
    time: number;
    string: string;
  };
  data: Record<string, any>;
}

declare const data: Post[];
export { data };

async function load(): Promise<Post[]>;
async function load() {
  md = md || (await createMarkdownRenderer(process.cwd()));

  const subDirs = await fs.readdir(dir);
  const posts = (await Promise.all(subDirs.map((file) => getPost(file, path.resolve(dir, file)))))
    .filter(Boolean)
    .sort((a, b) => Number(b?.date.time) - Number(a?.date.time));

  return posts;
}

export default {
  watch: path.join(dir, '*.md'),
  load,
};

const cache = new Map();

async function getPost(file: string, postDir: string): Promise<Post | undefined> {
  const isDir = (await fs.stat(postDir)).isDirectory();
  if (!isDir) return;
  const fullPath = path.join(postDir, 'index.md');
  const timestamp = (await fs.stat(fullPath)).mtimeMs;

  const { data, excerpt, content } = readFrontMatter(fullPath, cache);
  const firstImage = content.match(/!\[.*?\]\((.*?)\)/)?.[1];
  const postSlug = fullPath.split('/').slice(-2)[0];

  const post: Post = {
    title: data.title,
    slug: postSlug,
    image: firstImage ? path.join(postSlug, firstImage) : undefined,
    date: formatDate(data.date),
    data,
    excerpt,
  };

  cache.set(fullPath, {
    timestamp,
    post,
  });
  return post;
}

function formatDate(date: string | Date): Post['date'] {
  if (!(date instanceof Date)) date = new Date(date);

  date.setUTCHours(12);

  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
