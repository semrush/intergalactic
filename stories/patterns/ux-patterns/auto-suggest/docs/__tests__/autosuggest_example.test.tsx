import { expect, userEvent, within } from '@storybook/test';

export async function AutoSuggestTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const inputTrigger = within(document.body).getByPlaceholderText('Start typing for options');

  if (!inputTrigger) {
    throw new Error('Section 1 not found');
  }
  await userEvent.click(inputTrigger);
  await userEvent.type(inputTrigger, 'a');
}
