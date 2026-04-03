import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function Link({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = await waitFor(async () => {
    const links = await within(document.body).findAllByRole('link');
    const first = links[0];
    if (!first) throw new Error('link not found');
    return first;
  });

  await userEvent.hover(await trigger);
}
