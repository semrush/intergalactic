import { expect, userEvent, within } from '@storybook/test';

export async function MultiselectItemsTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Explore menu items');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const menuItem1 = within(document.body).queryByRole('menuitemcheckbox', { name: 'Menu item 1' });

  if (!menuItem1) {
    throw new Error('Menu item with name "Menu item 1" not found');
  }
  expect(menuItem1).toHaveAttribute('aria-checked', 'true');
  await userEvent.click(menuItem1);
  expect(menuItem1).toHaveAttribute('aria-checked', 'false');
}
