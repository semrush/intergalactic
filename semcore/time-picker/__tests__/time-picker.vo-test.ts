import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with TimePicker via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/time-picker/examples/expanded.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/time-picker/time-picker-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Time input, no time entered group');
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Hours input field 00 edit text');
  await voiceOver.interact();
  await voiceOver.type('04', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.next();
  await voiceOver.interact();
  await voiceOver.type('20', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.previous();
  await voiceOver.stopInteracting();
  expect(await voiceOver.itemText()).toBe('Time input, entered time is 4:20 AM group');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
