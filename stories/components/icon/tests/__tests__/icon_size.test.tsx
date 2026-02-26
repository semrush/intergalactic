import { expect, userEvent, within } from 'storybook/test';

export async function iconSize({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const expectedNonInteractiveAttributes = [
    { 'width': '16', 'height': '16', 'viewBox': '0 0 16 16', 'aria-hidden': 'true' },
    { 'width': '24', 'height': '24', 'viewBox': '0 0 24 24', 'aria-hidden': 'true' },
  ];
  const svgs = Array.from(canvasElement.querySelectorAll('svg[aria-hidden="true"]'));

  expect(svgs.length).toBeGreaterThan(0);

  for (const svg of svgs) {
    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');

    if (width === '16') {
      await expect(svg).toHaveAttribute('height', '16');
      await expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    }

    if (width === '24') {
      await expect(svg).toHaveAttribute('height', '24');
      await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    }
  }
}
