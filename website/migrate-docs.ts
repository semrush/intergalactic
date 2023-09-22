import glob from 'fast-glob';
import fs from 'fs/promises';
import {
  resolve as resolvePath,
  dirname as resolveDirname,
  basename as resolveBasename,
} from 'path';
import parseImports from 'parse-es-import';

let deadLinks = [
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/input',
  '/components/select',
  '/components/time-picker/',
  '/patterns/validation-form/',
  '/components/spin/',
  '/components/time-picker/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/components/spin/',
  '/components/select/',
  '/components/input/',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/radio/radio-a11y/',
  '/components/checkbox/checkbox-a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/input/input-a11y/',
  '/core-principles/a11y/',
  '/components/tag',
  '/components/notice/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/core-principles/a11y/',
  '/style/typography/typography-api/',
  '/core-principles/a11y/',
  '/components/link/',
  '/components/link/',
  '/style/icon/',
  '/components/counter/',
  '/components/badge/',
  '/components/flags/',
  '/core-principles/visual-loudness-scale',
  '/components/tooltip/',
  '/components/notice-bubble/',
  '/layout/box-system/',
  '/core-principles/visual-loudness-scale/',
  '/components/input',
  '/components/select',
  '/components/button/button-api/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/input/',
  '/components/time-picker/',
  '/components/counter/counter-code/',
  '/components/input/',
  '/components/textarea/',
  '/components/dot/',
  '/core-principles/a11y/',
  '/components/filter-trigger/',
  '/components/select/',
  '/components/dropdown/',
  '/components/filter-trigger/',
  '/style/typography',
  '/components/pills/',
  '/style/typography',
  '/style/typography',
  '/components/dot/',
  '/layout/box-system/',
  '/components/color-picker/',
  '/components/input/',
  '/components/link/',
  '/components/select/',
  '/components/button/',
  '/components/filter-trigger/',
  '/components/pills/',
  '/components/select/',
  '/components/tab-line/',
  '/components/tab-panel/',
  '/components/tag/',
  '/components/dropdown-menu/',
  '/core-principles/a11y/a11y-design/',
  '/core-principles/a11y/',
  '/components/tooltip',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/link',
  '/components/switch/',
  '/components/radio/',
  '/components/switch/',
  '/components/radio/',
  '/components/accordion/',
  '/components/card/',
  '/table-group/table/',
  '/components/tab-panel/',
  '/components/select/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/layout/box-system/box-api/',
  '/components/dropdown-menu/',
  '/components/counter',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/utils/popper/',
  '/components/dropdown',
  '/components/scroll-area/',
  '/components/dropdown-menu/dropdown-menu-api/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/dot/',
  '/components/link/',
  '/components/inline-input',
  '/table-group/table-controls/',
  '/components/card',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/select/',
  '/components/button/',
  '/components/input/',
  '/utils/popper/',
  '/utils/popper/',
  '/utils/popper/',
  '/components/select/',
  '/components/divider/',
  '/components/spin/',
  '/components/drag-and-drop/',
  '/style/icon/',
  '/components/flags/',
  '/components/badge/',
  '/components/link/',
  '/components/button/',
  '/components/switch',
  '/patterns/informer/',
  '/components/divider/',
  '/components/divider/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/modal',
  '/components/spin',
  '/components/widget-empty/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/counter',
  '/components/button/',
  '/components/select/',
  '/components/dropdown/',
  '/components/counter/',
  '/components/product-head/',
  '/patterns/links-order/',
  '/patterns/feedback-yes-no',
  '/components/spin-container/',
  '/components/spin/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/feedback/',
  '/patterns/form/',
  '/components/input-number',
  '/utils/neighbor-location',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/input/input-a11y/',
  '/core-principles/a11y/',
  '/patterns/form/',
  '/components/input/',
  '/style/design-tokens/',
  '/components/input/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/button/',
  '/style/icon/',
  '/components/input/',
  '/components/textarea/',
  '/components/select',
  '/components/color-picker',
  '/components/time-picker',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/patterns/validation-form/',
  '/components/input-number/input-number-code/',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/input-mask/',
  '/components/input-number/',
  '/components/input-phone/',
  '/components/input-tags/',
  '/components/date-picker',
  '/components/time-picker',
  '/components/color-picker',
  '/components/checkbox',
  '/components/radio',
  '/components/counter/',
  '/components/tag/',
  '/components/textarea/',
  '/components/spin',
  '/components/spin',
  '/components/pagination/',
  '/components/badge/',
  '/components/tag/',
  '/components/auto-suggest/',
  '/components/tag',
  '/components/tag/',
  '/components/auto-suggest/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/tag/',
  '/components/tag/tag-api/',
  '/components/tag/tag-api/',
  '/components/tag/tag-api/',
  '/components/tag/tag-api/',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/tag/tag-a11y/',
  '/core-principles/a11y/',
  '/components/input-mask/',
  '/patterns/form/',
  '/core-principles/visual-loudness-scale',
  '/components/spin/',
  '/components/notice/',
  '/style/typography/',
  '/components/button/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/style/icon/icon-api/',
  '/style/typography/typography-api/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/notice/notice-changelog/',
  '/components/notice-global/',
  '/components/notice-bubble/',
  '/components/notice-global/',
  '/style/icon/',
  '/components/badge/',
  '/components/notice/',
  '/components/product-head/',
  '/components/tab-line/',
  '/patterns/feedback-yes-no',
  '/components/notice-bubble',
  '/components/tooltip',
  '/style/typography/',
  '/components/notice-bubble',
  '/components/notice/notice-api/',
  '/patterns/feedback-yes-no/feedback-yes-no-code/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/notice/',
  '/components/notice-bubble/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/notice/',
  '/components/notice-global/',
  '/components/spin/',
  '/components/progress-bar/',
  '/components/spin/',
  '/components/progress-bar/',
  '/components/spin/',
  '/components/spin/',
  '/components/fullscreen-modal',
  '/core-principles/a11y/',
  '/patterns/modal-content/',
  '/components/fullscreen-modal/',
  '/components/carousel/',
  '/components/fullscreen-modal/',
  '/components/spin/',
  '/components/modal/modal-code/',
  '/components/scroll-area/',
  '/patterns/loading-states/',
  '/components/spin/',
  '/core-principles/a11y/',
  '/patterns/links-order',
  '/components/notice/',
  '/components/breadcrumbs/',
  '/patterns/links-order',
  '/components/link/',
  '/components/button/',
  '/components/tab-line/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/button/',
  '/table-group/table/',
  '/data-display/chart-controls/',
  '/components/dropdown-menu/',
  '/components/select',
  '/core-principles/a11y/a11y-keyboard/',
  '/components/radio',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/layout/box-system/box-api/',
  '/components/dropdown-menu/',
  '/components/badge/',
  '/components/dot/',
  '/components/dropdown-menu/',
  '/style/typography/',
  '/utils/popper/',
  '/components/dropdown-menu',
  '/components/dropdown-menu',
  '/components/dropdown-menu',
  '/components/scroll-area/',
  '/components/notice/',
  '/components/input/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/filter-trigger/filter-trigger-api/',
  '/layout/box-system/box-api/',
  '/components/radio/radio-a11y/',
  '/components/checkbox/checkbox-a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/link',
  '/components/pills/',
  '/components/side-panel/side-panel-changelog/',
  '/components/modal/',
  '/components/product-head/',
  '/style/typography/',
  '/components/progress-bar',
  '/components/skeleton/',
  '/components/spin/',
  '/utils/portal/',
  '/components/modal/',
  '/components/dropdown/',
  '/core-principles/a11y/',
  '/components/spin/',
  '/components/spin/',
  '/core-principles/a11y/',
  '/components/input-number/',
  '/components/input-number/',
  '/patterns/loading-states/',
  '/components/progress-bar/',
  '/components/notice-bubble/',
  '/components/dropdown/',
  '/components/tooltip/',
  '/components/modal/',
  '/components/spin/',
  '/data-display/d3-chart',
  '/data-display/d3-chart',
  '/patterns/web-performance/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/components/spin-container/',
  '/patterns/loading-states/',
  '/components/spin-container/',
  '/components/link/link-a11y/',
  '/core-principles/a11y/a11y-design/',
  '/components/link/link-a11y/',
  '/core-principles/a11y/',
  '/components/switch/',
  '/components/radio/',
  '/components/button/',
  '/components/tab-line/',
  '/components/badge/',
  '/components/counter/',
  '/components/skeleton/',
  '/components/spin/',
  '/components/button',
  '/components/button/',
  '/core-principles/a11y/',
  '/components/switch/',
  '/components/radio/',
  '/components/button/',
  '/components/tab-line/',
  '/components/badge/',
  '/components/counter/',
  '/components/spin/',
  '/components/button',
  '/components/product-head/',
  '/components/pills/',
  '/components/button/',
  '/core-principles/a11y/',
  '/style/design-tokens/',
  '/core-principles/a11y/a11y-design/',
  '/core-principles/a11y/',
  '/components/inline-edit/',
  '/utils/popper/',
  '/components/dropdown/',
  '/components/tooltip/tooltip-changelog/',
  '/components/tooltip/',
  '/data-display/d3-chart/',
  '/patterns/summary/',
  '/utils/popper/popper-api/',
  '/style/icon/',
  '/components/link/',
  '/components/button/',
  '/components/button/',
  '/components/link/',
  '/components/dropdown-menu/',
  '/style/illustration/illustration-api/',
  '/style/typography/typography-a11y/',
  '/core-principles/a11y/',
  '/utils/popper/',
  '/utils/popper/',
  '/utils/popper/',
  '/core-principles/a11y/',
  '/components/auto-suggest/',
  '/components/input/',
  '/components/input/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/style/design-tokens/',
  '/components/inline-input/',
  '/components/input-mask/',
  '/components/inline-input/',
  '/components/tag/tag-code/',
  '/data-display/d3-chart',
  '/data-display/line-chart/',
  '/data-display/stacked-area-chart/',
  '/data-display/d3-chart/',
  '/data-display/line-chart/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart/',
  '/data-display/line-chart/line-chart-d3-code/',
  '/data-display/d3-chart',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/style/typography/typography-a11y/',
  '/components/modal/modal-api/',
  '/components/widget-empty/',
  '/style/illustration/',
  '/components/feature-popover/',
  '/style/typography/',
  '/core-principles/a11y/',
  '/components/modal/',
  '/patterns/validation-form/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/style/illustration/',
  '/data-display/d3-chart',
  '/components/divider/',
  '/components/select/',
  '/data-display/notes/',
  '/data-display/chart-legend/',
  '/data-display/notes/',
  '/components/pills/',
  '/components/pills/',
  '/components/tab-line/',
  '/components/date-picker/',
  '/components/divider/',
  '/data-display/d3-chart',
  '/components/widget-empty/',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/data-display/bar-chart/',
  '/data-display/line-chart/',
  '/data-display/line-chart/',
  '/data-display/donut-chart/',
  '/data-display/stacked-horizontal-bar/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart/',
  '/data-display/bar-chart/bar-chart-d3-code/',
  '/data-display/d3-chart',
  '/data-display/bar-chart/bar-chart-vertical/',
  '/data-display/bar-horizontal/',
  '/data-display/color-palette/',
  '/data-display/d3-chart/',
  '/data-display/bar-horizontal/',
  '/data-display/stacked-bar-chart/',
  '/data-display/bar-chart/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart/',
  '/data-display/line-chart/line-chart-d3-code/',
  '/data-display/stacked-bar-chart/stacked-bar-chart-d3-code/',
  '/data-display/donut-chart/donut-chart-d3-code/',
  '/components/card/',
  '/patterns/summary/',
  '/components/link/',
  '/data-display/chart-controls/',
  '/data-display/chart-controls/',
  '/data-display/chart-legend/',
  '/components/skeleton/',
  '/components/widget-empty/',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/style/design-tokens/',
  '/data-display/chart-legend/',
  '/components/skeleton/',
  '/data-display/d3-chart',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/data-display/d3-chart',
  '/data-display/d3-chart/',
  '/data-display/d3-chart/',
  '/data-display/chart-legend/',
  '/data-display/d3-chart',
  '/components/checkbox/',
  '/components/radio/',
  '/components/checkbox/',
  '/components/radio/',
  '/components/divider/',
  '/data-display/d3-chart',
  '/data-display/d3-chart',
  '/data-display/bar-chart/',
  '/data-display/bar-chart/',
  '/patterns/summary/',
  '/patterns/summary/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/bar-chart',
  '/data-display/d3-chart',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/data-display/bar-chart',
  '/data-display/bar-chart',
  '/data-display/d3-chart',
  '/data-display/chart-controls/',
  '/data-display/d3-chart',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/data-display/d3-chart/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart',
  '/data-display/d3-chart',
  '/data-display/bar-chart/',
  '/data-display/color-palette/',
  '/data-display/bar-chart/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart',
  '/data-display/d3-chart/d3-chart-api/',
  '/components/tag',
  '/components/button',
  '/style/icon',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart',
  '/data-display/line-chart/',
  '/data-display/d3-chart/',
  '/data-display/line-chart/',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/components/widget-empty/',
  '/data-display/d3-chart/',
  '/data-display/d3-chart/',
  '/components/widget-empty/',
  '/data-display/d3-chart',
  '/data-display/d3-chart',
  '/data-display/color-palette/',
  '/data-display/bar-chart/',
  '/data-display/bar-chart/bar-chart-vertical/',
  '/data-display/bar-chart/bar-chart-vertical/',
  '/data-display/bar-chart/',
  '/data-display/d3-chart/',
  '/components/select/',
  '/components/filter-trigger/',
  '/components/dropdown-menu/',
  '/components/input-number/',
  '/components/spin/',
  '/components/spin-container/',
  '/components/widget-empty/',
  '/components/input-number/',
  '/core-principles/a11y/a11y-keyboard/',
  '/filter-group/filter-rules/',
  '/components/select/',
  '/components/filter-trigger/',
  '/components/input-number/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/components/select/',
  '/components/filter-trigger/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/components/input-number/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/components/select/',
  '/components/filter-trigger/',
  '/components/select/',
  '/table-group/table-controls/',
  '/table-group/table-controls/',
  '/components/spin/',
  '/components/widget-empty/',
  '/components/select/',
  '/table-group/table-controls/',
  '/components/select/',
  '/components/spin/',
  '/components/widget-empty/',
  '/data-display/d3-chart',
  '/components/widget-empty/',
  '/components/skeleton/',
  '/components/skeleton/',
  '/components/spin/',
  '/components/spin-container/',
  '/components/widget-empty/',
  '/components/select/',
  '/components/filter-trigger/',
  '/data-display/d3-chart/',
  '/data-display/d3-chart',
  '/data-display/bar-chart/',
  '/data-display/bar-horizontal/',
  '/data-display/bar-horizontal/',
  '/data-display/bar-horizontal/',
  '/data-display/bar-horizontal/',
  '/data-display/bar-horizontal/',
  '/data-display/bar-horizontal/',
  '/data-display/d3-chart/',
  '/data-display/bar-chart/bar-chart-d3-code/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/layout/breakpoints/breakpoints-code/',
  '/layout/grid-system/',
  '/style/design-tokens',
  '/style/typography/',
  '/layout/breakpoints/',
  '/layout/grid-system/',
  '/layout/grid-system',
  '/data-display/d3-chart',
  '/table-group/table/',
  '/table-group/table-controls/',
  '/table-group/table-states/',
  '/get-started-guide/work-figma/',
  '/style/icon/',
  '/data-display/d3-chart/d3-chart-code/',
  '/components/button/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/layout/box-system/',
  '/layout/box-system/',
  '/components/input/',
  '/components/input/',
  '/utils/neighbor-location/',
  '/filter-group/filter-serp-features/filter-serp-features-code/',
  '/filter-group/filter-rules/',
  '/components/select/',
  '/components/filter-trigger/',
  '/filter-group/filter-search/',
  '/filter-group/filter-rules/',
  '/components/spin/',
  '/components/spin-container/',
  '/components/filter-trigger/',
  '/components/widget-empty/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/components/select/',
  '/components/filter-trigger/',
  '/filter-group/filter-search/',
  '/filter-group/filter-rules/',
  '/components/spin/',
  '/components/spin-container/',
  '/components/filter-trigger/',
  '/components/widget-empty/',
  '/filter-group/filter-rules/',
  '/filter-group/filter-rules/',
  '/components/spin/',
  '/components/skeleton/',
  '/components/progress-bar/',
  '/components/skeleton',
  '/components/spin',
  '/style/typography/',
  '/components/tooltip/',
  '/components/tooltip/',
  '/components/product-head/',
  '/components/link/',
  '/core-principles/a11y/',
  '/components/input-mask/',
  '/layout/box-system/',
  '/patterns/validation-form/',
  '/components/notice/',
  '/components/feedback/',
  '/style/illustration/',
  '/components/feedback/',
  '/components/notice/',
  '/core-principles/a11y/a11y-keyboard/',
  '/patterns/form/',
  '/core-principles/a11y/',
  '/table-group/table-states/',
  '/components/divider/',
  '/components/divider/',
  '/components/notice',
  '/components/notice-bubble',
  '/components/notice',
  '/components/spin-container/',
  '/components/spin/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/modal/',
  '/components/modal/',
  '/components/spin/',
  '/style/typography/',
  '/components/divider/',
  '/patterns/informer/',
  '/components/accordion/',
  '/components/skeleton',
  '/components/spin',
  '/components/skeleton/',
  '/components/notice/',
  '/components/skeleton/',
  '/components/spin/',
  '/patterns/form/form-a11y/',
  '/core-principles/a11y/a11y-keyboard/',
  '/core-principles/a11y/',
  '/components/feedback/',
  '/components/notice-bubble/',
  '/components/notice/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/core-principles/a11y/',
  '/style/design-tokens/design-tokens-usage/',
  '/style/design-tokens/design-tokens-usage-development/',
  '/get-started-guide/work-figma/',
  '/style/design-tokens/design-tokens-usage-development/',
  '/style/design-tokens/design-tokens-code/',
  '/style/css-injection/',
  '/style/design-tokens/design-tokens-usage/',
  '/style/design-tokens/design-tokens-usage-development/',
  '/style/design-tokens/design-tokens-usage-development/',
  '/style/design-tokens/',
  '/product-emails/core-email/',
  '/style/design-tokens/',
  '/style/css-injection/css-injection-local/',
  '/style/css-injection/css-injection-global/',
  '/style/design-tokens/',
  '/style/design-tokens/',
  '/components/link/',
  '/components/progress-bar/',
  '/components/spin/',
  '/components/skeleton/',
  '/components/pagination/',
  '/components/progress-bar',
  '/components/spin/',
  '/patterns/empty-page/',
  '/components/widget-empty/widget-empty-code/',
  '/components/widget-empty/widget-empty-code/',
  '/components/widget-empty/',
  '/components/widget-empty/widget-empty-code/',
  '/components/widget-empty/',
  '/patterns/global-errors/',
  '/components/skeleton/',
  '/components/spin/',
  '/table-group/table/',
  '/components/widget-empty/widget-empty-code/',
  '/components/card/',
  '/table-group/table/',
  '/table-group/table/',
  '/table-group/data-table/',
  '/table-group/table-old/',
  '/table-group/data-table/',
  '/table-group/data-table/',
  '/components/accordion',
  '/components/widget-empty/widget-empty-code/',
  '/table-group/data-table/',
  '/table-group/table-old/',
  '/table-group/data-table/',
  '/table-group/data-table/',
  '/table-group/data-table/',
  '/table-group/table/',
  '/components/accordion/',
  '/components/checkbox/',
  '/components/checkbox/',
  '/components/checkbox/',
  '/components/inline-input/',
  '/components/pagination/',
  '/components/select/',
  '/table-group/table/',
  '/layout/grid-system/',
  '/components/link/',
  '/style/typography/',
  '/layout/box-system/box-api/',
  '/table-group/table-primary/',
  '/table-group/table-secondary/',
  '/components/checkbox/',
  '/table-group/table-controls/',
  '/table-group/table-controls/',
  '/table-group/table-states/',
  '/table-group/data-table/',
  '/table-group/table-old/',
  '/table-group/data-table/',
  '/core-principles/a11y/',
  '/table-group/table-primary/',
  '/table-group/table-secondary/',
  '/components/dropdown/',
  '/components/tooltip/',
  '/components/select',
  '/components/button/',
  '/components/input/',
  '/components/select',
  '/layout/box-system/',
  '/components/date-picker/',
  '/terms/terms-of-use/',
];
deadLinks = [...new Set(deadLinks)];
const fixedLinks: string[] = [];
for (let i = 0; i < deadLinks.length; i++) {
  let link = deadLinks[i];
  if (link.endsWith('/')) {
    link = link.substring(0, link.length - 1);
  }
  try {
    await fs.access('./docs2' + link + '.md');
    fixedLinks[i] = link;
  } catch (err) {
    try {
      const lastPart = link.split('/').pop();
      await fs.access('./docs2' + link + `/${lastPart}.md`);
      fixedLinks[i] = link + `/${lastPart}`;
    } catch (err) {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('x', link);
      process.exit(1);
    }
  }
}

// let markdowns = await glob('**/*.md', { cwd: 'docs2' });
// await Promise.all(
//   markdowns.map(async (path) => {
//     const parts = path.split('/');
//     const name = parts[parts.length - 1];
//     const parentDir = parts[parts.length - 2];
//     if (name === parentDir + '.md') {
//       await fs.rename('docs/' + path, 'docs/' + parts.slice(0, -1).join('/') + '/index.md');
//     }
//   }),
// );

const ensureDir = async (dirPath: string) => {
  try {
    await fs.access(dirPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }
};

const alreadyMovedDependencies: { [fromPath: string]: boolean } = {};

const markdowns = await glob('**/*.md', { cwd: 'docs' });
const tabs: { [fromPath: string]: string[] } = {};
await Promise.all(
  markdowns.map(async (path) => {
    let content = await fs.readFile(`docs/${path}`, 'utf-8');
    content = content.replace(/\n@#/g, '\n#');
    content = content.replace(/```htmlqq/g, 'html');

    for (let i = 0; i < deadLinks.length; i++) {
      let minIndex = 0;
      while (true) {
        const deadLink = deadLinks[i];
        const fixedLink = fixedLinks[i];

        const deadLinkIndex = minIndex + content.substring(minIndex).indexOf(deadLink);

        if (deadLinkIndex === minIndex - 1) break;
        const charBeforeDeadLink = content[deadLinkIndex - 1];
        const charAfterDeadLink = content[deadLinkIndex + deadLink.length];
        // if (
        //   deadLink.includes('widget-empty') &&
        //   !deadLink.includes('code') &&
        //   path.includes('table-group/table-states/table-states.md')
        // ) {
        //   console.log({
        //     deadLink,
        //     fixedLink,
        //     deadLinkIndex,
        //     path,
        //     charBeforeDeadLink,
        //     charAfterDeadLink,
        //   });
        // }
        if (
          charBeforeDeadLink !== '(' ||
          !(charAfterDeadLink === ')' || charAfterDeadLink === '#')
        ) {
          minIndex = deadLinkIndex + deadLink.length;
          continue;
        }

        content =
          content.substring(0, deadLinkIndex) +
          fixedLink +
          content.substring(deadLinkIndex + deadLink.length);
        minIndex = deadLinkIndex + fixedLink.length;
      }
    }

    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith(' ')) {
        lines[i] = lines[i].replace(/{{/g, '{');
        lines[i] = lines[i].replace(/}}/g, '}');
      }
      if (lines[i].startsWith('> 🚨 ')) {
        lines[i] = lines[i].replace('> 🚨 ', ':rotating_light: ');
        lines.splice(i + 1, 0, ':::');
        if (lines[i + 2] !== '') lines.splice(i + 1, 0, '');

        lines.splice(i, 0, '::: warning');
      }
      if (lines[i].startsWith('> ⚠️ ')) {
        lines[i] = lines[i].replace('> ⚠️ ', ':warning: ');
        lines.splice(i + 1, 0, ':::');
        if (lines[i + 2] !== '') lines.splice(i + 1, 0, '');

        lines.splice(i, 0, '::: warning');
      }
      if (lines[i].startsWith('>')) {
        const from = i;
        let to = i;
        while (lines[to].startsWith('>')) to++;
        const quoteLines = lines.slice(from, to).map((line) => line.replace(/>\s*/, ''));
        lines.splice(i, quoteLines.length, '::: tip', ...quoteLines, ':::');
      }
      if (lines[i].startsWith('@example ')) {
        const exampleName = lines[i].split(' ')[1];
        const examplePath = resolvePath(
          'docs',
          resolveDirname(path),
          'examples',
          `${exampleName}.tsx`,
        );
        let exampleCode: string | null = null;
        try {
          exampleCode = await fs.readFile(examplePath, 'utf-8');
        } catch {
          // biome-ignore lint/suspicious/noConsoleLog:
          console.log(`Example not found: ${examplePath}`);
        }
        if (!exampleCode) continue;

        if (exampleCode.endsWith('\n')) {
          exampleCode = exampleCode.substring(0, exampleCode.length - 1);
        }
        exampleCode = exampleCode.replace('export default function()', 'const Demo = () =>');
        exampleCode = exampleCode.replace('export default function ()', 'const Demo = () =>');
        exampleCode = exampleCode.replace('export default Demo;', '');
        exampleCode = exampleCode.replace('export default ', 'const Demo = ');

        const newLines = [
          '::: sandbox',
          '',
          '<script lang="tsx">',
          ...exampleCode.split('\n'),
          '</script>',
          '',
          ':::',
        ];
        lines.splice(i, 1, ...newLines);
        try {
          await fs.rm(resolvePath('docs2', resolveDirname(path), 'examples', `${exampleName}.tsx`));
        } catch {}
      }
      if (lines[i].startsWith('@typescript ')) {
        const typeName = lines[i].split(' ')[1];
        if (
          !lines.some(
            (line) =>
              line.trim() ===
              "<script setup>import { data as types } from '@types.data.ts';</script>",
          )
        ) {
          lines.push("<script setup>import { data as types } from '@types.data.ts';</script>");
        }
        lines.splice(i, 1, `<TypesView type="${typeName}" :types={...types} />`);
      }
      if (lines[i].startsWith('@table-caption ')) {
        lines[i] = lines[i].replace('@table-caption ', 'Table: ');
      }
      if (lines[i].startsWith('@email_html ')) {
        lines[i] = lines[i].replace('@email_html ', '::: legacy_emails_view ') + ' :::';
      }
      if (lines[i].startsWith('@embedded_video ')) {
        const url = lines[i].split(' ')[1];
        lines[i] = `::: loom_video ${url} :::`;
      }
      if (lines[i].startsWith('@import ')) {
        const componentName = lines[i].split(' ')[1];
        const examplePath = resolvePath(
          'docs',
          resolveDirname(path),
          'components',
          `${componentName}.jsx`,
        );
        let exampleCode: string | null = null;
        try {
          exampleCode = await fs.readFile(examplePath, 'utf-8');
        } catch {
          // biome-ignore lint/suspicious/noConsoleLog:
          console.log(`Component not found: ${examplePath}`);
        }
        if (!exampleCode) continue;

        if (exampleCode.endsWith('\n')) {
          exampleCode = exampleCode.substring(0, exampleCode.length - 1);
        }
        exampleCode = exampleCode.replace('export default function()', 'const App = () =>');
        exampleCode = exampleCode.replace('export default function ()', 'const App = () =>');
        exampleCode = exampleCode.replace('export default App;', '');
        exampleCode = exampleCode.replace('export default ', 'const App = ');

        const newLines = [
          '::: react-view',
          '',
          '<script lang="tsx">',
          ...exampleCode.split('\n'),
          '</script>',
          '',
          ':::',
        ];
        lines.splice(i, 1, ...newLines);
        try {
          await fs.rm(
            resolvePath('docs2', resolveDirname(path), 'components', `${componentName}.tsx`),
          );
        } catch {}
        const { imports } = parseImports(exampleCode);
        for (const importExpression of imports) {
          if (importExpression.moduleName.startsWith('.')) {
            let name = importExpression.moduleName;
            const key = resolvePath('docs2', resolveDirname(path), 'components', name);
            if (alreadyMovedDependencies[key]) continue;
            if (!name.split('/').pop()!.includes('.')) {
              for (const extention of ['.tsx', '.jsx', '.ts', '.js', '.json']) {
                try {
                  await fs.stat(
                    resolvePath('docs2', resolveDirname(path), 'components', name + extention),
                  );
                  name += extention;
                  break;
                } catch {}
              }
            }
            const importedPath = resolvePath('docs2', resolveDirname(path), 'components', name);
            const newPath = resolvePath('docs2', resolveDirname(path), name);
            try {
              await fs.rename(importedPath, newPath);
              alreadyMovedDependencies[key] = true;
            } catch {
              // biome-ignore lint/suspicious/noConsoleLog:
              console.log(`Unable to move dependency: ${importedPath}`);
            }
          }
        }
      }
      if (lines[i].startsWith('@changelog ')) {
        const componentName = lines[i].substring('@changelog '.length);
        lines[i] = `::: changelog ${componentName} :::`;
      }
    }
    let removeFile = false;
    if (content.includes('@page ')) {
      const pages = lines
        .filter((line) => line.startsWith('@page '))
        .map((line) => line.split(' ')[1]);
      tabs[resolvePath('docs2', path)] = await Promise.all(
        pages.map(async (subPath) => {
          try {
            const stat = await fs.stat(
              resolvePath(resolveDirname(resolvePath('docs2', path)), subPath),
            );
            if (stat.isDirectory()) {
              return resolvePath(
                resolveDirname(resolvePath('docs2', path)),
                subPath,
                subPath + '.md',
              );
            }
          } catch {}
          return resolvePath(resolveDirname(resolvePath('docs2', path)), subPath + '.md');
        }),
      );
      const metaEndIndex = lines.slice(1).indexOf('---') + 1;
      lines = lines.filter((line) => !line.startsWith('@page '));
      if (lines.slice(metaEndIndex + 1).filter(Boolean).length === 0) {
        removeFile = true;
        try {
          await fs.rm(resolvePath('docs2', path));
        } catch {}
      }
    }
    content = lines.join('\n');
    content = content.replace(/⚠️/g, ':warning:');
    if (!removeFile) {
      await ensureDir(resolvePath('docs2', resolveDirname(path)));
      await fs.writeFile(`docs2/${path}`, content);
    }

    const docsDirEntities = await fs.readdir(resolvePath('docs', resolveDirname(path)));
    if (docsDirEntities.includes('static')) {
      const docs2DirEntities = await fs.readdir(resolvePath('docs2', resolveDirname(path)));
      if (!docs2DirEntities.includes('static')) {
        await fs.mkdir(resolvePath('docs2', resolveDirname(path), 'static'));
      }
      const files = await fs.readdir(resolvePath('docs', resolveDirname(path), 'static'));
      await Promise.all(
        files
          .filter((file) => !file.startsWith('.'))
          .map(async (file) => {
            await fs.copyFile(
              resolvePath('docs', resolveDirname(path), 'static', file),
              resolvePath('docs2', resolveDirname(path), 'static', file),
            );
          }),
      );
    }
  }),
);

await Promise.all(
  Object.entries(tabs).map(async ([mainFile, subFiles]) => {
    let mainContent = '';

    try {
      mainContent = await fs.readFile(mainFile, 'utf-8');
    } catch {
      return;
    }
    const subContents = await Promise.all(
      subFiles.map(async (path) => {
        try {
          return await fs.readFile(path, 'utf-8');
        } catch {
          return '';
        }
      }),
    );
    const mainTitle = mainContent.split('\ntitle: ')[1]?.split('\n')[0];
    const mainTabName = mainContent.split('\ntabName: ')[1]?.split('\n')[0] || mainTitle;

    const subTitles = subContents.map((content) => content.split('\ntitle: ')[1]?.split('\n')[0]);
    const mainId = mainFile?.split('/').pop()?.split('.')[0];
    const subIds = subFiles.map((content) => content?.split('/').pop()?.split('.')[0]);
    const tabsList: string[] = [];
    if (mainTabName) {
      tabsList.push(`${mainTabName}('${mainId}')`);
    }
    subTitles.forEach((title, index) => {
      if (title) tabsList.push(`${title}('${subIds[index]}')`);
    });
    const tabsStr = tabsList.join(', ');

    if (mainContent && !mainContent.includes('tabs: ')) {
      mainContent = mainContent.replace('\n---\n', `\ntabs: ${tabsStr}\n---\n`);
      mainContent = mainContent.replace(`\ntabName: ${mainTabName}\n`, '\n');
      await ensureDir(resolveDirname(mainFile));
      await fs.writeFile(mainFile, mainContent);
    }
    for (let i = 0; i < subFiles.length; i++) {
      if (subContents[i] && !subContents[i].includes('tabs: ')) {
        let content = subContents[i];
        const title = content.split('\ntitle: ')[1]?.split('\n')[0];
        const tabName = content.split('\ntabName: ')[1]?.split('\n')[0] || mainTitle;
        content = content.replace('\n---\n', `\ntabs: ${tabsStr}\n---\n`);
        content = content.replace(`\ntabName: ${tabName}\n`, '\n');
        content = content.replace(`\ntitle: ${title}\n`, `\ntitle: ${mainTitle}\n`);
        // add or replace title
        await ensureDir(resolveDirname(subFiles[i]));
        await fs.writeFile(subFiles[i], content);
      }
    }
  }),
);
