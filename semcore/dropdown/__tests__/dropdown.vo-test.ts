import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Dropdown via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/dropdown/examples/dropdown.tsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/dropdown/dropdown-a11y-report.md',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Trigger menu pop up button');
  await voiceOver.press('Control+Option+Space');
  expect(await voiceOver.lastSpokenPhrase()).toContain('Trigger menu pop up button');
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Content  clickable');
  await voiceOver.press('Escape', { application: 'Playwright' });
  expect(await voiceOver.itemText()).toBe('Trigger menu pop up button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
