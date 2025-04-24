import { within, userEvent } from '@storybook/testing-library';

export async function MonthRangePickerTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Получаем все элементы-триггеры
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
