import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with AutoSuggest via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/auto-tips/examples/autosuggest.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/auto-tips/auto-tips-a11y-report.md',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Press Tab to go to popover Select option list box',
  );
  expect(await voiceOver.lastSpokenPhrase()).toContain('Menu pop-up combo box');
  await voiceOver.interact();
  await voiceOver.interact();
  await voiceOver.type('semrush', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.stopInteracting();
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.interact();
  await voiceOver.next();
  await voiceOver.next();
  const option = await voiceOver.itemText();
  await voiceOver.press('Control+Option+Space');
  await voiceOver.press('Shift+Tab', { application: 'Playwright' });
  await voiceOver.press('Shift+Tab', { application: 'Playwright' });
  await voiceOver.press('Shift+Tab', { application: 'Playwright' });
  await voiceOver.press('Shift+Tab', { application: 'Playwright' });
  await voiceOver.interact();
  expect((await voiceOver.lastSpokenPhrase()).toLowerCase()).toContain(option.toLowerCase());

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
