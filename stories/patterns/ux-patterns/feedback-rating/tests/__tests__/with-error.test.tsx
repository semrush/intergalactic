import { expect, userEvent, within } from '@storybook/test';

export async function WithErrorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{ArrowRight}');
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard('{Enter}');

  
}
