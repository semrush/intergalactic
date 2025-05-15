import { expect, userEvent, within } from '@storybook/test';

export async function UsageinDDTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByRole('button');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);
}
