import { within, userEvent } from '@storybook/testing-library';

export async function CustomDateRangesTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Получаем все элементы-триггеры
  const triggers = canvasElement.querySelectorAll('[data-ui-name="DateRangePicker.Trigger"]');
  if (triggers.length < 2) {
    throw new Error(`Expected at least 2 triggers, but found ${triggers.length}`);
  }

  // Берём второй триггер (индекс 1) и кликаем по нему
  const firstTrigger = triggers[2] as HTMLElement;
  await userEvent.click(firstTrigger);

}
