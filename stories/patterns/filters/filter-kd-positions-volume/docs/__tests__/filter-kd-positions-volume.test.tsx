import { expect, userEvent, within } from '@storybook/test';

export async function FilterKDPositionsVolumeTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = within(document.body).queryByText("Volume");
  if (!(trigger)) {
    throw new Error('trigger not found');
  }
 await userEvent.click(trigger);

}
