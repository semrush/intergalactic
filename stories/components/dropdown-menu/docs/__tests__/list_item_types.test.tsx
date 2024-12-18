import { expect, userEvent, within } from '@storybook/test';

export async function ListItemTypesTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Explore menu item types");
  if (!(trigger)) {
    throw new Error('Trigger not found');
  }
 await userEvent.click(trigger);

 await new Promise((resolve) => setTimeout(resolve, 1000));
const MenuItem1 = within(document.body).queryByText("Menu item 2");
if (!(MenuItem1)) {
 throw new Error('Menu item 2 not found');
 }
await userEvent.click(MenuItem1);

}
