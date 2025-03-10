import { expect, userEvent, within } from '@storybook/test';

export async function iconPlatform({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const svgInteractive = canvasElement.querySelectorAll('svg[focusable="true"]');
  for (let i = 0; i < svgInteractive.length; i++) {
    const svg = svgInteractive[i];
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('tabindex', '0');
  }
}
