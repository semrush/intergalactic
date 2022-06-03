/* eslint-disable no-console */
import esbuild from 'esbuild';
import fs from 'fs/promises';
import { websiteEsbuildConfig } from './esbuild.config';
import { buildNavigation } from './navigation';
import {
  resolve as resolvePath,
  relative as resolveRelativePath,
  dirname as resolveDirname,
} from 'path';
import { buildArticle, serializeArticle } from './build-article/build-article';
import { createHash } from 'crypto';

const fsExists = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const ensureDir = async (path: string) => {
  const parts = path.split('/');
  for (let i = 1; i <= parts.length; i++) {
    const subPath = resolvePath(parts.slice(0, i).join('/'));
    if (!(await fsExists(subPath))) {
      await fs.mkdir(subPath);
    }
  }
};

const outputDir = resolvePath('dist');
const publicDir = resolvePath('src/public');
const specialRoutes = ['', 'contacts/contact-info', 'not-found'];

await fs.rm(outputDir, { force: true, recursive: true });
await ensureDir(outputDir);
for (const file of await fs.readdir(publicDir)) {
  await fs.copyFile(resolvePath(publicDir, file), resolvePath(outputDir, file));
}
const buildResults = await esbuild.build({
  ...websiteEsbuildConfig,
  entryPoints: ['./src/main-hydrate.jsx'],
  outdir: outputDir,
  metafile: true,
  minify: true,
});
await esbuild.build({
  ...websiteEsbuildConfig,
  entryPoints: ['./src/app-ssr.jsx'],
  outdir: outputDir,
  splitting: false,
  treeShaking: true,
  minify: true,
});

const jsMain = await fs.readFile(resolvePath(outputDir, 'main-hydrate.js'), 'utf-8');
const cssMain = await fs.readFile(resolvePath(outputDir, 'main-hydrate.css'), 'utf-8');
const jsFileHash = createHash('md5').update(jsMain).digest('hex').substring(0, 8);
const cssFileHash = createHash('md5').update(cssMain).digest('hex').substring(0, 8);
await fs.writeFile(resolvePath(outputDir, `main-${jsFileHash}.js`), jsMain);
await fs.writeFile(resolvePath(outputDir, `main-${cssFileHash}.css`), cssMain);

const outputAssetsBySrcPath = {};
const outputs = buildResults.metafile.outputs;
for (const outputPath in outputs) {
  for (const inputPath in outputs[outputPath].inputs) {
    const inputExt = inputPath.split('.').pop();
    const outputExt = outputPath.split('.').pop();
    const sameExtension = inputExt === outputExt;
    const transformExtension = ['ts', 'js', 'tsx', 'jsx'].includes(inputExt) && outputExt === 'js';
    if (sameExtension || transformExtension) {
      outputAssetsBySrcPath[resolvePath(inputPath)] = resolvePath(outputPath);
    }
  }
}

const docsDir = resolvePath('docs');
const distDir = resolvePath('dist');

const { navigationTree } = await buildNavigation(docsDir);
globalThis.__ssr = true;

// eslint-disable-next-line import/extensions
await import('../dist/app-ssr.js');

const nodesList = [];
const traverse = (navigationNode) => {
  nodesList.push(navigationNode);
  const children = navigationNode.children ?? [];
  children.forEach(traverse);
};
navigationTree.forEach(traverse);

const allRoutes = [...nodesList.map(({ route }) => route), ...specialRoutes];
for (const route of allRoutes) {
  const directoryPath = resolvePath(distDir, route);
  await ensureDir(directoryPath);
}

const htmlBase = await fs.readFile('src/public/index.html', 'utf-8');
const preprocessArticleData = (navigationNode, pageData) => {
  if (!pageData) return {};
  const { route } = navigationNode;
  const dirname = resolvePath('docs', resolveDirname(navigationNode.filePath));
  const articleImagesPaths: string[] = [];

  pageData.tokens = pageData.tokens.map((token) => {
    if (token.type === 'example' || token.type === 'import') {
      const inputFilePath = resolvePath(dirname, token.filePath);
      const outputFilePath = outputAssetsBySrcPath[inputFilePath];
      const outputRelativePath =
        (process.env.PUBLIC_PATH || '/') + resolveRelativePath(outputDir, outputFilePath);
      token.load = token.load.replace(token.filePath, outputRelativePath);
      delete token.filePath;
    }
    return token;
  });

  const serializedArticle = serializeArticle(pageData);
  for (const variableName in pageData.imagesUrls) {
    const importPath = pageData.imagesUrls[variableName];
    const inputFilePath = resolvePath(dirname, importPath);
    const outputFilePath = outputAssetsBySrcPath[inputFilePath];

    if (!outputFilePath) {
      throw new Error(
        `Unable to find corresponding output chunk for ${importPath} from ${navigationNode.filePath}. Maybe you have duplicating asset file names?`,
      );
    }

    const outputRelativePath =
      (process.env.PUBLIC_PATH || '/') + resolveRelativePath(outputDir, outputFilePath);
    articleImagesPaths.push(`var ${variableName}="${outputRelativePath}";`);
  }
  const articleImagesPathsSerialized = articleImagesPaths.join('\n');
  const preloadedPageData = `(function (){ ${articleImagesPathsSerialized}; return ${serializedArticle} })()`;

  return {
    codeEntry: `__ssr_preloaded_page_route="${route}";
     __ssr_preloaded_page_data=(${preloadedPageData});`,
    preloadPageData: eval(preloadedPageData),
  };
};
const renderPage = async (route, navigationNode?) => {
  let codeEntry = '';
  let preloadPageData: {} | null = null;

  if (navigationNode) {
    const articlePath = resolvePath(docsDir, navigationNode.filePath);
    const articleData = await buildArticle(docsDir, articlePath, navigationNode.filePath);
    const preprocessedArticleData = preprocessArticleData(navigationNode, articleData);
    codeEntry = preprocessedArticleData.codeEntry;
    preloadPageData = preprocessedArticleData.preloadPageData;
  }

  globalThis.__ssr_route = route;
  globalThis.__ssr_page_data = preloadPageData;
  const contents = globalThis.renderApp();

  const html = htmlBase
    .replace('<!--%ssr-html-entry%-->', contents.html)
    .replace('<!--%ssr-head-html-entry%-->', contents.semcoreCss)
    .replace('/*--%ssr-js-entry%--*/', codeEntry)
    .replace('/main-render.css', process.env.PUBLIC_PATH + `main-${cssFileHash}.css`)
    .replace('/main-render.js', process.env.PUBLIC_PATH + `main-${jsFileHash}.js`)
    .replace('/social.png', process.env.PUBLIC_PATH + 'social.png');

  return html;
};

let nodesProgress = 1;
const contentfulNodes = nodesList.filter((node) => node.hasContent);
await Promise.all(
  contentfulNodes.map(async (navigationNode) => {
    const filePath = resolvePath(distDir, navigationNode.route, 'index.html');
    const html = await renderPage(navigationNode.route, navigationNode);
    await fs.writeFile(filePath, html);

    console.info(`SSR common routes: ${nodesProgress++}/${contentfulNodes.length}`);
  }),
);
let specialRoutesProgress = 1;
await Promise.all(
  specialRoutes.map(async (route) => {
    const filePath = resolvePath(distDir, route, 'index.html');
    const html = await renderPage(route);
    await fs.writeFile(filePath, html);

    console.info(`SSR special routes: ${specialRoutesProgress++}/${specialRoutes.length}`);
  }),
);
console.info(`SSR: Done`);
