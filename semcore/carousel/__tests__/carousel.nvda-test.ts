import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@carousel ${TAG.NVDA}`, () => {
  test('Users can interact with Carousel via NVDA', async ({ page, nvda }) => {
    await loadPage(
      page,
      'stories/components/carousel/docs/examples/carousel_with_default_indicators.tsx',
      'en',
    );

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, Beauty of Nature, carousel, current, button, Open in fullscreen A cyclist performing stunts in the forest');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, button, Open in fullscreen A vulture flies with its wings spread wide');

    await nvda.next();

    expect(await nvda.itemText()).toBe('clickable, button, Open in fullscreen A pug wrapped in a blanket sits on the road in the forest');

    await nvda.next();
    expect(await nvda.itemText()).toContain('clickable, button, Next slide');

    await nvda.next();
    expect(await nvda.itemText()).toContain('tab, selected, Slide 1');

    await nvda.next();
    expect(await nvda.itemText()).toContain('tab, Slide 2');

    await nvda.previous();
    await nvda.previous();
    await nvda.previous();

    await nvda.interact();
    await nvda.press('Enter');
    expect(await nvda.itemText()).toContain('Modal window, dialog');

    await nvda.next();
    expect(await nvda.itemText()).toContain('clickable, button, Previous slide');

    await nvda.next();
    expect(await nvda.itemText()).toBe('clickable, current, button, Open in fullscreen A cyclist performing stunts in the forest');

    await nvda.next();
    expect(await nvda.itemText()).toBe('clickable, button, Open in fullscreen A vulture flies with its wings spread wide');

    await nvda.next();
    expect(await nvda.itemText()).toBe('clickable, button, Close, button');
  });
});
