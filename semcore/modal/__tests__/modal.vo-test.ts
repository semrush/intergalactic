import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Modal via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Open modal button');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Do you want to save your changes? web dialog with 5 items Close button',
  );
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Do you want to save your changes? heading level 2');
  await voiceOver.next();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Save changes button');
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Open modal button');
});
