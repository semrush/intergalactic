import { expect } from '@semcore/testing-utils/playwright';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test('Users can interact with Slider via VoiceOver', async ({ page, voiceOver: pureVoiceOver }) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/inline-edit/examples/simple-text.tsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/inline-edit/inline-edit-a11y-report.md',
  );

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toContain('Author');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toContain('Tap to edit');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toContain('edit text');
  expect(await voiceOver.lastSpokenPhrase()).toContain(
    'Press Enter to apply value, press Escape to discard changes',
  );
  for (let i = 0; i < 12; i++) {
    await voiceOver.press('Backspace', { application: 'Playwright' });
  }
  await voiceOver.type('Algernon');
  await voiceOver.press('Enter', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toContain('Algernon');
  await voiceOver.act();
  await voiceOver.type('Hello world?');
  await voiceOver.press('Escape', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toContain('Algernon');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
