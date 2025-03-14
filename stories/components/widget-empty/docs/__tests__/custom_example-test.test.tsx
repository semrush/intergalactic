import { expect, within } from '@storybook/test';

export async function CustomExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const statusElements = await canvas.findAllByRole('status');

  const widgetContainer = statusElements.find((element) =>
    element.textContent?.toLowerCase().includes('good results'),
  );
  await expect(widgetContainer).toBeVisible();
  await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetEmpty');

  const iconImage = canvasElement.querySelector('img');

  if (iconImage) {
    await expect(iconImage).toBeVisible();
    await expect(iconImage).toHaveAttribute('alt', '');

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

  const title = await canvas.findByText('Good results');
  await expect(title).toHaveAttribute('data-ui-name', 'WidgetEmpty.Title');
  const titleFontSize = window.getComputedStyle(title as HTMLElement).fontSize;
  await expect(titleFontSize).toBe('16px');

  const description = await canvas.findByText('Wow! You are doing great!');
  await expect(description).toHaveAttribute('data-ui-name', 'WidgetEmpty.Description');
  const descriptionFontSize = window.getComputedStyle(description as HTMLElement).fontSize;
  await expect(descriptionFontSize).toBe('14px');

  const descriptionMarginTop = window
    .getComputedStyle(description as HTMLElement)
    .getPropertyValue('margin-top');
  await expect(descriptionMarginTop).toBe('4px');
}
