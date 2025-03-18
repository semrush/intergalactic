import { expect, userEvent, within } from '@storybook/test';

export async function TheSecondMethodTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Explore menu items');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);
}
