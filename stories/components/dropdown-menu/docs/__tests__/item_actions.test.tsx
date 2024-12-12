import { expect, userEvent, within } from '@storybook/test';

export async function ItemActionsTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = within(document.body).queryByText("Explore menu items with actions");
  if (!(button)) {
    throw new Error('Section 1 not found');
  }
 await userEvent.click(button);

 const MenuItem4 = within(document.body).queryByText("Menu item 4");
 if (!(MenuItem4)) {
    throw new Error('Section 1 not found');
  }
 await userEvent.hover(MenuItem4);

 

}
