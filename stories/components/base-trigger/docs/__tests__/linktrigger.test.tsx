import { expect, userEvent, within } from '@storybook/test';

export async function LinkTriggerTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const linkTrigger1 = within(document.body).queryByText('Select option');
  const linkTrigger2 = within(document.body).queryByText('Select period');
  if (!linkTrigger1 || !linkTrigger2) {
    throw new Error('Section 1 not found');
  }
  await userEvent.click(linkTrigger1);
  //await userEvent.click(linkTrigger2);
}
