import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with Pills via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/pills/examples/basic.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/pills/pills-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Like radio button, 1 of 3');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe("Don't care selected radio button, 2 of 3");
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Dislike radio button, 3 of 3');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe('selected Dislike radio button, 3 of 3');
  await voiceOver.previous();
  expect(await voiceOver.lastSpokenPhrase()).toBe("Don't care radio button, 2 of 3");

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
