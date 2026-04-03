import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function Button({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = await waitFor(async () => {
    const button = await within(document.body).findByRole('button');
    if (!button) throw new Error('Button not found');
    return button;
  });

  await userEvent.click(await trigger);
}
