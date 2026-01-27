import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import type { SidebarConfig } from '../docs/.vitepress/sidebarConfig';
import { sideBarConfig } from '../docs/.vitepress/sidebarConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = path.join(__dirname, '..', 'docs');

interface ValidationResult {
  validLinks: Set<string>;
  invalidLinks: Set<string>;
  staleFiles: Set<string>;
}

function extractLinksFromConfig(config: SidebarConfig): string[] {
  return config.flatMap((item) => {
    const links = item.link ? [item.link] : [];
    const nestedLinks = item.items ? extractLinksFromConfig(item.items) : [];
    return [...links, ...nestedLinks];
  });
}

function extractTabsFromContent(content: string) {
  const tabsMatch = content.match(/tabs:\s*(.+)/);
  if (!tabsMatch) return [];

  return [...tabsMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function getMarkdownFilesInDirectory(dirPath: string, excludeFile: string) {
  const entries = fs.readdirSync(dirPath);
  const mdFiles = entries
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dirPath, file));

  return new Set(mdFiles.filter((file) => file !== excludeFile));
}

function validateFileAndTabs(filePath: string) {
  const valid = new Set<string>([filePath]);
  const invalid = new Set<string>();

  const content = fs.readFileSync(filePath, 'utf-8');
  const tabs = extractTabsFromContent(content);

  const fileDir = path.dirname(filePath);
  const mdFilesInDir = getMarkdownFilesInDirectory(fileDir, filePath);

  for (const tab of tabs) {
    const tabPath = path.join(fileDir, `${tab}.md`);

    if (fs.existsSync(tabPath)) {
      valid.add(tabPath);
      mdFilesInDir.delete(tabPath);
    } else {
      invalid.add(tabPath);
    }
  }

  return { valid, invalid, stale: mdFilesInDir };
}

function validateLinks(links: string[]): ValidationResult {
  const result: ValidationResult = {
    validLinks: new Set(),
    invalidLinks: new Set(),
    staleFiles: new Set(),
  };

  for (const link of links) {
    const filePath = path.join(DOCS_DIR, `${link}.md`);

    if (!fs.existsSync(filePath)) {
      result.invalidLinks.add(filePath);
      continue;
    }

    const { valid, invalid, stale } = validateFileAndTabs(filePath);

    valid.forEach((file) => result.validLinks.add(file));
    invalid.forEach((file) => result.invalidLinks.add(file));
    stale.forEach((file) => result.staleFiles.add(file));
  }

  return result;
}

function reportValidationResults(result: ValidationResult): void {
  const { invalidLinks, staleFiles } = result;

  if (invalidLinks.size > 0) {
    console.error(
      '[validate-sidebar-links]: ❌ invalid sidebar links are detected.\n',
      JSON.stringify([...invalidLinks], null, 2),
    );
    process.exit(1);
  }

  if (staleFiles.size > 0) {
    console.warn(
      '[validate-sidebar-links]: ⚠️ stale files are detected.\n',
      JSON.stringify([...staleFiles], null, 2),
    );
  }

  console.log('[validate-sidebar-links]: ✅ all sidebar links are valid and reachable.');
}

function validateSidebarLinks(): void {
  const links = extractLinksFromConfig(sideBarConfig);
  const validationResult = validateLinks(links);
  reportValidationResults(validationResult);
}

validateSidebarLinks();
