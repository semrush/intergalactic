import { expect, within } from '@storybook/test';

export async function NoDataExamplesTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  // Ensure the status elements are available
  const statusElements = await canvas.findAllByRole('status');
  await expect(statusElements.length).toBeGreaterThan(0);

  const widgetContainer = statusElements[0];
  await expect(widgetContainer).toBeVisible();
  await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetNoData');

  // Check the icon image exists and is visible
  const iconImage = canvasElement.querySelector('img');

  if (iconImage) {
    await expect(iconImage).toBeVisible();
    await expect(iconImage).toHaveAttribute('alt', '');

    // Safely check the icon wrapper
    const iconWrapper = iconImage.closest('div.___SImage_1jkvg_gg_') as HTMLElement | null;

    if (iconWrapper) {
      await expect(iconWrapper).toBeVisible();

      const computedStyle = window.getComputedStyle(iconWrapper);
      const marginBottom = computedStyle.getPropertyValue('margin-bottom');
      await expect(marginBottom).toBe('12px');

      const iconWidth = `${iconWrapper.offsetWidth}px`;
      const iconHeight = `${iconWrapper.offsetHeight}px`;
      await expect(iconWidth).toBe('80px');
      await expect(iconHeight).toBe('80px');
    }
  }

  // Verify the title text
  const titles = await canvas.findAllByText(/Nothing found/i);
  await expect(titles.length).toBeGreaterThan(0);

  const title = titles[0] as HTMLElement;
  const titleFontSize = window.getComputedStyle(title).fontSize;
  await expect(titleFontSize).toBe('16px');

  // Verify the description text
  const descriptions = await canvas.findAllByText(/Try changing your filters./i);
  await expect(descriptions.length).toBeGreaterThan(0);

  const description = descriptions[0] as HTMLElement;
  await expect(description).toHaveAttribute('data-ui-name', 'WidgetEmpty.Description');

  const descriptionFontSize = window.getComputedStyle(description).fontSize;
  await expect(descriptionFontSize).toBe('14px');

  const descriptionMarginTop = window.getComputedStyle(description).getPropertyValue('margin-top');
  await expect(descriptionMarginTop).toBe('4px');

  // Check the Clear Filters button
  const reloadButtons = await within(canvasElement).findAllByRole('button', {
    name: /Clear filters/i,
  });
  await expect(reloadButtons.length).toBeGreaterThan(0);

  const button = reloadButtons[0];
  const boxElement = button.closest('[data-ui-name="Box"]') as HTMLElement | null;

  if (boxElement) {
    await expect(boxElement).toBeVisible();

    const boxStyles = window.getComputedStyle(boxElement);
    const marginTop = boxStyles.getPropertyValue('margin-top');
    await expect(marginTop).toBe('16px');
  }
}
