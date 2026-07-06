import { expect, userEvent, within } from 'storybook/test';

export async function AutoSuggestTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Shared across the sync and async stories, which have different labels
  // ("SYNC..." / "ASYNC..."). Each story renders a single AutoSuggest, so the
  // combobox input is unambiguous by role.
  const input = canvas.getByRole('combobox');

  await userEvent.click(input);
  await userEvent.type(input, 'a');

  // Suggestions render in a portal on document.body, not inside canvasElement.
  // Typing "a" matches several breeds, so expect multiple options.
  const options = await within(document.body).findAllByRole('option', {}, { timeout: 3000 });
  expect(options.length).toBeGreaterThan(0);
}
