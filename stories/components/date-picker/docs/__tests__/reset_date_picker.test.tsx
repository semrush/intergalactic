import { expect, userEvent, within } from 'storybook/test';

export async function ResetDatePickerTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelector('[data-ui-name="DatePicker.Trigger"]');
  const resetButton = canvasElement.querySelector('[data-ui-name="Button"]');

  if (!triggers) {
    throw new Error(`Expected at least 1 triggers`);
  }

  if (!resetButton) {
    throw new Error(`Expected at resetButton`);
  }

  await userEvent.click(resetButton);
  await userEvent.click(triggers);
}
