import { expect, userEvent, within } from '@storybook/test';

export async function ConfirmationModalDialogTest({
  canvasElement,
}: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: 'Open confirmation modal' });
  await userEvent.click(button);

  //Check modal attributes
  const modal = await canvas.findByRole('dialog');
  await expect(modal).toHaveAttribute('aria-modal', 'true');

  const title = await canvas.findByText('Delete project?');
  await expect(title).toBeInTheDocument();

  //Check Marks attributes
  const markers = await canvas.findAllByText('•', { selector: 'span' });
  await expect(markers.length).toBeGreaterThan(0);
  for (const marker of markers) {
    await expect(marker).toHaveAttribute('aria-hidden', 'true');
    await expect(marker).not.toHaveAttribute('tabindex');
  }

  //Check Close attributes
  const closeButton = await canvas.findByRole('button', { name: /close/i });
  await expect(closeButton).toHaveAttribute('data-ui-name', 'Modal.Close');
  await expect(closeButton).toHaveAttribute('type', 'button');
  await expect(closeButton).toHaveAttribute('aria-label', 'Close');

  //Check Delete attributes
  const deleteButton = await canvas.findByRole('button', { name: /delete/i });
  await expect(deleteButton).toHaveAttribute('data-ui-name', 'Button');
  await expect(deleteButton).toHaveAttribute('type', 'submit');


  //Check Input attributes - without and with error
  const inputField = await canvas.findByPlaceholderText('Enter project name');
  await expect(inputField).toHaveAttribute('aria-invalid', 'false');
  await expect(inputField).not.toHaveAttribute('aria-errormessage');
  await userEvent.type(inputField, 'Project');
  await userEvent.click(deleteButton);
  await expect(inputField).toHaveAttribute('aria-invalid', 'true');
  await expect(inputField).toHaveAttribute('aria-describedby', 'form-project-error');
  await expect(document.activeElement).toBe(inputField);

  //Check Cancel attributes
  const cancelButton = await canvas.findByRole('button', { name: /cancel/i });
  await expect(cancelButton).toHaveAttribute('data-ui-name', 'Button');
  await expect(cancelButton).toHaveAttribute('type', 'button');
}
