import { expect, userEvent, within } from '@storybook/test';

export async function AdvancedFilteringControlTest({
  canvasElement,
}: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Select a fruit');
  if (!trigger) {
    throw new Error('Trirgger not found');
  }
  await userEvent.click(trigger);
}
