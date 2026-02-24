import { expect, userEvent, within } from 'storybook/test';

export async function iconSize({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const expectedNonInteractiveAttributes = [
    { 'width': '16', 'height': '16', 'viewBox': '0 0 16 16', 'aria-hidden': 'true' },
    { 'width': '24', 'height': '24', 'viewBox': '0 0 24 24', 'aria-hidden': 'true' },
  ];
  const svgNonInteractive = canvasElement.querySelectorAll('svg[aria-hidden="true"]');
  expect(svgNonInteractive.length).toBeGreaterThan(0);
  for (let i = 0; i < svgNonInteractive.length; i++) {
    const svg = svgNonInteractive[i];
    const attrs = expectedNonInteractiveAttributes[i];

    expect(svg).toHaveAttribute('width', attrs['width']);
    expect(svg).toHaveAttribute('height', attrs['height']);
    expect(svg).toHaveAttribute('viewBox', attrs['viewBox']);
  }
}
