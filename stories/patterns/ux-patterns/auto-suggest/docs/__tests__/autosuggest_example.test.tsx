import { expect, userEvent, within } from 'storybook/test';

export async function AutoSuggestTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // The example sets no `placeholder` (defaults to ''); inputs are associated with
  // their labels via htmlFor/id. Use the sync input for a deterministic assertion.
  const input = canvas.getByLabelText('SYNC Your pet breed');

  await userEvent.click(input);
  await userEvent.type(input, 'a');

  // Suggestions render in a portal on document.body, not inside canvasElement.
  // Typing "a" matches several breeds, so expect multiple options.
  const options = await within(document.body).findAllByRole('option', {}, { timeout: 3000 });
  expect(options.length).toBeGreaterThan(0);
}
