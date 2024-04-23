import { expect } from '@semcore/testing-utils/playwright';
import { voiceOverTest as test } from '@guidepup/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Modal via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = 'website/docs/components/modal/examples/basic_modal_window_usage.tsx';
  const reportPath = 'website/docs/components/modal/modal-a11y-report.md';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Open modal button');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Do you want to save your changes? web dialog with 5 items Close button',
  );
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Do you want to save your changes? heading level 2');
  await voiceOver.next();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Save changes button');
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Open modal button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
