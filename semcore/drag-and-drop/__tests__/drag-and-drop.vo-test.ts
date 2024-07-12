import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with DragAndDrop via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'website/docs/components/drag-and-drop/examples/with_tabpanel.tsx';
  const reportPath = 'website/docs/components/drag-and-drop/drag-and-drop-a11y-report.md';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Overview selected tab, 1 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('new Issues tab, 2 of 3');
  await voiceOver.press('Space', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toBe('newIssues grabbed, current position is 2 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('new Issues tab, 3 of 3');
  await voiceOver.press('Space', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toBe('newIssues dropped, final position is 3 of 3');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
