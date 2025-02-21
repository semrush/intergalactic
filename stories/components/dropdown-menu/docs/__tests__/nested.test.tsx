import { expect, userEvent, within } from '@storybook/test';

export async function NestedTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Explore nested menus");
  if (!(trigger)) {
    throw new Error('Trigger not found');
  }
 await userEvent.click(trigger);
 await new Promise((resolve) => setTimeout(resolve, 1000));

const MenuItem4 = within(document.body).queryByText("Item 4");
if (!(MenuItem4)) {
 throw new Error('Item 4 not found');
 }
await userEvent.click(MenuItem4);
await new Promise((resolve) => setTimeout(resolve, 1000));

const MenuItem41 = within(document.body).queryByText("Item 4.1");
if (!(MenuItem41)) {
 throw new Error('Item 4.1 not found');
 }
await userEvent.click(MenuItem41);
await new Promise((resolve) => setTimeout(resolve, 1000));

const MenuItem411 = within(document.body).queryByText("Item 4.1");
if (!(MenuItem411)) {
 throw new Error('Item 4.1 not found');
 }
await userEvent.click(MenuItem411);

}
