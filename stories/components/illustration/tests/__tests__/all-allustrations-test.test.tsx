import { expect, within } from '@storybook/test';

export async function CheckButtonsIllustrations({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const lists = await canvas.getAllByRole('list');
  expect(lists.length).toBeGreaterThan(0);

  for (const ul of lists) {
    expect(ul).toBeVisible();

    const buttons = within(ul).getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      expect(button).toHaveAttribute('aria-expanded', 'false');

      const svg = button.querySelector('svg');
      expect(svg).not.toBeNull(); 

      if (svg) {
        expect(svg).toBeVisible();
        expect(svg).toHaveAttribute('aria-hidden', 'true');

        const dataId = button.getAttribute('data-id');
        console.log(`Button data-id="${dataId}"`);

        const uiName = svg.getAttribute('data-ui-name');
        console.log(`SVG data-ui-name: ${uiName}`);
      }
    }
  }
}
