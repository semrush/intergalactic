import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

getReportHeader();

test('Users can interact with Accodrion via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/accordion/examples/base.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/accordion/accordion-a11y-report.md',
  );
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Section 1 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 2 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');
  await voiceOver.previous();
  await voiceOver.previous();
  expect(await voiceOver.itemText()).toBe('Section 1 collapsed button');
  await voiceOver.act();
  await voiceOver.next();
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Hello Section 1');
  await voiceOver.stopInteracting();
  await voiceOver.previous();
  await voiceOver.act();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 2 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
