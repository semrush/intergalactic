import { userEvent } from 'storybook/test';

export async function BasicUsageTest() {
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Tab}');
  await userEvent.keyboard('{Enter}');
}
