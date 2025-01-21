import { expect, userEvent, within } from '@storybook/test';

export async function BasicExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement);

    //Interactions by the mouse
    const trigger = within(document.body).queryByText("Open modal");

    if (!(trigger)) {
        throw new Error('Section 1 not found');
    }

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const wizard = canvas.getByRole('dialog', { name: /Site Audit Settings/i });
    expect(wizard).toBeVisible();
    expect(wizard).toHaveAttribute('aria-modal', 'true');

    const closeButton = canvas.getByRole('button', { name: /Close/i });
    expect(closeButton).toBeVisible();

    // Get all tabs (steps in the wizard)
    const steps = canvas.getAllByRole('tab');

    // Extract specific steps by their index
    const firstStep = steps[0];
    const secondStep = steps[1];
    const thirdStep = steps[2];

    // First step is selected by default
    expect(firstStep).toHaveAttribute('aria-selected', 'true');
    expect(secondStep).toHaveAttribute('aria-selected', 'false');
    expect(thirdStep).toHaveAttribute('aria-selected', 'false');

    //click last step
    await userEvent.click(thirdStep);
    expect(firstStep).toHaveAttribute('aria-selected', 'false');
    expect(thirdStep).toHaveAttribute('aria-selected', 'true');

    // Ensure the panel content updates accordingly
    const tabPanel = canvas.getByRole('tabpanel', { name: /Schedule/i });
    expect(tabPanel).toBeVisible();
    expect(tabPanel).toHaveAttribute('aria-labelledby', thirdStep.id);

    // Navigate to the prev step (second)
    const prevButtononLaststep = canvas.getByRole('button', { name: /Back to Keywords/i });
    await userEvent.click(prevButtononLaststep);

    // Verify the second step is now selected
    expect(secondStep).toHaveAttribute('aria-selected', 'true');
    expect(thirdStep).toHaveAttribute('aria-selected', 'false');

    const prevButtononSecondstep = canvas.getByRole('button', { name: /Back to Location/i });
    const nextButtononSecondstep = canvas.getByRole('button', { name: /Go to Schedule/i });
    expect(prevButtononSecondstep).toBeVisible();
    expect(nextButtononSecondstep).toBeVisible();
    expect(tabPanel).toHaveAttribute('aria-labelledby', secondStep.id);

    //Click on Close
    await userEvent.click(closeButton);
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(wizard).not.toBeVisible();

    // Interactions by the keyboards
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(firstStep).toHaveAttribute('aria-selected', 'false');
    expect(secondStep).toHaveAttribute('aria-selected', 'true');
    //expect(document.activeElement).toBe(closeButton);

    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toStrictEqual(secondStep);

    await userEvent.keyboard('{Tab}');

}
