import { expect, userEvent, within } from '@storybook/test';

export async function CustomHeaderTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelector('[data-ui-name="DatePicker.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least `);
  }

  await userEvent.click(triggers);

}
