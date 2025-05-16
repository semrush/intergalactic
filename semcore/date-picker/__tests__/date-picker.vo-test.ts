import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with DatePicker and DateRangePicker via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';

  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);
  const { voiceOver } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toContain('Date field');
  await voiceOver.interact();
  for (let i = 0; i < 8; i++) {
    await voiceOver.press('Backspace', { application: 'Playwright' });
  }
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.interact();
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.stopInteracting();
  await voiceOver.next();
  await voiceOver.interact();
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.type('05', { application: 'Playwright' });
  await voiceOver.type('29', { application: 'Playwright' });
  await voiceOver.type('2000', { application: 'Playwright' });
  await voiceOver.stopInteracting();
});
