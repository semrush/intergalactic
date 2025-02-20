import { expect, userEvent, within } from '@storybook/test';

export async function iconSize({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const svgInteractive = canvasElement.querySelectorAll('svg[focusable="true"]');
  expect(svgInteractive.length).toBeGreaterThan(0);

  const expectedAttributes = [
    {   width: '16', height: '16', viewBox: '0 0 16 16', focusable: 'true', 'tabindex': '0' },
    {   width: '24', height: '24', viewBox: '0 0 24 24', focusable: 'true', 'tabindex': '0' },
   ];

  for (let i = 0; i < svgInteractive.length; i++) {
    const svg = svgInteractive[i];
    const attrs = expectedAttributes[i];

    expect(svg).toHaveAttribute('focusable', attrs['focusable']);
    expect(svg).toHaveAttribute('width', attrs['width']);
    expect(svg).toHaveAttribute('height', attrs['height']);
    expect(svg).toHaveAttribute('viewBox', attrs['viewBox']);
    expect(svg).toHaveAttribute('tabindex', attrs['tabindex']);
  }


  const expectedNonInteractiveAttributes = [
    {  width: '16', height: '16', viewBox: '0 0 16 16', 'aria-hidden': 'true','tabindex': '-1' },
    {  width: '24', height: '24', viewBox: '0 0 24 24',  'aria-hidden': 'true','tabindex': '-1' },
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
    expect(svg).toHaveAttribute('tabindex', attrs['tabindex']);
  }

}
