import { expect, userEvent, within } from '@storybook/test';

export async function SelectableRadioTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Explore menu items");
  if (!(trigger)) {
    throw new Error('Trigger not found');
  }
 await userEvent.click(trigger);

 await new Promise((resolve) => setTimeout(resolve, 1000));
 const menuItem2 = within(document.body).queryByRole("menuitemradio", { name: "Menu item 2" });

 if (!menuItem2) {
   throw new Error('Menu item with name "Menu item 1" not found');
 }
 await userEvent.click(menuItem2);
 await new Promise((resolve) => setTimeout(resolve, 1000));
 expect(menuItem2).not.toBeVisible();

 await userEvent.click(trigger);
 await new Promise((resolve) => setTimeout(resolve, 1000));
 const parentDiv = menuItem2.closest('[data-ui-name="DropdownMenu.Item"]');
 expect(parentDiv).toHaveAttribute('aria-checked', 'true');
};
