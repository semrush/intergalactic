import { expect, userEvent, within } from 'storybook/test';

export async function StickyGroupTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = canvasElement.querySelector('[data-ui-name="DropdownMenu.Trigger"]');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);
}
