import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function Link({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = await waitFor(async () => {
    const button = await within(document.body).findByRole('link');
    if (!button) throw new Error('Button not found');
    return button;
  });

  await userEvent.hover(await trigger);
}
