import { expect, userEvent, within } from '@storybook/test';

export async function SortingMultiselectOptionsTest({
  canvasElement,
}: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Select values');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);
}
