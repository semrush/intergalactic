import { expect, userEvent, within } from '@storybook/test';

export async function BasicExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  //Interactions by the mouse
  const trigger = within(document.body).queryByText("Open modal");

  if (!(trigger)) {
    throw new Error('Section 1 not found');
  }

 await userEvent.click(trigger);
 await new Promise((resolve) => setTimeout(resolve, 500));
 
 const modal = canvas.findByRole ('dialog')
 await expect(modal).toHaveAttribute('arial-modal', 'true');

 


}
