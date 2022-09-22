import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/jest-preset-ui/vo-reporter';

test('Users can interact with InputMask via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/input-mask/examples/basic.jsx',
  );
  const reportPath = resolvePath(
    __dirname,
    '../../../website/docs/components/input-mask/input-mask-a11y-report.md',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe('16-digit number invalid data edit text');
  await voiceOver.interact();
  await voiceOver.type('55aa44 ', { application: 'Playwright' });
  for (let i = 0; i <= 20; i++) {
    const lastSpokenPhrase = await voiceOver.lastSpokenPhrase();
    if (lastSpokenPhrase === '5544') break;
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (i === 20) {
      expect(await voiceOver.lastSpokenPhrase()).toBe('5544');
    }
  }
  await voiceOver.stopInteracting();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Out of edit text');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
