import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with Select via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/select/docs/examples/basic_usage.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Select an option, sir 🧐 list box pop up button',
  );
  await voiceOver.press('Control+Option+Space');
  await voiceOver.press('Tab', { application: 'Playwright' });
  expect(await voiceOver.itemText()).toBe('Select an option, sir 🧐 list box');
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Option 0');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Option 1');
  await voiceOver.press('Control+Option+Space');
  expect(await voiceOver.itemText()).toContain('Label 1');
});
