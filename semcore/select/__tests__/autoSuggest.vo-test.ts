import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with AutoSuggest via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath =
    'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();

  expect(await voiceOver.lastSpokenPhrase()).toContain('Menu pop-up combo box');
  await voiceOver.interact();
  await voiceOver.interact();
  await voiceOver.type('semrush', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.stopInteracting();
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.interact();
  await voiceOver.next();
  await voiceOver.next();
  const option = (await voiceOver.itemText()).toLowerCase().replace(/\s/g, '');
  await voiceOver.press('Control+Option+Space', { application: 'Playwright' });
  await voiceOver.interact();
  await voiceOver.next();
  expect((await voiceOver.lastSpokenPhrase()).toLowerCase().replace(/\s/g, '')).toContain(
    option.toLowerCase(),
  );
});
