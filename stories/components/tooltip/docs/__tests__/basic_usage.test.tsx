import { expect, userEvent, within } from 'storybook/test';

export async function BasicUsageTest({ canvasElement }: { canvasElement: HTMLElement }) {
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
}
