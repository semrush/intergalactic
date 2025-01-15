import { expect, within } from '@storybook/test';

export async function ErrorExamplesTest({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement);

    // Ensure statusElements is not empty
    const statusElements = await canvas.findAllByRole('status');
    await expect(statusElements.length).toBeGreaterThan(0);

    const widgetContainer = statusElements[0];
    await expect(widgetContainer).toBeVisible();
    await expect(widgetContainer).toHaveAttribute('data-ui-name', 'WidgetError');

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
    const titles = await canvas.findAllByText(/Something went wrong/i);
    await expect(titles.length).toBeGreaterThan(0);

    const title = titles[0] as HTMLElement;
    const titleFontSize = window.getComputedStyle(title).fontSize;
    await expect(titleFontSize).toBe('16px');

    // Safely check the description element
    const description = await canvas.findByText((content) =>
        content.includes('If the problem persists, contact us at')
    );
    await expect(description).toHaveAttribute('data-ui-name', 'WidgetEmpty.Description');

    const descriptionFontSize = window.getComputedStyle(description as HTMLElement).fontSize;
    await expect(descriptionFontSize).toBe('14px');

    const descriptionMarginTop = window.getComputedStyle(description as HTMLElement).getPropertyValue('margin-top');
    await expect(descriptionMarginTop).toBe('4px');

    // Safely check the reload button
    const reloadButtons = await within(canvasElement).findAllByRole('button', {
        name: /Reload page/i,
    });
    await expect(reloadButtons.length).toBeGreaterThan(0);

    const button = reloadButtons[0];
    const boxElement = button.closest('[data-ui-name="Box"]') as HTMLElement | null;
    await expect(boxElement).not.toBeNull();

    if (boxElement) {
        await expect(boxElement).toBeVisible();

        const boxStyles = window.getComputedStyle(boxElement);
        const marginTop = boxStyles.getPropertyValue('margin-top');
        await expect(marginTop).toBe('16px');
    }
}
