import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Button with only Addons via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/button/docs/examples/button_with_icon.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Confirm button');
});

test('Users can interact with Button with only addon props', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/button/docs/examples/button_accessibility.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Confirm action button');

  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Close notification button');
});
