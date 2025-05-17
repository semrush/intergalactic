import { expect, userEvent, within } from '@storybook/test';

export async function CustomStepperExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Helper function to wait briefly if required
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==== Section 1: Mouse Interactions ====

  // Open the modal using a button
  const trigger = within(document.body).queryByText('Open wizard');
  if (!trigger) {
    throw new Error('Trigger button "Open modal" not found');
  }

  await userEvent.click(trigger);
  await wait(500); // Wait for modal animation/updates

  // Verify modal visibility and attributes
  const wizard = canvas.getByRole('dialog', { name: /Site Audit Settings/i });
  expect(wizard).toBeVisible();
  expect(wizard).toHaveAttribute('aria-modal', 'true');

  const closeButton = canvas.getByRole('button', { name: /Close/i });
  expect(closeButton).toBeVisible();

  // Get all tabs (wizard steps)
  const steps = canvas.getAllByRole('tab');
  const [firstStep, secondStep, thirdStep] = steps;

  // Verify the first step is selected by default
  expect(firstStep).toHaveAttribute('aria-selected', 'true');
  expect(secondStep).toHaveAttribute('aria-selected', 'false');
  expect(thirdStep).toHaveAttribute('aria-selected', 'false');

  // Navigate to the last step and verify selection
  await userEvent.click(thirdStep);
  expect(firstStep).toHaveAttribute('aria-selected', 'false');
  expect(thirdStep).toHaveAttribute('aria-selected', 'true');

  // Click on checkboxes and verofu selection in steps
  const group = canvas.getByRole('group');
  const radios = within(group).getAllByRole('radio');
  await userEvent.click(radios[0]);
  expect(thirdStep).toHaveTextContent(/Manually/);
  await userEvent.click(radios[2]);
  expect(thirdStep).toHaveTextContent(/From CSV/);

  // Navigate back to the second step and check title of the step not changed
  const prevButtonOnLastStep = canvas.getByRole('button', { name: 'Back to' });
  await userEvent.click(prevButtonOnLastStep);

  expect(secondStep).toHaveAttribute('aria-selected', 'true');
  expect(thirdStep).toHaveAttribute('aria-selected', 'false');
  expect(thirdStep).toHaveTextContent(/From CSV/);
  const tabPanel = canvas.getByRole('tabpanel');
  expect(tabPanel).toHaveAttribute('aria-labelledby', secondStep.id);

  // Close the modal
  await userEvent.click(closeButton);
  await wait(500);
  expect(wizard).not.toBeVisible();

  // ==== Section 2: Keyboard Interactions ====

  // Reopen the modal using keyboard navigation
  await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Enter}');
  await wait(100); // Wait for modal to reopen

  expect(firstStep).toHaveAttribute('aria-selected', 'false');
  expect(secondStep).toHaveAttribute('aria-selected', 'true');

  // Verify navigation between steps using keyboard
  await userEvent.keyboard('{Tab}');
  const secondStepFocused = canvas.getByRole('tab', { name: /Keywords/i });
  expect(document.activeElement).toBe(secondStepFocused);

  await userEvent.keyboard('{Tab}');
  const prevButtonOnSecondStepFocus = canvas.getByRole('button', { name: 'Back to' });
  expect(document.activeElement).toBe(prevButtonOnSecondStepFocus);

  await userEvent.keyboard('{Tab}');
  const nextButtonOnSecondStepFocus = canvas.getByRole('button', { name: 'Go to' });
  expect(document.activeElement).toBe(nextButtonOnSecondStepFocus);

  // Navigate to the first step using keyboard and check focus order
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{ArrowUp}');
  const firstStepFocused = canvas.getByRole('tab', { name: /Personal/i });
  expect(document.activeElement).toBe(firstStepFocused);

  await userEvent.keyboard('{Enter}');
  const firstInput = document.querySelector('[autocomplete="name"]');
  expect(document.activeElement).toBe(firstInput);
  await userEvent.keyboard('{Tab}');
  const secondtInput = document.querySelector('[autocomplete="email"]');
  expect(document.activeElement).toBe(secondtInput);
  await userEvent.keyboard('{Tab}');
  const nextButtonOnFirstStepFocus = canvas.getByRole('button', { name: 'Go to' });
  expect(document.activeElement).toBe(nextButtonOnFirstStepFocus);

  // Navigate to the last step using keyboard and check Focus on 1st checkbox
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  const lastStepFocused = canvas.getByRole('tab', { name: /Import source/i });
  expect(document.activeElement).toBe(lastStepFocused);

  await userEvent.keyboard('{Enter}');
  const firstRadioChecked = canvas.getByRole('radio', { name: /Manually/i });
  expect(document.activeElement).toBe(firstRadioChecked);
}
