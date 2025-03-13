import { expect, userEvent, within, waitFor } from '@storybook/test';

export async function ProjectSelectorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const trigger = await waitFor(async () => {
    const button = await within(document.body).findByRole('button');
    if (!button) throw new Error('Button not found');
    return button;
  });

  await userEvent.click(await trigger);

  const dropdown = await waitFor(() => {
    const element = document.querySelector('[data-ui-name="DropdownMenu.Popper"]');
    if (!element) throw new Error('Dropdown not found');
    return element;
  });

  expect(dropdown).toHaveAttribute('role', 'dialog');
  expect(dropdown).toHaveAttribute('tabindex', '-1');
  await new Promise((resolve) => setTimeout(resolve, 50));

  const input = await waitFor(() => {
    const element = dropdown.querySelector('[data-ui-name="Input.Value"]');
    if (!element) throw new Error('Input not found');
    return element as HTMLInputElement;
  });

  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('aria-invalid', 'false');

  input.style.pointerEvents = 'auto';

  await userEvent.click(input);
  expect(input).toHaveFocus();

  const element33 = await canvas.findByRole('menuitemradio', { name: /project 33/i });

  expect(element33).toHaveAttribute('aria-expanded', 'true');
  expect(element33).toHaveAttribute('aria-checked', 'true');
  expect(element33).toHaveAttribute('tabindex', '0');

  const element32 = await canvas.findByRole('menuitemradio', { name: /project 32/i });

  expect(element32).toHaveAttribute('aria-expanded', 'true');
  expect(element32).toHaveAttribute('aria-checked', 'false');
  expect(element32).toHaveAttribute('tabindex', '-1');

  const actionsMenu = element33.nextElementSibling;

  if (!actionsMenu || actionsMenu.getAttribute('data-ui-name') !== 'DropdownMenu.Actions') {
    console.error('Actions menu not found!');
    return;
  }

  const actionsMenuAsHTMLElement = actionsMenu as HTMLElement;

  const firstButton = within(actionsMenuAsHTMLElement).getByRole('menuitem', { name: 'Settings' });
  expect(firstButton).toHaveAttribute('aria-label', 'Settings');
  expect(firstButton).toHaveAttribute('tabindex', '-1');
  expect(firstButton).toHaveAttribute('role', 'menuitem');

  const secondButton = within(actionsMenuAsHTMLElement).getByRole('menuitem', { name: /pin/i });
  expect(secondButton).toHaveAttribute('aria-label', 'Pin');
  expect(secondButton).toHaveAttribute('tabindex', '-1');
  expect(secondButton).toHaveAttribute('role', 'menuitem');

  const elements39 = await canvas.findAllByText(/project 39/i);

  if (elements39.length > 0) {
    const firstElement39 = elements39[0];

    firstElement39.scrollIntoView({ behavior: 'smooth', block: 'center' });

    expect(firstElement39).toBeInTheDocument();
  } else {
    console.error('Element "project 39" not found!');
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
  elements39[0].style.pointerEvents = 'auto';
}
