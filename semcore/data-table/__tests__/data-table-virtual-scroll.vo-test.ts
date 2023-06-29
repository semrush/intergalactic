import { expect } from '@semcore/testing-utils/playwright';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test('Users can interact with DataTable virtual scroll via VoiceOver', async ({
  page,
  voiceOver,
}) => {
  const standPath = 'website/docs/table-group/data-table/examples/virtual-scroll.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  await voiceOver.interact();

  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toContain('In table');
  for (let i = 0; i < 5; i++) {
    await voiceOver.press('Control+Option+ArrowDown');
  }
  expect((await voiceOver.lastSpokenPhrase()).replace(/[,\s]/g, ' ')).toBe('row 6 of 10 000 #5');
});
