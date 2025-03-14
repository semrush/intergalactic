import { expect, userEvent, within } from '@storybook/test';

export async function ItemActionsTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Explore menu items with actions');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const MenuItem4 = within(document.body).queryByText('Menu item 4');
  if (!MenuItem4) {
    throw new Error('Menu item 4 not found');
  }
  await userEvent.hover(MenuItem4);
}
