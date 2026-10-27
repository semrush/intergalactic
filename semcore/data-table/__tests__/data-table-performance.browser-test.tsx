import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// render counters written by the virtual-scroll-controls story
declare global {
  interface Window {
    __dtRenders?: number;
    __dtRowRenders?: Record<string, number>;
  }
}

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */

test.describe(`${TAG.FUNCTIONAL} ${TAG.PERFORMANCE}`, () => {
  const STORY = 'stories/components/data-table/tests/examples/virtualization/virtual-scroll-controls.tsx';
  const MODES = ['boolean', 'rowHeight'] as const;
  // default rowsBuffer in both modes
  const storyProps = (mode: (typeof MODES)[number]) => ({ mode, useCustomBuffer: false, rowHeight: 45 });

  const scrollContainer = (page: Page) => page.locator('[data-ui-name="ScrollArea.Container"]');

  const scrollTo = (page: Page, px: number) =>
    scrollContainer(page).evaluate((el: HTMLElement, value) => {
      el.scrollTop = value;
      el.dispatchEvent(new Event('scroll', { bubbles: true }));
    }, px);

  const waitForFrames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    }));

  const mountedRowIds = (page: Page) =>
    page.locator('[data-ui-name="Row"]').evaluateAll((rows) =>
      rows.map((row) => row.querySelector('[role="gridcell"]')?.textContent ?? ''),
    );

  for (const mode of MODES) {
    test(`Verify scroll does not re-render already mounted rows (${mode})`, {
      tag: [TAG.PRIORITY_HIGH, '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, STORY, 'en', storyProps(mode));
      await expect(page.getByRole('row').nth(1)).toBeVisible();

      for (const delta of [20, 450]) {
        await test.step(`Scroll by ${delta}px`, async () => {
          const before = await mountedRowIds(page);
          await page.evaluate(() => {
            window.__dtRenders = 0;
            window.__dtRowRenders = {};
          });

          const scrollTop = await scrollContainer(page).evaluate((el) => el.scrollTop);
          await scrollTo(page, scrollTop + delta);
          await waitForFrames(page);

          const after = await mountedRowIds(page);
          const stillMounted = before.filter((id) => after.includes(id));
          const rowRenders = await page.evaluate(() => window.__dtRowRenders ?? {});
          const rerendered = stillMounted.filter((id) => (rowRenders[id] ?? 0) > 0);

          test.info().annotations.push({
            type: `${mode} +${delta}px`,
            description: `still mounted: ${stillMounted.length}, re-rendered: ${rerendered.length}`,
          });

          expect(stillMounted.length).toBeGreaterThan(0);
          expect(rerendered).toEqual([]);
        });
      }
    });

    test(`Verify detached row nodes are released after virtual scroll (${mode})`, {
      tag: [TAG.PRIORITY_HIGH, '@data-table'],
    }, async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Uses Chrome DevTools Protocol');

      await loadPage(page, STORY, 'en', storyProps(mode));
      await expect(page.getByRole('row').nth(1)).toBeVisible();

      await test.step('Scroll to the end and back to the top', async () => {
        let px = 0;
        while (px < await scrollContainer(page).evaluate((el) => el.scrollHeight - el.clientHeight)) {
          px += 400;
          await scrollTo(page, px);
          await waitForFrames(page);
        }

        await expect(page.locator('[role="row"][aria-rowindex="501"]')).toBeAttached();

        await scrollTo(page, 0);
        await waitForFrames(page);
        await scrollTo(page, 1);
        await waitForFrames(page);
        await expect(page.locator('[role="row"][aria-rowindex="2"]')).toBeAttached();
      });

      const detachedRows = await test.step('Count detached rows retained in heap', async () => {
        const cdp = await page.context().newCDPSession(page);
        const objectGroup = 'detached-rows';

        await cdp.send('HeapProfiler.collectGarbage');
        const { result: prototype } = await cdp.send('Runtime.evaluate', {
          expression: 'HTMLDivElement.prototype',
          objectGroup,
        });
        const { objects } = await cdp.send('Runtime.queryObjects', {
          prototypeObjectId: prototype.objectId!,
          objectGroup,
        });
        const { result } = await cdp.send('Runtime.callFunctionOn', {
          objectId: objects.objectId!,
          functionDeclaration:
            'function () { return this.filter((node) => !node.isConnected && node.getAttribute("role") === "row").length; }',
          returnByValue: true,
        });

        await cdp.send('Runtime.releaseObjectGroup', { objectGroup });
        await cdp.detach();

        return result.value as number;
      });

      test.info().annotations.push({ type: `${mode} detached rows`, description: String(detachedRows) });

      expect(detachedRows).toBeLessThanOrEqual(20);
    });
  }
});
