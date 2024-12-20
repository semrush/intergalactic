import { expect, userEvent, within } from '@storybook/test';

export async function InputValidationTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const combobox = within(document.body).getByRole('combobox');
  if (!combobox) throw new Error('Hint not found');
  await userEvent.click(combobox);
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
