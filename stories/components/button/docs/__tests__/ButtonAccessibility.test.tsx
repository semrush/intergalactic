import { expect, userEvent, within } from 'storybook/test';

function resolveToken(property: 'color' | 'backgroundColor', token: string) {
  const probe = document.createElement('div');
  probe.style[property] = `var(${token})`;
  document.body.appendChild(probe);
  const value = window.getComputedStyle(probe)[property];
  probe.remove();
  return value;
}

export async function ButtonAccessibilityTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: 'Confirm action' });
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const hint = within(document.body).queryByText('Confirm action');
  if (!hint) throw new Error('Hint not found');
  expect(hint).toBeVisible();
  const hintStyles = window.getComputedStyle(hint);
  expect(hintStyles.padding).toBe('4px 8px');
  expect(hintStyles.fontSize).toBe('12px');
  expect(hint.textContent).not.toBeNull();
  expect(hintStyles.color).toBe(resolveToken('color', '--intergalactic-tooltip-text-invert'));
  expect(hintStyles.backgroundColor).toBe(
    resolveToken('backgroundColor', '--intergalactic-tooltip-bg-invert'),
  );

  await userEvent.unhover(button);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  expect(hint).not.toBeVisible();
}
