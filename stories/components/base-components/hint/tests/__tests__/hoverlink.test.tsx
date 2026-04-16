import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function Link(_: { canvasElement: HTMLElement }) {
  const trigger = await waitFor(async () => {
    const links = await within(document.body).findAllByRole('link');
    const first = links[0];
    if (!first) throw new Error('link not found');
    return first;
  });

  const box = trigger.getBoundingClientRect();
  await userEvent.pointer({
    target: trigger,
    coords: {
      clientX: Math.round(box.left + box.width / 6),
      clientY: Math.round(box.top + box.height / 2),
    },
  });
}
