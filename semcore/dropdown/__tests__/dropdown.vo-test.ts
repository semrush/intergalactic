import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with Dropdown via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Trigger menu pop up button');
  await voiceOver.press('Control+Option+Space');
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Content clickable');
  await voiceOver.press('Escape', { application: 'Playwright' });
  expect(await voiceOver.itemText()).toBe('Trigger menu pop up button');
});
