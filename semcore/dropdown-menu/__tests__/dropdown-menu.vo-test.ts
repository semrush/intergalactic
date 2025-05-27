import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with DropdownMenu via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/dropdown-menu/docs/examples/basic.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.press('Tab', { application: 'Playwright' });

  await voiceOver.press('Control+Option+Space');
  await voiceOver.press('Tab', { application: 'Playwright' });
  await voiceOver.next();
  await voiceOver.interact();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Item 1 menu item');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Item 2 menu item');
  await voiceOver.press('Escape');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Click me menu pop up button');
});
