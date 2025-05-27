import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with DataTable via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/data-table/docs/examples/base.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);

  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toContain('In Table');
  await voiceOver.press('Control+Option+ArrowDown');
  await voiceOver.press('Control+Option+ArrowDown');
  await voiceOver.press('Control+Option+ArrowRight');
  await voiceOver.press('Control+Option+ArrowRight');
  expect(await voiceOver.lastSpokenPhrase()).toContain('column 3 of');
  await voiceOver.press('Control+Option+ArrowDown');
  expect(await voiceOver.lastSpokenPhrase()).toContain('row 4 of');
});
