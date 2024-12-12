import { expect, userEvent, within } from '@storybook/test';

export async function BasicUsageTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = within(document.body).queryByText("Actions");
  if (!(button)) {
    throw new Error('Section 1 not found');
  }
 await userEvent.click(button);
 

}
