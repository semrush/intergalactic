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
  invalidLinks: Set<string>;
  invalidTabs: Set<string>;
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

function validateFilesAndTabs(filePath: string) {
  const fileDir = path.dirname(filePath);

  const visitedTabs = new Set<string>();
  const invalidTabs = new Set<string>();
  const staleFiles = getMarkdownFilesInDirectory(fileDir, filePath);

  const content = fs.readFileSync(filePath, 'utf-8');
  const rootTabs = extractTabsFromContent(content);

  function validateTab(tab: string) {
    if (visitedTabs.has(tab)) return;

    visitedTabs.add(tab);

    const tabPath = path.join(fileDir, `${tab}.md`);

    if (fs.existsSync(tabPath)) {
      staleFiles.delete(tabPath);
    } else {
      invalidTabs.add(tabPath);
      return;
    }

    const tabContent = fs.readFileSync(tabPath, 'utf-8');
    const tabs = extractTabsFromContent(tabContent);

    tabs.forEach(validateTab);
  }

  rootTabs.forEach(validateTab);

  return { invalidTabs, staleFiles };
}

function validateLinks(links: string[]): ValidationResult {
  const result: ValidationResult = {
    invalidLinks: new Set(),
    invalidTabs: new Set(),
    staleFiles: new Set(),
  };

  for (const link of links) {
    const filePath = path.join(DOCS_DIR, `${link}.md`);

    if (!fs.existsSync(filePath)) {
      result.invalidLinks.add(filePath);
      continue;
    }

    const { invalidTabs, staleFiles } = validateFilesAndTabs(filePath);

    invalidTabs.forEach((file) => result.invalidTabs.add(file));
    staleFiles.forEach((file) => result.staleFiles.add(file));
  }

  return result;
}

function reportValidationResults(result: ValidationResult): void {
  let hasCriticalError = false;
  const { invalidLinks, invalidTabs, staleFiles } = result;

  if (invalidLinks.size > 0) {
    console.error(
      '[validate-sidebar-links]: ❌ invalid sidebar links are detected.\n',
      JSON.stringify([...invalidLinks], null, 2),
    );
    hasCriticalError = true;
  }

  if (invalidTabs.size > 0) {
    console.error(
      '[validate-sidebar-links]: ❌ invalid tabs are detected.\n',
      JSON.stringify([...invalidTabs], null, 2),
    );
    hasCriticalError = true;
  }

  if (staleFiles.size > 0) {
    console.warn(
      '[validate-sidebar-links]: ⚠️ stale files are detected.\n',
      JSON.stringify([...staleFiles], null, 2),
    );
  }

  if (hasCriticalError) {
    process.exit(1);
  }

  console.log('[validate-sidebar-links]: ✅ all sidebar links/tabs are valid and reachable.');
}

function validateSidebarLinks(): void {
  const links = extractLinksFromConfig(sideBarConfig);
  const validationResult = validateLinks(links);
  reportValidationResults(validationResult);
}

validateSidebarLinks();
