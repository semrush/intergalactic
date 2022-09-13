import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with DataTable via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/table-group/data-table/examples/base.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/table-group/table/data-table-a11y-report.md',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toContain('In table');
  await voiceOver.press('Control+Option+ArrowDown');
  await voiceOver.press('Control+Option+ArrowDown');
  await voiceOver.press('Control+Option+ArrowRight');
  await voiceOver.press('Control+Option+ArrowRight');
  expect(await voiceOver.lastSpokenPhrase()).toContain('column 3 of');
  await voiceOver.press('Control+Option+ArrowDown');
  expect(await voiceOver.lastSpokenPhrase()).toContain('row 4 of');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
