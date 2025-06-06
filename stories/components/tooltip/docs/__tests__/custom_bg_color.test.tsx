import { expect, userEvent, within } from '@storybook/test';

export async function CustomBgColorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
}
