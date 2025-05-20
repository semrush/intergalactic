import { expect, userEvent, within, waitFor } from '@storybook/test';

const expectFocus = (element: HTMLElement, focused: boolean) => {
  if (focused) {
    expect(document.activeElement).toBe(element);
  } else {
    expect(document.activeElement).not.toBe(element);
  }
};

const clearForm = async (email: HTMLElement, password: HTMLElement) => {
  await userEvent.clear(email);
  expect(email).toHaveValue('');

  await userEvent.clear(password);
  expect(password).toHaveValue('');
};

const expectTooltipVisibility = async (
  canvas: ReturnType<typeof within>,
  text: string,
  visible: boolean,
) => {
  const tooltip = visible ? await canvas.getByText(text) : canvas.queryByText(text);
  if (visible) {
    expect(tooltip).toBeVisible();
  } else {
    expect(tooltip).toBeNull();
  }
};

//Case1: Both fields are empty, user clicks on Log in By the mouse
const EmptyFieldsByMouse = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  // Click on Log in
  await userEvent.click(button);
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Check  Focus, Attributes and Tooltip visibility
  expectFocus(email, true);
  expectFocus(password, false);
  expect(email).toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Email is required', true);
    },
    { timeout: 500 }, 
  );

  // User clicks on Password
  await userEvent.click(password);
  // Check  Focus and Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false); 
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password is required', true);
    },
    { timeout: 500 }, 
  );

};

//Case2: Both fields are empty, user clicks on Log in By the keyboard
const EmptyFieldsByKeyboard = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  // Navigate and press Enter
  for (let i = 0; i < 5; i++) {
    await userEvent.tab();
  }
  await userEvent.keyboard('{Enter}');

  // Check  Focus, Attributes and Tooltip visibility
  expectFocus(email, true);
  expectFocus(password, false);
  expect(email).toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Email is required', true);
    },
    { timeout: 500 }, 
  );  
    

  // Tab to Password
  await userEvent.tab();
  // Check  Focus and Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false);
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password is required', true);
    },
    { timeout: 500 }, 
  );
    };

//Case3: User enters wrong email and fixes the email error by mouse interaction
const WrongEmailMouse = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  // Enter wrong email and click on Log in
  await userEvent.type(email, 'test@example');
  await userEvent.click(button);

  // Check Focus, Attributes and Tooltip visibility
  expectFocus(email, true);
  expectFocus(password, false);
  expect(email).toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');

  // FocusPassword
  await userEvent.click(password);
  // Check Focus and Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false);
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password is required', true);
    },
    { timeout: 500 }, 
  );
  // Fix email
  await userEvent.type(email, '.com');
  // Check Attributes and Tooltip visibility
  expect(email).not.toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');
  
  // Click Log in
  await userEvent.click(button);
  // Check Focus and Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false);
  await expectTooltipVisibility(canvas, 'Password is required', true);
};

//Case4: User enters wrong password and fixes the password error by mouse interaction
const WrongPasswordMouse = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  // Enter correct email, click on Log in
  await clearForm(email, password);
  await userEvent.type(email, 'test@example.com');
  await userEvent.click(button);

  // Check Focus, Attributes and Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false);
  expect(email).not.toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password is required', true);
    },
    { timeout: 500 }, 
  );
  // Enter wrong password and click Log in
  await userEvent.type(password, 'test');
  await userEvent.click(button);
  // Check Tooltip visibility
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password must have at least 8 characters', true);
    },
    { timeout: 500 }, 
  );

  // Fix the password
  await userEvent.type(password, 'test');
  // Check Attributes and Tooltip visibility
  expect(email).not.toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).not.toHaveAttribute('aria-describedby', 'form-password-error');
 
};

//Case5: User enters wrong email and fixes the email error by keyboard interaction
const WrongEmailKeyboard = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  await clearForm(email, password);
  //Enter wrong email, focus and click on Log in
  await userEvent.type(email, 'test@test');
  for (let i = 0; i < 2; i++) {
    await userEvent.tab();
  }
  await userEvent.keyboard('{Enter}');
  // Check Focus, Attributes and Tooltip visibility
  expectFocus(email, true);
  expectFocus(password, false);
  expect(email).toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');
 
  // Fix the email
  await userEvent.type(email, '.com');
  // Check Tooltip visibility
  expect(email).not.toHaveAttribute('aria-describedby', 'form-email-error');
  expect(password).toHaveAttribute('aria-describedby', 'form-password-error');

  // Focus password and press on Enter
  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  // Check Focusand Tooltip visibility
  expectFocus(password, true);
  expectFocus(email, false);

};

//Case6: User enters wrong password and fixes the password error by mouse keyboard
const WrongPasswordKeyboard = async (
  canvas: ReturnType<typeof within>,
  button: any,
  email: any,
  password: any,
) => {
  await clearForm(email, password);
  //Enter correct email, wrong password, focus Log in and press it
  await userEvent.type(email, 'test@test.com');
  await userEvent.type(password, 'test');
  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  // Check Focus and Tooltip visibility
  expectFocus(email, false);
  expectFocus(password, true);
  await waitFor(
    async () => {
      await expectTooltipVisibility(canvas, 'Password must have at least 8 characters', true);
    },
    { timeout: 500 }, 
  );
  //Fix password
  await userEvent.type(password, 'test');
  expect(password).not.toHaveAttribute('aria-describedby', 'form-password-error');
};

export async function DefaultLogInFormTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const buttonLogIn = canvas.getByRole('button', { name: 'Log in' });
  const emailInput = canvas.getByRole('textbox', { name: 'Email' });
  const passwordInput = canvas.getByLabelText('Password');
  await EmptyFieldsByMouse(canvas, buttonLogIn, emailInput, passwordInput);
  await EmptyFieldsByKeyboard(canvas, buttonLogIn, emailInput, passwordInput);
  await WrongEmailMouse(canvas, buttonLogIn, emailInput, passwordInput);
  await WrongPasswordMouse(canvas, buttonLogIn, emailInput, passwordInput);
  await WrongEmailKeyboard(canvas, buttonLogIn, emailInput, passwordInput);
  await WrongPasswordKeyboard(canvas, buttonLogIn, emailInput, passwordInput);
}
