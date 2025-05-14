import { expect, userEvent, within } from '@storybook/test';

export async function MonthRangePickerTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelector('[data-ui-name="MonthPicker.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggers);

  const triggersRange = canvasElement.querySelector('[data-ui-name="MonthRangePicker.Trigger"]');
  if (!triggersRange) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggersRange);

}
