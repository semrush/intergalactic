import { expect, userEvent, within } from '@storybook/test';

export async function ButtonAccessibilityTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: 'Confirm action' });
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const hint = within(document.body).queryByText('Confirm action');
  if (!hint) throw new Error('Hint not found');
  expect(hint).toBeVisible();
  const hintStyles = window.getComputedStyle(hint);
  expect(hintStyles.padding).toBe('12px');
  expect(hintStyles.fontSize).toBe('14px');
  expect(hint.textContent).not.toBeNull();
  expect(hintStyles.color).toBe('rgb(25, 27, 35)');
  expect(hintStyles.backgroundColor).toBe('rgb(255, 255, 255)');

  await userEvent.unhover(button);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  expect(hint).not.toBeVisible();
}
