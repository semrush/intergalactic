import { userEvent } from 'storybook/test';

export async function ModalInModalTest() {
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Enter}');
}
