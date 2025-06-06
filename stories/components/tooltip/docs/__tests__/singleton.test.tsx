import { expect, userEvent, within } from 'storybook/test';

export async function SingletonTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Enter}');
}
