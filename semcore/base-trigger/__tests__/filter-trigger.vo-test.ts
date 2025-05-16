import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with FilterTrigger via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('Select option');
  await voiceOver.act();
  await voiceOver.next();
  await voiceOver.next();
  await voiceOver.next();
  await voiceOver.act();
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Option 3');
  await voiceOver.next();
  await voiceOver.act();
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Filter Select option list box pop up button');
});
