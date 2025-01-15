import { expect, within } from '@storybook/test';

export async function CustomExampleTest({ canvasElement }: { canvasElement: HTMLElement }) {

  const canvas = within(canvasElement);

  const statusElements = await canvas.findAllByRole('status');

  const widgetContainer = statusElements.find((element) =>
    element.textContent?.toLowerCase().includes('good results')
  );
  await expect(widgetContainer).toBeVisible();
  await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetEmpty');

  const iconImage = await canvasElement.querySelector('img');
  await expect(iconImage).not.toBeNull();
  await expect(iconImage).toBeVisible();
  await expect(iconImage).toHaveAttribute(
    'src',
    'https://static.semrush.com/ui-kit/illustration/2.40.0/Good.svg'
  );

  await expect(iconImage).toHaveAttribute('alt', '');
  const iconWrapper = iconImage.closest('div.___SImage_1jkvg_gg_');
  await expect(iconWrapper).not.toBeNull();
  await expect(iconWrapper).toBeVisible();

  const computedStyle = window.getComputedStyle(iconWrapper);
  const marginBottom = computedStyle.getPropertyValue('margin-bottom');
  await expect(marginBottom).toBe('12px');
  const iconWidth = iconWrapper.offsetWidth + 'px';
  const iconHeight = iconWrapper.offsetHeight + 'px';
  await expect(iconWidth).toBe('80px');
  await expect(iconHeight).toBe('80px');

  const title = await canvas.findByText('Good results');
  await expect(title).toHaveAttribute('data-ui-name', 'WidgetEmpty.Title');
  const titleFontSize = window.getComputedStyle(title).fontSize;
  await expect(titleFontSize).toBe('16px');

  const description = await canvas.findByText('Wow! You are doing great!');
  await expect(description).toHaveAttribute(
    'data-ui-name',
    'WidgetEmpty.Description'
  );
  const descriptionFontSize = window.getComputedStyle(description).fontSize;
  await expect(descriptionFontSize).toBe('14px');
  const descriptionMarginTop = window.getComputedStyle(description).getPropertyValue('margin-top');
  await expect(descriptionMarginTop).toBe('4px');

}
