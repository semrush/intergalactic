import { expect, userEvent, within } from '@storybook/test';

export async function AdvancedFiltersTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Advanced filters");
  if (!(trigger)) {
    throw new Error('trigger not found');
  }
 await userEvent.click(trigger);

}
