import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with ColorPicker via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/color-picker/docs/examples/palettemanager.tsx';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.lastSpokenPhrase()).toBe('Color field, empty menu pop up button');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Color field, empty, press Tab to go to palette or click to hide palette menu pop up button',
  );
  await voiceOver.press('Tab', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Colors palette, press Tab+Shift to go back to color field group',
  );
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('list Preset colors 12 items');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Clear color group 1 of 12');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Color #2BB3FF group 2 of 12');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Color #8649E1 group 3 of 12');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Color field, current color is #8649E1 menu pop up button',
  );
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Color field, current color is #8649E1, press Tab to go to palette or click to hide palette menu pop up button',
  );
  await voiceOver.press('Tab', { application: 'Playwright' });
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Colors palette, press Tab+Shift to go back to color field group',
  );
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe('list Preset colors 12 items');
  for (let i = 0; i <= 12; i++) {
    await voiceOver.next();
  }
  expect(await voiceOver.lastSpokenPhrase()).toBe('end of list');
  await voiceOver.next();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Custom color field container empty group');
  await voiceOver.next();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Custom color field, HEX format FFFFFF edit text',
  );
  await voiceOver.interact();
  await voiceOver.type('0088FF', { application: 'Playwright' });
  await voiceOver.press('Enter', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.previous();
  await voiceOver.previous();
  expect(await voiceOver.lastSpokenPhrase()).toBe('Color #0088ff group');
  await voiceOver.act();
  expect(await voiceOver.lastSpokenPhrase()).toBe(
    'Color field, current color is #0088ff menu pop up button',
  );
});
