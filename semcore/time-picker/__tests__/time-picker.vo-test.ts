import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with TimePicker via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath =
    'website/docs/components/time-picker/examples/expanded_access_to_all_the_components.tsx';
  const reportPath = 'website/docs/components/time-picker/time-picker-a11y-report.md';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  await voiceOver.next();
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toContain('Time input, no time entered group');
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Hours input field 00 list box pop up Menu pop-up combo box',
  );
  await voiceOver.interact();
  await voiceOver.type('04', { application: 'Playwright' });
  await voiceOver.next();
  await voiceOver.type('20', { application: 'Playwright' });
  await voiceOver.press('Enter', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Time input, entered time is 4:20 AM group');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
