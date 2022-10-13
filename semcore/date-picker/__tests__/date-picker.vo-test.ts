import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with DatePicker and DateRangePicker via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/date-picker/examples/datepicker.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/date-picker/date-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toContain('Date MM/DD/YYYY edit text');
  await voiceOver.interact();
  for (let i = 0; i < 8; i++) {
    await voiceOver.press('Backspace', { application: 'Playwright' });
  }
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.next();
  await voiceOver.interact();
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.stopInteracting();

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
