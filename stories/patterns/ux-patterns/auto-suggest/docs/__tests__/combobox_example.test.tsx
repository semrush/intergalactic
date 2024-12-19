import { expect, userEvent, within } from '@storybook/test';

export async function ComboboxTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const inputTrigger = within(document.body).getByPlaceholderText("Select option");
  
  if (!(inputTrigger)) {
    throw new Error('Section 1 not found');
  }
 await userEvent.click(inputTrigger);
}
