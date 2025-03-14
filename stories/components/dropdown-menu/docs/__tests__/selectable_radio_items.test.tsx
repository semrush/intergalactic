import { expect, userEvent, within } from '@storybook/test';

export async function SelectableRadioTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Explore menu items');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const menuItem2 = within(document.body).queryByRole('menuitemradio', { name: 'Menu item 2' });

  if (!menuItem2) {
    throw new Error('Menu item with name "Menu item 1" not found');
  }
  await userEvent.click(menuItem2);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  expect(menuItem2).not.toBeVisible();

  await userEvent.click(trigger);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const menuItem = await canvas.findByRole('menuitemradio', { name: /Menu item 2/i });

  await expect(menuItem).toBeVisible();

  await expect(menuItem).toHaveAttribute('data-ui-name', 'DropdownMenu.Item.Content');
  await expect(menuItem).toHaveAttribute('aria-checked', 'true');
  await expect(menuItem).toHaveAttribute('aria-expanded', 'true');
  await expect(menuItem).toHaveAttribute('role', 'menuitemradio');
  await expect(menuItem).toHaveAttribute('tabindex', '0');
}
