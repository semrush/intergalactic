import { within, userEvent } from '@storybook/testing-library';

export async function TriggerAndPopperTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Получаем все элементы-триггеры
  const triggers = canvasElement.querySelector('[data-ui-name="DatePicker.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggers);

}
