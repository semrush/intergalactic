import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Verify component added as wrapper', () => {
  test('Verofy attributes and Navigation between wrapped components by keyboard', async ({
    page,
  }) => {
    const standPath =
      'stories/components/neighbor-location/tests/examples/wraping-test-combination.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    // Access the first element of the group
    const firstgroup = page.locator('[data-ui-name="NeighborLocation"]').first();
    await expect(firstgroup).toHaveAttribute('role', 'group');
    const buttons = await firstgroup.locator('button').all();
    expect(buttons.length).toBe(3);

    // Check if the first button contains the word 'first' in its class
    const firstButtonClass = await buttons[0].getAttribute('class');
    expect(firstButtonClass).toContain('right');
    await page.keyboard.press('Tab');
    await expect(buttons[0]).toBeFocused();

    const secondButtonClass = await buttons[1].getAttribute('class');
    expect(secondButtonClass).toContain('both');
    await page.keyboard.press('Tab');
    await expect(buttons[1]).toBeFocused();

    const thirdButtonClass = await buttons[2].getAttribute('class');
    expect(thirdButtonClass).toContain('left');
    await page.keyboard.press('Tab');
    await expect(buttons[2]).toBeFocused();

    const secondgroup = page.locator('[data-ui-name="NeighborLocation"]').nth(1);
    await expect(secondgroup).toHaveAttribute('role', 'group');
  });
});
