import { expect, within } from '@storybook/test';

export async function ErrorExamplesTest({ canvasElement }: { canvasElement: HTMLElement }) {

    const canvas = within(canvasElement);

    const statusElements = await canvas.findAllByRole('status');
    const widgetContainer = statusElements[0];

    await expect(widgetContainer).toBeVisible();
    await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetError');

    const iconImage = await canvasElement.querySelector('img');
    await expect(iconImage).not.toBeNull();
    await expect(iconImage).toBeVisible();

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

    const titles = await canvas.findAllByText(/Something went wrong/i);

    // ✅ Проверить первый элемент
    const title = titles[0];
    const titleFontSize = window.getComputedStyle(title).fontSize;
    await expect(titleFontSize).toBe('16px');

    const description = await canvas.findByText((content, element) =>
        content.includes('If the problem persists, contact us at')
    );
    await expect(description).toHaveAttribute(
        'data-ui-name',
        'WidgetEmpty.Description'
    );
    const descriptionFontSize = window.getComputedStyle(description).fontSize;
    await expect(descriptionFontSize).toBe('14px');
    const descriptionMarginTop = window.getComputedStyle(description).getPropertyValue('margin-top');
    await expect(descriptionMarginTop).toBe('4px');

    const reloadButtons = await within(canvasElement).findAllByRole('button', {
        name: /Reload page/i,
    });

    const button = reloadButtons[0];
    const boxElement = await button.closest('[data-ui-name="Box"]');
    await expect(boxElement).not.toBeNull();
    await expect(boxElement).toBeVisible();
    const boxStyles = window.getComputedStyle(boxElement);
    const marginTop = boxStyles.getPropertyValue('margin-top');
    await expect(marginTop).toBe('16px');

}
