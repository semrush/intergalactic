import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with Dropdown via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/dropdown/examples/dropdown.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/dropdown/dropdown-a11y-report.md',
  );
  const { htmlContent, awaitJsEvaluation } = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);
  await awaitJsEvaluation(page);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Trigger menu pop up button');
  await voiceOver.press('Control+Option+Space');
  expect(await voiceOver.lastSpokenPhrase()).toContain('Press Tab to go to popover');
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Content  clickable');
  await voiceOver.press('Escape', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toBe('Trigger menu pop up button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
