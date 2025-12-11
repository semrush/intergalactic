import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
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

    expect(await nvda.itemText()).toContain('clickable, Beauty of Nature, carousel, button, Previous slide');
    expect(await nvda.itemText()).toContain('carousel');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, current');
    expect(await nvda.itemText()).toContain('Open in fullscreen');
    expect(await nvda.itemText()).toContain('Open in fullscreen');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Open in fullscreen');
    expect(await nvda.itemText()).toContain('A vulture flies with its wings spread wide');
    expect(await nvda.itemText()).toContain('button');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Open in fullscreen');
    expect(await nvda.itemText()).toContain(
      'A pug wrapped in a blanket sits on the road in the forest',
    );
    expect(await nvda.itemText()).toContain('button');

    await nvda.next();
    expect(await nvda.itemText()).toContain('clickable, button, Next slide');
    await nvda.next();
    expect(await nvda.itemText()).toContain('tab, selected,Slide 1');

    await nvda.next();
    expect(await nvda.itemText()).toContain('tab, Slide 2');
  });
});
