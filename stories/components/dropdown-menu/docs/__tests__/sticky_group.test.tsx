import { expect, userEvent, waitFor, within } from 'storybook/test';

export async function StickyGroupTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const body = within(document.body);

  const trigger = canvasElement.querySelector('[data-ui-name="DropdownMenu.Trigger"]');
  if (!trigger) {
    throw new Error('Trigger not found');
  }
  await userEvent.click(trigger);

  // The search input lives in the portal-rendered popper; wait for it, focus it, and
  // type a query that matches nothing (keyboard avoids a pointer click on the input).
  await waitFor(() => {
    expect(document.body.querySelector('input')).toBeTruthy();
  });
  const search = document.body.querySelector<HTMLInputElement>('input');
  search?.focus();
  await userEvent.keyboard('zzz');

  // DropdownMenu.StatusItem renders the "Nothing found" message
  await waitFor(() => {
    expect(body.getByText('Nothing found')).toBeInTheDocument();
  });
}
