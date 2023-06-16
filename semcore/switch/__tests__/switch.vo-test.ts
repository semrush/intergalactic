/* eslint-disable no-console */
import { expect } from '@semcore/testing-utils/playwright';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Switch via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'website/docs/components/switch/examples/two-addons.tsx';
  const reportPath = 'website/docs/components/switch/switch-a11y-report.md';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Enabled on switch');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe('off Disabled switch');
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Disabled off switch');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
