import { within, userEvent } from '@storybook/testing-library';

export async function CustomHeaderTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Получаем все элементы-триггеры
  const triggers = canvasElement.querySelector('[data-ui-name="DatePicker.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least `);
  }

  // Берём второй триггер (индекс 1) и кликаем по нему
  await userEvent.click(triggers);

}
