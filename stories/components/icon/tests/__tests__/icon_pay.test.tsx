import { expect, userEvent, within } from 'storybook/test';

export async function iconPay({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const expectedNonInteractiveAttributes = [
    { 'width': '21', 'height': '16', 'viewBox': '0 0 21 16', 'aria-hidden': 'true' },
    { 'width': '32', 'height': '24', 'viewBox': '0 0 32 24', 'aria-hidden': 'true' },
  ];
  const svgNonInteractive = canvasElement.querySelectorAll('svg[aria-hidden="true"]');
  expect(svgNonInteractive.length).toBeGreaterThan(0);
  for (let i = 0; i < svgNonInteractive.length; i++) {
    const svg = svgNonInteractive[i];
    const attrs = expectedNonInteractiveAttributes[i];

    expect(svg).toHaveAttribute('aria-hidden', attrs['aria-hidden']);
    expect(svg).toHaveAttribute('width', attrs['width']);
    expect(svg).toHaveAttribute('height', attrs['height']);
    expect(svg).toHaveAttribute('viewBox', attrs['viewBox']);
  }
}
