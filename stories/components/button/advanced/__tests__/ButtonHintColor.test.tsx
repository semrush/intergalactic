import { expect, userEvent, within } from '@storybook/test';

export async function ButtonHintColorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button1 = canvas.getByRole('button', { name: 'Button secondary Addon' });
  await userEvent.hover(button1);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles = window.getComputedStyle(button1);
  expect(buttonStyles.backgroundColor).toBe('rgba(138, 142, 155, 0.1)');

  const button2 = canvas.getByRole('button', { name: 'Hint Button secondary Addon' });
  await userEvent.hover(button2);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles2 = window.getComputedStyle(button2);
  expect(buttonStyles2.backgroundColor).toBe('rgba(138, 142, 155, 0.1)');

  const button3 = canvas.getByRole('button', { name: 'Button primary Addon' });
  await userEvent.hover(button3);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles3 = window.getComputedStyle(button3);
  expect(buttonStyles3.backgroundColor).toBe('rgb(0, 143, 248)');

  const button4 = canvas.getByRole('button', { name: 'Hint Button primary Addon' });
  await userEvent.hover(button4);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles4 = window.getComputedStyle(button4);
  expect(buttonStyles4.backgroundColor).toBe('rgb(0, 143, 248)');

  const button5 = canvas.getByRole('button', { name: 'Button tertiary Addon' });
  await userEvent.hover(button5);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles5 = window.getComputedStyle(button5);
  expect(buttonStyles5.backgroundColor).toBe('rgba(0, 143, 248, 0)');

  const button6 = canvas.getByRole('button', { name: 'Hint Button tertiary Addon' });
  await userEvent.hover(button6);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const buttonStyles6 = window.getComputedStyle(button6);
  expect(buttonStyles6.backgroundColor).toBe('rgba(0, 143, 248, 0)');

}
