import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';

test('Users can interact with Slider via VoiceOver', async ({ page, voiceOver }) => {
  const htmlContent = await e2eStandToHtml(resolvePath(__dirname, 'slider.vo-stand.tsx'), 'en');
  await page.setContent(htmlContent);
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('2 slider');
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe('In slider');
  await voiceOver.press('Control+Option+ArrowLeft');
  expect(await voiceOver.itemText()).toBe('1 slider');
  await voiceOver.press('Control+Option+ArrowRight');
  await voiceOver.press('Control+Option+ArrowRight');
  expect(await voiceOver.itemText()).toBe('3 slider');
  await voiceOver.stopInteracting();
  expect(await voiceOver.itemText()).toBe('3 slider');
  expect(await voiceOver.lastSpokenPhrase()).toBe('Out of slider');
});
