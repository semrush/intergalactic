import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with Carousel via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/carousel/examples/dots.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/carousel/carousel-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('list');
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('1 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('2 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toContain('3 of 3');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
