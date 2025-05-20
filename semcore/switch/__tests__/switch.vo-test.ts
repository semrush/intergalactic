import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Switch via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
  const reportPath = 'website/docs/components/switch/switch-a11y-report.md';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();
  await voiceOver.previous();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Receive updates on switch');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe('off Receive updates switch');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe('on Receive updates switch');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
