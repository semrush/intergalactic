import { expect, userEvent, within } from '@storybook/test';

export async function DateRangeComparatorTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const triggers = canvasElement.querySelector('[data-ui-name="DateRangeComparator.Trigger"]');
  if (!triggers) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggers);

  const triggersMonth = canvasElement.querySelector('[data-ui-name="MonthDateRangeComparator.Trigger"]');
  if (!triggersMonth) {
    throw new Error(`Expected at least 2 triggers`);
  }

  await userEvent.click(triggersMonth);

}
