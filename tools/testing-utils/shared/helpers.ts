import { expect } from '@playwright/test';
import type { Locator, Page } from 'playwright';

import { e2eStandToHtml } from '../e2e-stand';

const stands = new Map<string, string>();

export async function loadPage(page: Page, examplePath: string, lang: string, props?: Record<string, unknown>) {
  const key = `${examplePath}_${lang}_${props ? JSON.stringify(props) : ''}`;
  const htmlContent = stands.get(key) ?? await e2eStandToHtml(examplePath, lang, props ?? {});

  if (!stands.has(key)) {
    stands.set(key, htmlContent);
  }

  await page.setContent(htmlContent);
}

export async function expectEachToHaveAttribute(
  locator: Locator,
  attribute: string,
  value: string,
) {
  await expect(locator).not.toHaveCount(0);

  const actual = await locator.evaluateAll(
    (elements, name) => elements.map((element) => element.getAttribute(name)),
    attribute,
  );

  expect(actual).toEqual(actual.map(() => value));
}
