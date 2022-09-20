import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/jest-preset-ui/e2e-stand';
import { resolve as resolvePath } from 'path';

test('Users can interact with ProgressBar via VoiceOver', async ({ page, voiceOver }) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/components/progress-bar/examples/progress-bar.jsx',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);
  await voiceOver.interact();

  for (let i = 0; i < 10; i++) {
    expect(await voiceOver.itemText()).toContain('0 % progress indicator');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});
