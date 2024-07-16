import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Carousel via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath =
    'website/docs/components/carousel/examples/carousel_with_default_indicators.tsx';
  const reportPath = 'website/docs/components/carousel/carousel-a11y-report.md';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Beauty of Nature image carousel');
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('list Beauty of Nature 3 items');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('1 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('2 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('3 of 3');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
