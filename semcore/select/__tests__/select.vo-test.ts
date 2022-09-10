import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with Select via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/select/examples/basic.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/select/select-a11y-report.md',
  );
  const { htmlContent, awaitJsEvaluation } = await e2eStandToHtml(standPath, 'en');

  await page.reload();
  await page.setContent(htmlContent);
  await awaitJsEvaluation(page);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Select an option, sir 🧐 list box pop up button',
  );
  await voiceOver.press('Control+Option+Space');
  expect(await voiceOver.lastSpokenPhrase()).toContain('Press Tab to go to popover');
  await voiceOver.press('Tab', { application: 'Playwright' });
  expect(await voiceOver.itemText()).toBe('List of options list box');
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Option 0');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Option 1');
  await voiceOver.press('Control+Option+Space');
  expect(await voiceOver.itemText()).toContain('Label 1');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
