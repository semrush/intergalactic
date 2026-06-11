import { expect, userEvent, waitFor, within } from 'storybook/test';

export async function OnChangeInputSearchNothingFoundTest({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) {
  const canvas = within(canvasElement);
  const body = within(document.body);

  // Open the select menu
  await userEvent.click(canvas.getByRole('combobox'));

  // Options are rendered in a portal
  await waitFor(() => {
    expect(body.getAllByRole('option').length).toBeGreaterThan(0);
  });

  const search = document.body.querySelector<HTMLInputElement>('input');
  if (!search) {
    throw new Error('search input not found');
  }
  search.focus();
  await userEvent.keyboard('zzz');

  // Select.StatusItem renders the "Nothing found" message
  await waitFor(() => {
    expect(body.getByText('Nothing found')).toBeInTheDocument();
  });
}
