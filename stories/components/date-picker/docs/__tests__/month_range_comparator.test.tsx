import { expect, userEvent, within } from '@storybook/test';

export async function MonthRangeComparatorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelector('[data-ui-name="MonthDateRangeComparator.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggers);

}
