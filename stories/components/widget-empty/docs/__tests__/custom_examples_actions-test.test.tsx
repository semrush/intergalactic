import { expect, within } from '@storybook/test';

export async function CustomExamplesActionsTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const widgetContainer = await canvas.findByRole('status');
  await expect(widgetContainer).toBeVisible();
  await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetEmpty');

  // Safely access the image element
  const iconImage = canvasElement.querySelector('img');

  if (iconImage) {
    await expect(iconImage).toBeVisible();
    await expect(iconImage).toHaveAttribute('alt', '');

    // Safely access the icon wrapper
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

  // Safely check the title element
  const title = await canvas.findByText((content) => content.includes('Set up your [Tool Name]'));
  await expect(title).toHaveAttribute('data-ui-name', 'WidgetEmpty.Title');

  const titleFontSize = window.getComputedStyle(title as HTMLElement).fontSize;
  await expect(titleFontSize).toBe('16px');

  // Safely check the description element
  const description = await canvas.findByText((content) =>
    content.includes('allows you to get daily updates on positions in'),
  );
  await expect(description).toHaveAttribute('data-ui-name', 'WidgetEmpty.Description');

  const descriptionFontSize = window.getComputedStyle(description as HTMLElement).fontSize;
  await expect(descriptionFontSize).toBe('14px');

  const descriptionMarginTop = window
    .getComputedStyle(description as HTMLElement)
    .getPropertyValue('margin-top');
  await expect(descriptionMarginTop).toBe('4px');

  // Safely check the button and its container
  const button = await canvas.findByRole('button', { name: /Set up \[Tool Name\]/i });
  const boxElement = button.closest('[data-ui-name="Box"]') as HTMLElement | null;
  await expect(boxElement).not.toBeNull();

  if (boxElement) {
    await expect(boxElement).toBeVisible();

    const boxStyles = window.getComputedStyle(boxElement);
    const marginTop = boxStyles.getPropertyValue('margin-top');
    await expect(marginTop).toBe('16px');
  }
}
