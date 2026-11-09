import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const examples = [
  { title: 'Basic', story: 'basic_example' },
  { title: 'Access to internal components', story: 'access_to_internal_components' },
  { title: 'Advanced', story: 'advanced_example' },
  { title: 'Disabling overlay', story: 'disabling_overlay', props: { closable: false } },
  { title: 'Placement', story: 'placement', props: { closable: false } },
  { title: 'Portals', story: 'portals', props: { closable: false } },
];

test.describe(`${TAG.ACCESSIBILITY} @side-panel`, () => {
  examples.forEach(({ title, story, props }) => {
    test(title, async ({ page }) => {
      await loadPage(page, `stories/components/side-panel/docs/examples/${story}.tsx`, 'en', props);

      await page.getByRole('button', { name: 'Show SidePanel' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
