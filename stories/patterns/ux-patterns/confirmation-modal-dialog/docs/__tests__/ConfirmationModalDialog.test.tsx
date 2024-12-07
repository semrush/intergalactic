import { expect, userEvent, within } from '@storybook/test';

export async function ConfirmationModalDialogTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: 'Open modal' });
  await userEvent.click(button);
}
