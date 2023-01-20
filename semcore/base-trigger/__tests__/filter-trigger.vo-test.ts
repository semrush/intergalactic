import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';
import { writeFile } from 'fs/promises';

test('Users can interact with FilterTrigger via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/filter-trigger/examples/select.tsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/filter-trigger/filter-trigger-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  await voiceOver.next();
  expect(await voiceOver.itemText()).toContain('Select option');
  await voiceOver.act();
  await voiceOver.next();
  await voiceOver.next();
  await voiceOver.next();
  await voiceOver.act();
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Select option Filter list box pop up group');
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Option 3');
  await voiceOver.next();
  await voiceOver.act();
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Select option Filter list box pop up group');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
