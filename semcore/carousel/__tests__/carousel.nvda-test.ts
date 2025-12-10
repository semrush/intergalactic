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

    expect(await nvda.itemText()).toContain('Beauty of Nature');
    expect(await nvda.itemText()).toContain('carousel');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Beauty of Nature');
    expect(await nvda.itemText()).toContain('group');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Open in fullscreen');
    expect(await nvda.itemText()).toContain('A cyclist performing stunts in the forest');
    expect(await nvda.itemText()).toContain('button');
    expect(await nvda.itemText()).toContain('current item');

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
  });
});
