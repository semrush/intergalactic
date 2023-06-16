import { expect } from '@semcore/testing-utils/playwright';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with DropdownMenu via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'website/docs/components/dropdown-menu/examples/basic.tsx';
  const reportPath = 'website/docs/components/dropdown-menu/dropdown-menu-a11y-report.md';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.press('Tab', { application: 'Playwright' });

  await voiceOver.press('Control+Option+Space');
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.next();
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Item 1 menu item');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Item 2 menu item');
  await voiceOver.press('Escape');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Click me menu pop up button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
