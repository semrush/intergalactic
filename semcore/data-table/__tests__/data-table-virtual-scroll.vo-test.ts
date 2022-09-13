import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';

test('Users can interact with DataTable virtual scroll via VoiceOver', async ({
  page,
  voiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/table-group/data-table/examples/virtual-scroll.jsx',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  await voiceOver.interact();

  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toContain('In table');
  for (let i = 0; i < 5; i++) {
    await voiceOver.press('Control+Option+ArrowDown');
  }
  expect(await voiceOver.lastSpokenPhrase()).toBe('row 5 of 10 000 #5');
});
