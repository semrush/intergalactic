import { expect, userEvent, within } from '@storybook/test';

export async function NestedWithFocusableTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = within(document.body).queryByText("Click me");
  if (!(button)) {
    throw new Error('Section 1 not found');
  }
 await userEvent.click(button);

const MenuItem1 = within(document.body).queryByText("Item 1");
// if (!(MenuItem1)) {
//  throw new Error('Section 1 not found');
//  }
//await userEvent.click(MenuItem1);

//  const MenuItem4 = within(document.body).queryByPlaceholderText("1");
//  if (!(MenuItem4)) {
//     throw new Error('Section 1 not found');
//   }
//  await userEvent.hover(MenuItem4);

 

}
