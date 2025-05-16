import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Carousel via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath =
    'website/docs/components/carousel/examples/carousel_with_default_indicators.tsx';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Beauty of Nature carousel');
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('Beauty of Nature group');
  await voiceOver.next();
  // 'A cyclist performing stunts in the forest',
  // 'A vulture flies with its wings spread wide',
  // 'A pug wrapped in a blanket sits on the road in the forest',
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Open in fullscreen A cyclist performing stunts in the forest current item button',
  );
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Open in fullscreen A vulture flies with its wings spread wide button',
  );
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Open in fullscreen A pug wrapped in a blanket sits on the road in the forest button',
  );
});
