import { expect, userEvent, within } from '@storybook/test';

export async function SerpFilterTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("SERP Features");
  if (!(trigger)) {
    throw new Error('trigger not found');
  }
 await userEvent.click(trigger);

 await new Promise((resolve) => setTimeout(resolve, 3000));
 const reload = within(document.body).queryByText("Reload");
  if (!(reload)) {
    throw new Error('Reload btn not found');
  }
 await userEvent.click(reload);
 await new Promise((resolve) => setTimeout(resolve, 1000));
}
