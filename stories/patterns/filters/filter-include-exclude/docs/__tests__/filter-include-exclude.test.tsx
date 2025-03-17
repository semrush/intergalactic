import { expect, userEvent, within } from '@storybook/test';

export async function FiltersIncludeExcludeTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText('Include keywords');
  if (!trigger) {
    throw new Error('trigger not found');
  }
  await userEvent.click(trigger);
}
