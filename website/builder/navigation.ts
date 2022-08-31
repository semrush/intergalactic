import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import finderPackageJson from 'find-package-json';
import { dirname as resolveDirname, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import { parseMarkdownMeta, removeMarkdownMeta } from './utils';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));
const repoRoot = resolvePath(__dirname, '../..');

const serializeRoutes = (routes: { [route: string]: number[] }) => {
  const serializedRoutes = Object.entries(routes).map(
    ([route, chain]) =>
      `['${route}']: navigationTree${chain.map((index) => `[${index}]`).join('.children')}`,
  );

  return `{ ${serializedRoutes.join(',')} }`;
};

export const buildNavigation = async (docsDir: string) => {
  const filesList = await glob('**/*.md', { cwd: docsDir });
  const dirsList = filesList.map((path) => path.split('/').slice(0, -1).join('/'));
  const fileContentsList = await Promise.all(
    filesList.map((path) => readFile(resolvePath(docsDir, path), 'utf-8')),
  );
  const fileMetasList = fileContentsList.map(parseMarkdownMeta).map((meta) => {
    if (meta.fileSource) {
      const packageJson = finderPackageJson(
        resolvePath(repoRoot, 'semcore', meta.fileSource),
      ).next().value;
      meta.packageJson = {
        name: packageJson.name,
        version: packageJson.version,
      };
    }
    return meta;
  });
  const fileSubPagesList = fileContentsList.map((contents, index) => {
    const lines = contents.split('\n');
    const dir = dirsList[index];
    const pages = lines
      .filter((line) => line.startsWith('@page '))
      .map((line) => line.substring('@page '.length))
      .map((page) => (dir ? `${dir}/${page}` : page));
    return pages;
  });
  const hasContentMap = fileContentsList.map((contents) => {
    const lines = removeMarkdownMeta(contents).split('\n');

    return lines.filter((line) => line.length > 0 && !line.startsWith('@page ')).length > 0;
  });
  const navigationMap = Object.fromEntries(
    filesList.map((path, index) => [
      path,
      {
        meta: fileMetasList[index],
        subPages: fileSubPagesList[index],
        dir: dirsList[index],
        hasContent: hasContentMap[index],
      },
    ]),
  );
  const navigationRoutes: { [route: string]: number[] } = {};
  const navigationParents: { [route: string]: number[] } = {};
  const navigationPrevSibling: { [route: string]: number[] } = {};
  const navigationNextSibling: { [route: string]: number[] } = {};
  const fillNavigation = (dirs: string[], parentChain: number[] = []) => {
    const navigation = [];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const fileName = dir.split('/').pop() + '.md';
      const dirIndexFile = dir + '/' + fileName;
      const siblingFile = dir + '.md';
      const filePath = navigationMap[dirIndexFile] ? dirIndexFile : siblingFile;
      const { meta, subPages, hasContent } = navigationMap[filePath];
      const navigationNode = {
        route: dir,
        hasContent,
        metadata: {
          ...meta,
        },
        loadPage: `~~~%%%@docs/${filePath}%%%~~~`,
        filePath,
        title: meta?.title,
      };

      const chain = [...parentChain, i];
      navigationRoutes[dir] = chain;
      navigationParents[dir] = parentChain;

      if (subPages.length > 0) {
        navigationNode.children = fillNavigation(subPages, chain);
      }
      navigation.push(navigationNode);
    }

    return navigation;
  };
  const navigationTree = fillNavigation(navigationMap[filesList[0]].subPages);

  return {
    navigationMap,
    navigationTree,
    chains: {
      navigationRoutes,
      navigationParents,
      navigationPrevSibling,
      navigationNextSibling,
    },
  };
};

export const serializeNavigation = async (docsDir: string) => {
  const { navigationTree, chains } = await buildNavigation(docsDir);
  const { navigationRoutes, navigationParents, navigationPrevSibling, navigationNextSibling } =
    chains;

  const contentfulRoutesChildren: { [contentfulRoute: string]: string[] } = {};
  const contentfulRoutes = Object.keys(navigationRoutes).filter((route) => {
    const routeChain = navigationRoutes[route];
    const routeDepth = routeChain.length;
    if (routeDepth !== 2) return false;
    const node = navigationTree[routeChain[0]].children[routeChain[1]];
    const routeMeta = node.metadata;
    if (routeMeta.disabled) return false;

    contentfulRoutesChildren[route] = node.children?.map((child) => child.route) ?? [];

    return true;
  });
  for (let i = 0; i < contentfulRoutes.length; i++) {
    const prevChain = navigationRoutes[contentfulRoutes[i - 1]];
    const nextChain = navigationRoutes[contentfulRoutes[i + 1]];
    for (const route of [contentfulRoutes[i], ...contentfulRoutesChildren[contentfulRoutes[i]]]) {
      if (prevChain) navigationPrevSibling[route] = prevChain;
      if (nextChain) navigationNextSibling[route] = nextChain;
    }
  }

  let stringifiedTree = JSON.stringify(navigationTree);
  stringifiedTree = stringifiedTree.replace(/"~~~%%%/g, '() => import("');
  stringifiedTree = stringifiedTree.replace(/%%%~~~"/g, '")');

  return `
    export const navigationTree=${stringifiedTree};
    export const routes=${serializeRoutes(navigationRoutes)};
    export const routeParents=${serializeRoutes(navigationParents)};
    export const routePrevSiblings=${serializeRoutes(navigationPrevSibling)};
    export const routeNextSiblings=${serializeRoutes(navigationNextSibling)};
  `;
};
