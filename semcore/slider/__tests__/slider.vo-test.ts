import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Slider via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'stories/components/slider/docs/examples/slider_with_options.tsx';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toContain('Data chunk size slider');
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe('In slider');
  await voiceOver.press('Control+Option+ArrowLeft');
  expect(await voiceOver.itemText()).toContain('Small Data chunk size');
  await voiceOver.press('Control+Option+ArrowRight');
  await voiceOver.press('Control+Option+ArrowRight');
  expect(await voiceOver.itemText()).toContain('Big Data chunk size');
  await voiceOver.stopInteracting();
  expect(await voiceOver.itemText()).toContain('Big Data chunk size');
  expect(await voiceOver.lastSpokenPhrase()).toBe('Out of slider');
});
