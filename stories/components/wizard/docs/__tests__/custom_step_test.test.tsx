import { expect, userEvent, within } from '@storybook/test';

export async function CustomStepExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {
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

  // Verify panel content updates
  const tabPanel = canvas.getByRole('tabpanel', { name: /Schedule/i });
  expect(tabPanel).toBeVisible();
  expect(tabPanel).toHaveAttribute('aria-labelledby', thirdStep.id);

  // Navigate back to the second step
  const prevButtonOnLastStep = canvas.getByRole('button', { name: /Back to Location/i });
  await userEvent.click(prevButtonOnLastStep);

  expect(secondStep).toHaveAttribute('aria-selected', 'true');
  expect(thirdStep).toHaveAttribute('aria-selected', 'false');

  // Verify controls visibility on the second step
  const prevButtonOnSecondStep = canvas.getByRole('button', { name: /Back to Keywords/i });
  const nextButtonOnSecondStep = canvas.getByRole('button', { name: /Go to Schedule/i });
  expect(prevButtonOnSecondStep).toBeVisible();
  expect(nextButtonOnSecondStep).toBeVisible();
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
  const secondStepFocused = canvas.getByRole('tab', { name: /Location/i });
  expect(document.activeElement).toBe(secondStepFocused);

  await userEvent.keyboard('{Tab}');
  const prevButtonOnSecondStepFocus = canvas.getByRole('button', { name: /Back to Keywords/i });
  expect(document.activeElement).toBe(prevButtonOnSecondStepFocus);

  await userEvent.keyboard('{Tab}');
  const nextButtonOnSecondStepFocus = canvas.getByRole('button', { name: /Go to Schedule/i });
  expect(document.activeElement).toBe(nextButtonOnSecondStepFocus);

  // Navigate to the first step using keyboard and check focus order
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{ArrowUp}');
  const firstStepFocused = canvas.getByRole('tab', { name: /Keywords/i });
  expect(document.activeElement).toBe(firstStepFocused);

  await userEvent.keyboard('{Enter}');
  const firstInput = canvas.getByPlaceholderText('Keyword 1');
  expect(document.activeElement).toBe(firstInput);
  await userEvent.keyboard('{Tab}');
  const secondtInput = canvas.getByPlaceholderText('Keyword 2');
  expect(document.activeElement).toBe(secondtInput);
  await userEvent.keyboard('{Tab}');
  const nextButtonOnFirstStepFocus = canvas.getByRole('button', { name: /Go to Location/i });
  expect(document.activeElement).toBe(nextButtonOnFirstStepFocus);

  // Navigate to the last step using keyboard
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  const lastStepFocused = canvas.getByRole('tab', { name: /Schedule/i });
  expect(document.activeElement).toBe(lastStepFocused);

  await userEvent.keyboard('{Enter}');
  const prevButtonOnLastStepFocus = canvas.getByRole('button', { name: /Back to Location/i });
  expect(document.activeElement).toBe(prevButtonOnLastStepFocus);
}
