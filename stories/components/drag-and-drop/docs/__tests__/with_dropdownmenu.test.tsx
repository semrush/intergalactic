import { expect, userEvent, within } from '@storybook/test';

export async function WithDropdownMenuTest({ canvasElement }: { canvasElement: HTMLElement }) {

  const canvas = within(canvasElement);

  const manageColumnsButton = await canvas.findByRole('button', {
    name: /Manage columns/i,
  });

  await expect(manageColumnsButton).toBeVisible();

  await expect(manageColumnsButton).toHaveAttribute('aria-haspopup', 'dialog');

  await expect(manageColumnsButton).toHaveAttribute('aria-expanded', 'false');

  await expect(manageColumnsButton).toHaveAttribute('id', 'dropdown-menu-basic');
  
  const buttonText = await canvas.findByText(/Manage columns/i);
  await expect(buttonText).toBeVisible();

  const counter = await canvas.findByText('2/5');
  await expect(counter).toBeVisible();

  const computedStyle = window.getComputedStyle(manageColumnsButton);
  await expect(computedStyle.marginTop).toBe('8px');

  await userEvent.click(buttonText);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await expect(manageColumnsButton).toHaveAttribute('aria-controls', 'igc-ui-kit-r0-popper');
  await expect(manageColumnsButton).toHaveAttribute('aria-expanded', 'true');
 
}
