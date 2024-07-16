import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Pills via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'website/docs/components/pills/examples/basic_example.tsx';
  const reportPath = 'website/docs/components/pills/pills-a11y-report.md';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent('<p>Stand:</>' + htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Like radio button, 1 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe("Don't care selected radio button, 2 of 3");
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Dislike radio button, 3 of 3');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toContain('selected');
  await voiceOver.previous();
  expect(await voiceOver.lastSpokenPhrase()).toContain('2 of 3');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
