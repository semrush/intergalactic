import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { slugify } from '@mdit-vue/shared';
import { JSDOM } from 'jsdom';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

const md = new markdownIt().use(markdownItAnchor, {
  slugify,
});

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.resolve(__dirname, '..', 'docs'); // Root directory for Markdown files
const mdFiles = [];

function collectMdFiles(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMdFiles(fullPath);
    } else if (entry.name.endsWith('.md')) {
      mdFiles.push(fullPath);
    }
  }
}

function extractLinks(content: string) {
  const tokens = md.parse(content, {});
  const links = [];
  const routeRegexp = /(?<!\/\/ *)route: '([./a-z0-9-#]+)'/;

  for (const token of tokens) {
    let lines = '';
    if (token.map) {
      const [start, end] = token.map;
      lines = `:${start + 1}`;
      if (start + 1 !== end)
        lines += `-${end}`;
    }
    if (token.type === 'inline' && token.children) {
      let i = 0;
      for (const child of token.children) {
        if (child.type === 'link_open') {
          // don't check commented links
          const prev = token.children[i - 1];

          if (prev && prev.type === 'text' && prev.content.startsWith('<!--')) {
            continue;
          }

          const href = child.attrs.find((attr) => attr[0] === 'href');
          if (href) links.push([href[1], lines]);
        } else if (child.type === 'text' && child.content.includes('route:')) {
          if (child.content.match(routeRegexp))
            links.push([child.content.match(routeRegexp)[1], lines]);
        }

        i++;
      }
    } else if (token.type === 'code_block' && token.content.includes('route:')) {
      if (token.content.match(routeRegexp))
        links.push([token.content.match(routeRegexp)[1], lines]);
    }
  }

  return links;
}

function extractAnchorsFromMarkdown(content: string) {
  const html = md.render(content);
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  return headings.map((h) => h.getAttribute('id')).slice(1);
}

function normalizePath(filePath: string) {
  return filePath.replace(/\\/g, '/');
}

function checkLinks() {
  collectMdFiles(docsDir);

  const fileAnchorMap = {}; // filename => [anchor IDs]

  // Pre-extract all anchor IDs from Markdown files
  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const anchors = extractAnchorsFromMarkdown(content);
    const relativePath = normalizePath(path.relative(docsDir, file));
    fileAnchorMap[relativePath] = anchors;
  }

  let hasErrors = false;

  // Validate links and anchors
  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const links = extractLinks(content);
    const fromFile = normalizePath(path.relative(docsDir, file));

    for (const [link, lines] of links) {
      if (link.startsWith('http') || link.startsWith('mailto:')) continue; // Skip external links

      const [linkPathRaw, anchor] = link.split('#');
      let linkPath = fromFile;

      if (linkPathRaw !== '') {
        linkPath = normalizePath(linkPathRaw.endsWith('.md') ? linkPathRaw : linkPathRaw + '.md');

        if (linkPathRaw.startsWith('/')) {
          linkPath = linkPath.slice(1);
        } else {
          linkPath = normalizePath(
            path.relative(docsDir, path.resolve(docsDir, path.dirname(fromFile), linkPath)),
          );
        }
      }
      const targetFilePath = path.join(docsDir, linkPath);

      // Check if target file exists
      if (!fs.existsSync(targetFilePath)) {
        console.warn(`❌ [${fromFile}${lines}] → "${link}" — file not found: ${linkPath}`);
        hasErrors = true;
        continue;
      }

      // Check if anchor exists in the target file
      if (anchor) {
        const anchors = fileAnchorMap[linkPath];
        if (!anchors || !anchors.includes(anchor)) {
          console.warn(
            `⚠️ [${fromFile}] → "${link}" — anchor "#${anchor}" not found in "${linkPath}"`,
          );
          hasErrors = true;
        }
      }
    }
  }

  if (hasErrors) {
    console.log('\n🔍 Check completed with errors.');
    process.exit(1);
  } else {
    console.log('✅ All links and anchors are valid.');
  }
}

checkLinks();
