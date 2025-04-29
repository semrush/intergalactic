import { expect, userEvent, within } from '@storybook/test';

export async function CustomDateRangesTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelectorAll('[data-ui-name="DateRangePicker.Trigger"]');
  if (triggers.length < 2) {
    throw new Error(`Expected at least 2 triggers, but found ${triggers.length}`);
  }

  const firstTrigger = triggers[2] as HTMLElement;
  await userEvent.click(firstTrigger);

}
