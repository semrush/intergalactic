import { expect, userEvent, within } from '@storybook/test';

export async function NestedWithFocusableTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Click me");
  if (!(trigger)) {
    throw new Error('Trigger not found');
  }
 await userEvent.click(trigger);

 await new Promise((resolve) => setTimeout(resolve, 1000));
const MenuItem1 = within(document.body).queryByText("Item 1");
if (!(MenuItem1)) {
 throw new Error('Item 1 not found');
 }
await userEvent.click(MenuItem1);

}
