import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.describe('InputMask', () => {
  test('Users can interact with InputMask via VoiceOver', async ({
    page,
    voiceOver: pureVoiceOver,
  }) => {
    test.skip();
    const standPath = 'website/docs/components/input-mask/examples/inputmask.tsx';
    const reportPath = 'website/docs/components/input-mask/input-mask-a11y-report.md';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
    await voiceOver.interact();
    await voiceOver.next();

    expect(await voiceOver.lastSpokenPhrase()).toContain('Card number');
    expect(await voiceOver.lastSpokenPhrase()).toContain('edit text');
    await voiceOver.interact();
    await voiceOver.type('55aa44 ', { application: 'Playwright' });
    for (let i = 0; i <= 20; i++) {
      const itemText = await voiceOver.itemText();
      if (itemText.startsWith('5544')) break;
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (i === 20) {
        expect((await voiceOver.itemText()).substring(0, 4)).toBe('5544');
      }
    }
    await voiceOver.stopInteracting();
    expect(await voiceOver.lastSpokenPhrase()).toBe('Out of edit text');

    const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

    await writeFile(reportPath, report);
  });
});
