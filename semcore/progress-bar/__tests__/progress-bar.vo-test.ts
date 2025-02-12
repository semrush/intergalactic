import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test('Users can interact with ProgressBar via VoiceOver', async ({ page, voiceOver }) => {
  const standPath = 'website/docs/components/progress-bar/examples/basic-usage.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  await voiceOver.interact();
  await voiceOver.next();

  for (let i = 0; i < 10; i++) {
    expect(await voiceOver.itemText()).toContain('% progress indicator');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});
