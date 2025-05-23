import { DefaultTheme } from 'vitepress';

type SidebarConfig = {
  text?: string;
  link?: string;
  collapsed?: boolean;
  activeMatch?: string;
  items?: SidebarConfig;
}[];

export const sideBarConfig: SidebarConfig = [
  {
    items: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          {
            link: '/get-started-guide/dev-starter-guide/dev-starter-guide',
            text: 'For developers',
            activeMatch: '/get-started-guide/dev-starter-guide/',
          },
          {
            link: '/get-started-guide/dis-starter-guide/dis-starter-guide',
            text: 'For designers',
          },
          {
            link: '/get-started-guide/work-figma/work-figma',
            text: 'Figma libraries',
          },
        ],
      },
    ],
  },
  {
    text: 'Foundation',
    items: [
      {
        text: 'Principles',
        collapsed: true,
        items: [
          {
            link: '/core-principles/a11y/a11y',
            activeMatch: '/core-principles/a11y/',
            text: 'Accessibility',
          },
          {
            link: '/core-principles/principles/principles',
            text: 'Design principles',
          },
          {
            link: '/core-principles/motion-principles-guide/motion-principles-guide',
            text: 'Motion',
          },
          {
            link: '/core-principles/visual-loudness-scale/visual-loudness-scale',
            text: 'Visual loudness scale',
          },
          {
            text: 'Writing code',
            collapsed: false,
            items: [
              {
                text: 'Wrapping components',
                link: '/core-principles/writing-code/wrapping-components',
              },
            ],
          },
        ],
      },
      {
        text: 'Style',
        collapsed: true,
        items: [
          {
            link: '/style/design-tokens/design-tokens',
            activeMatch: '/style/design-tokens/',
            text: 'Design tokens',
          },
          {
            link: '/style/icon/icon',
            activeMatch: '/style/icon/',
            text: 'Icon',
          },
          {
            link: '/style/illustration/illustration',
            activeMatch: '/style/illustration/',
            text: 'Illustration',
          },
          {
            link: '/style/typography/typography',
            activeMatch: '/style/typography/',
            text: 'Typography',
          },
          {
            link: '/style/css-injection/css-injection',
            activeMatch: '/style/css-injection/',
            text: 'CSS Injection',
          },
        ],
      },
      {
        text: 'Layout',
        collapsed: true,
        items: [
          {
            link: '/layout/breakpoints/breakpoints',
            activeMatch: '/layout/breakpoints/',
            text: 'Breakpoints',
          },
          {
            link: '/layout/grid-system/grid-system',
            activeMatch: '/layout/grid-system/',
            text: 'Grid and page layout',
          },
          {
            link: '/layout/box-system/box-system',
            activeMatch: '/layout/box-system/',
            text: 'Flex-box and spacing system',
          },
        ],
      },
      {
        text: 'Content',
        collapsed: true,
        items: [
          {
            link: '/content/date-format/date-format',
            activeMatch: '/content/date-format/',
            text: 'Date format',
          },
          {
            link: '/content/file-extensions/file-extensions',
            activeMatch: '/content/file-extensions/',
            text: 'File extensions',
          },
          {
            link: '/content/numbers/numbers',
            activeMatch: '/content/numbers/',
            text: 'Numbers',
          },
          {
            link: '/content/punctuation/punctuation',
            activeMatch: '/content/punctuation/',
            text: 'Punctuation and special symbols',
          },
          {
            link: '/content/units-of-measurement/units-of-measurement',
            activeMatch: '/content/units-of-measurement/',
            text: 'Units of measurement',
          },
        ],
      },
    ],
  },
  {
    text: 'Components & Patterns',
    items: [
      {
        text: 'Components',
        collapsed: true,
        items: [
          {
            link: '/components/components-showcase/components-showcase',
            activeMatch: '/components/components-showcase/',
            text: 'Components showcase',
          },
          {
            link: '/components/accordion/accordion',
            activeMatch: '/components/accordion/',
            text: 'Accordion',
          },
          {
            link: '/components/auto-suggest/auto-suggest',
            activeMatch: '/components/auto-suggest/',
            text: 'AutoSuggest',
          },
          {
            link: '/components/badge/badge',
            activeMatch: '/components/badge/',
            text: 'Badge',
          },
          {
            link: '/components/base-trigger/base-trigger',
            activeMatch: '/components/base-trigger/',
            text: 'BaseTrigger',
          },
          {
            link: '/components/breadcrumbs/breadcrumbs',
            activeMatch: '/components/breadcrumbs/',
            text: 'Breadcrumbs',
          },
          {
            link: '/components/bulk-textarea/bulk-textarea',
            activeMatch: '/components/bulk-textarea/',
            text: 'BulkTextarea',
          },
          {
            link: '/components/button/button',
            activeMatch: '/components/button/',
            text: 'Button',
          },
          {
            link: '/components/card/card',
            activeMatch: '/components/card/',
            text: 'Card',
          },
          {
            link: '/components/carousel/carousel',
            activeMatch: '/components/carousel/',
            text: 'Carousel',
          },
          {
            link: '/components/checkbox/checkbox',
            activeMatch: '/components/checkbox/',
            text: 'Checkbox',
          },
          {
            link: '/components/color-picker/color-picker',
            activeMatch: '/components/color-picker/',
            text: 'ColorPicker',
          },
          {
            link: '/components/counter/counter',
            activeMatch: '/components/counter/',
            text: 'Counter',
          },
          {
            link: '/components/date-picker/date-picker',
            activeMatch: '/components/date-picker/',
            text: 'DatePicker',
          },
          {
            link: '/components/divider/divider',
            activeMatch: '/components/divider/',
            text: 'Divider',
          },
          {
            link: '/components/dot/dot',
            activeMatch: '/components/dot/',
            text: 'Dot',
          },
          {
            link: '/components/drag-and-drop/drag-and-drop',
            activeMatch: '/components/drag-and-drop/',
            text: 'Drag and drop',
          },
          {
            link: '/components/dropdown/dropdown',
            activeMatch: '/components/dropdown/',
            text: 'Dropdown',
          },
          {
            link: '/components/dropdown-menu/dropdown-menu',
            activeMatch: '/components/dropdown-menu/',
            text: 'DropdownMenu',
          },
          {
            link: '/components/ellipsis/ellipsis',
            activeMatch: '/components/ellipsis/',
            text: 'Ellipsis',
          },
          {
            link: '/components/feature-popover/feature-popover',
            activeMatch: '/components/feature-popover/',
            text: 'FeaturePopover',
          },
          {
            link: '/components/feedback/feedback',
            activeMatch: '/components/feedback/',
            text: 'Feedback',
          },
          {
            link: '/components/filter-trigger/filter-trigger',
            activeMatch: '/components/filter-trigger/',
            text: 'FilterTrigger',
          },
          {
            link: '/components/flags/flags',
            activeMatch: '/components/flags/',
            text: 'Flags',
          },
          {
            link: '/components/fullscreen-modal/fullscreen-modal',
            activeMatch: '/components/fullscreen-modal/',
            text: 'FullscreenModal',
          },
          {
            link: '/components/inline-edit/inline-edit',
            activeMatch: '/components/inline-edit/',
            text: 'InlineEdit',
          },
          {
            link: '/components/inline-input/inline-input',
            activeMatch: '/components/inline-input/',
            text: 'InlineInput',
          },
          {
            link: '/components/input/input',
            activeMatch: '/components/input/',
            text: 'Input',
          },
          {
            link: '/components/input-mask/input-mask',
            activeMatch: '/components/input-mask/',
            text: 'InputMask [deprecated]',
          },
          {
            link: '/components/input-number/input-number',
            activeMatch: '/components/input-number/',
            text: 'InputNumber & InputRange',
          },
          {
            link: '/components/input-phone/input-phone',
            activeMatch: '/components/input-phone/',
            text: 'InputPhone',
          },
          {
            link: '/components/input-tags/input-tags',
            activeMatch: '/components/input-tags/',
            text: 'InputTags',
          },
          {
            link: '/components/link/link',
            activeMatch: '/components/link/',
            text: 'Link',
          },
          {
            link: '/components/modal/modal',
            activeMatch: '/components/modal/',
            text: 'Modal',
          },
          {
            link: '/components/notice/notice',
            activeMatch: '/components/notice/',
            text: 'Notice',
          },
          {
            link: '/components/notice-bubble/notice-bubble',
            activeMatch: '/components/notice-bubble/',
            text: 'NoticeBubble',
          },
          {
            link: '/components/notice-global/notice-global',
            activeMatch: '/components/notice-global/',
            text: 'NoticeGlobal',
          },
          {
            link: '/components/pagination/pagination',
            activeMatch: '/components/pagination/',
            text: 'Pagination',
          },
          {
            link: '/components/pills/pills',
            activeMatch: '/components/pills/',
            text: 'Pills',
          },
          {
            link: '/components/product-head/product-head',
            activeMatch: '/components/product-head/',
            text: 'ProductHead',
          },
          {
            link: '/components/progress-bar/progress-bar',
            activeMatch: '/components/progress-bar/',
            text: 'ProgressBar',
          },
          {
            link: '/components/radio/radio',
            activeMatch: '/components/radio/',
            text: 'Radio',
          },
          {
            link: '/components/scroll-area/scroll-area',
            activeMatch: '/components/scroll-area/',
            text: 'ScrollArea',
          },
          {
            link: '/components/select/select',
            activeMatch: '/components/select/',
            text: 'Select / Multiselect',
          },
          {
            link: '/components/side-panel/side-panel',
            activeMatch: '/components/side-panel/',
            text: 'SidePanel',
          },
          {
            link: '/components/skeleton/skeleton',
            activeMatch: '/components/skeleton/',
            text: 'Skeleton',
          },
          {
            link: '/components/slider/slider',
            activeMatch: '/components/slider/',
            text: 'Slider',
          },
          {
            link: '/components/spin/spin',
            activeMatch: '/components/spin/',
            text: 'Spin',
          },
          {
            link: '/components/spin-container/spin-container',
            activeMatch: '/components/spin-container/',
            text: 'SpinContainer',
          },
          {
            link: '/components/switch/switch',
            activeMatch: '/components/switch/',
            text: 'Switch',
          },
          {
            link: '/components/tab-line/tab-line',
            activeMatch: '/components/tab-line/',
            text: 'TabLine',
          },
          {
            link: '/components/tab-panel/tab-panel',
            activeMatch: '/components/tab-panel/',
            text: 'TabPanel',
          },
          {
            link: '/components/tag/tag',
            activeMatch: '/components/tag/',
            text: 'Tag',
          },
          {
            link: '/components/textarea/textarea',
            activeMatch: '/components/textarea/',
            text: 'Textarea',
          },
          {
            link: '/components/time-picker/time-picker',
            activeMatch: '/components/time-picker/',
            text: 'TimePicker',
          },
          {
            link: '/components/tooltip/tooltip',
            activeMatch: '/components/tooltip/',
            text: 'Tooltip',
          },
          {
            link: '/components/widget-empty/widget-empty',
            activeMatch: '/components/widget-empty/',
            text: 'Widget empty state',
          },
          {
            link: '/components/wizard/wizard',
            activeMatch: '/components/wizard/',
            text: 'Wizard',
          },
        ],
      },
      {
        text: 'Charts',
        collapsed: true,
        items: [
          {
            link: '/data-display/chart-showcase/chart-showcase',
            text: 'Charts showcase',
          },
          {
            link: '/data-display/d3-chart/d3-chart',
            activeMatch: '/data-display/d3-chart/',
            text: 'D3 chart',
          },
          {
            link: '/data-display/color-palette/color-palette',
            text: 'Color palette',
          },
          {
            link: '/data-display/chart-controls/chart-controls',
            text: 'Chart controls',
          },
          {
            link: '/data-display/chart-legend/chart-legend',
            activeMatch: '/data-display/chart-legend/',
            text: 'Chart legend',
          },
          {
            link: '/data-display/notes/notes',
            text: 'Notes module',
          },
          {
            link: '/data-display/area-chart/area-chart',
            activeMatch: '/data-display/area-chart/',
            text: 'Area chart',
          },
          {
            link: '/data-display/stacked-area-chart/stacked-area-chart',
            activeMatch: '/data-display/stacked-area-chart/',
            text: 'Stacked area chart',
          },
          {
            link: '/data-display/bar-chart/bar-chart',
            activeMatch: '/data-display/bar-chart/',
            text: 'Bar chart',
          },
          {
            link: '/data-display/stacked-bar-chart/stacked-bar-chart',
            activeMatch: '/data-display/stacked-bar-chart/',
            text: 'Stacked bar chart',
          },
          {
            link: '/data-display/bar-horizontal/bar-horizontal',
            activeMatch: '/data-display/bar-horizontal/',
            text: 'Horizontal bar chart',
          },
          {
            link: '/data-display/bar-horizontal-compact/bar-horizontal-compact',
            activeMatch: '/data-display/bar-horizontal-compact/',
            text: 'Compact horizontal bar chart',
          },
          {
            link: '/data-display/stacked-horizontal-bar/stacked-horizontal-bar',
            activeMatch: '/data-display/stacked-horizontal-bar/',
            text: 'Stacked horizontal bar chart',
          },
          {
            link: '/data-display/bubble-chart/bubble-chart',
            activeMatch: '/data-display/bubble-chart/',
            text: 'Bubble chart',
          },
          {
            link: '/data-display/cigarette-chart/cigarette-chart',
            activeMatch: '/data-display/cigarette-chart/',
            text: 'Cigarette chart',
          },
          {
            link: '/data-display/donut-chart/donut-chart',
            activeMatch: '/data-display/donut-chart/',
            text: 'Donut / Pie chart',
          },
          {
            link: '/data-display/histogram-chart/histogram-chart',
            activeMatch: '/data-display/histogram-chart/',
            text: 'Histogram chart',
          },
          {
            link: '/data-display/line-chart/line-chart',
            activeMatch: '/data-display/line-chart/',
            text: 'Line chart',
          },
          {
            link: '/data-display/mini-chart/mini-chart',
            activeMatch: '/data-display/mini-chart/',
            text: 'Mini chart',
          },
          {
            link: '/data-display/radar-chart/radar-chart',
            activeMatch: '/data-display/radar-chart/',
            text: 'Radar chart',
          },
          {
            link: '/data-display/radial-tree-chart/radial-tree-chart',
            activeMatch: '/data-display/radial-tree-chart/',
            text: 'Radial Tree chart',
          },
          {
            link: '/data-display/scatterplot-chart/scatterplot-chart',
            activeMatch: '/data-display/scatterplot-chart/',
            text: 'Scatterplot chart',
          },
          {
            link: '/data-display/venn-chart/venn-chart',
            activeMatch: '/data-display/venn-chart/',
            text: 'Venn chart',
          },
          {
            link: '/data-display/alluvial-chart/alluvial-chart',
            text: 'Alluvial chart',
          },
          {
            link: '/data-display/choropleth-map/choropleth-map',
            text: 'Choropleth map',
          },
          {
            link: '/data-display/funnel-chart/funnel-chart',
            text: 'Funnel chart',
          },
          {
            link: '/data-display/heatmap/heatmap',
            text: 'Heatmap',
          },
          {
            link: '/data-display/kagi-chart/kagi-chart',
            text: 'Kagi chart',
          },
          {
            link: '/data-display/lollipop-chart/lollipop-chart',
            text: 'Lollipop chart',
          },
          {
            link: '/data-display/polar-chart/polar-chart',
            text: 'Polar chart',
          },
          {
            link: '/data-display/quadrant-chart/quadrant-chart',
            text: 'Quadrant chart',
          },
        ],
      },
      {
        text: 'Table',
        collapsed: true,
        items: [
          {
            link: '/table-group/table-showcase/table-showcase',
            text: 'Table showcase',
          },
          {
            link: '/table-group/data-table/data-table',
            activeMatch: '/table-group/data-table/',
            text: 'DataTable',
          },
          {
            link: '/table-group/table-primary/table-primary',
            activeMatch: '/table-group/table-primary/',
            text: 'Primary table',
          },
          {
            link: '/table-group/table-secondary/table-secondary',
            activeMatch: '/table-group/table-secondary/',
            text: 'Secondary table',
          },
          {
            link: '/table-group/table-controls/table-controls',
            text: 'Table controls',
          },
          {
            link: '/table-group/table-states/table-states',
            text: 'Table states',
          },
          {
            link: '/table-group/table-old/table-old',
            activeMatch: '/table-group/table-old/',
            text: 'Table [deprecated]',
          },
        ],
      },
      {
        text: 'Filters',
        collapsed: true,
        items: [
          {
            link: '/filter-group/filter-rules/filter-rules',
            text: 'Filter common rules',
          },
          {
            link: '/filter-group/add-filter/add-filter',
            activeMatch: '/filter-group/add-filter/',
            text: 'Add filter',
          },
          {
            link: '/filter-group/advanced-filters/advanced-filters',
            activeMatch: '/filter-group/advanced-filters/',
            text: 'Advanced filters',
          },
          {
            link: '/filter-group/filter-category/filter-category',
            text: 'Category',
          },
          {
            link: '/filter-group/filter-cp-cd-cpc/filter-cp-cd-cpc',
            activeMatch: '/filter-group/filter-cp-cd-cpc/',
            text: 'Click Potential, Competitive Density, CPC',
          },
          {
            link: '/filter-group/filter-include-exclude/filter-include-exclude',
            activeMatch: '/filter-group/filter-include-exclude/',
            text: 'Include/Exclude keywords',
          },
          {
            link: '/filter-group/filter-kd-positions-volume/filter-kd-positions-volume',
            activeMatch: '/filter-group/filter-kd-positions-volume/',
            text: 'Keyword Difficulty, Positions, Volume',
          },
          {
            link: '/filter-group/filter-search/filter-search',
            activeMatch: '/filter-group/filter-search/',
            text: 'Filter Search',
          },
          {
            link: '/filter-group/filter-serp-features/filter-serp-features',
            activeMatch: '/filter-group/filter-serp-features/',
            text: 'SERP Features',
          },
          {
            link: '/filter-group/filter-tags/filter-tags',
            activeMatch: '/filter-group/filter-tags/',
            text: 'Tags',
          },
        ],
      },
      {
        text: 'UX patterns',
        collapsed: true,
        items: [
          {
            link: '/patterns/modal-content/modal-content',
            text: 'Content in modal window',
          },
          {
            link: '/patterns/confirm-dialog/confirm-dialog',
            activeMatch: '/patterns/confirm-dialog/',
            text: 'Confirmation modal dialog',
          },
          {
            link: '/patterns/empty-page/empty-page',
            text: 'Empty page',
          },
          {
            link: '/patterns/global-errors/global-errors',
            activeMatch: '/patterns/global-errors/',
            text: 'Error message',
          },
          {
            link: '/patterns/export/export',
            text: 'Export',
          },
          {
            link: '/patterns/feedback-rating/feedback-rating',
            activeMatch: '/patterns/feedback-rating/',
            text: 'FeedbackRating',
          },
          {
            link: '/patterns/feedback-yes-no/feedback-yes-no',
            activeMatch: '/patterns/feedback-yes-no/',
            text: 'FeedbackYesNo',
          },
          {
            link: '/patterns/form/form',
            activeMatch: '/patterns/form/',
            text: 'Form',
          },
          {
            link: '/patterns/informer/informer',
            activeMatch: '/patterns/informer/',
            text: 'Informer',
          },
          {
            link: '/patterns/links-order/links-order',
            text: 'Links order in ProductHead',
          },
          {
            link: '/patterns/loading-states/loading-states',
            text: 'Loading states',
          },
          {
            link: '/patterns/project-create/project-create',
            text: 'ProjectCreate',
          },
          {
            link: '/patterns/project-select/project-select',
            text: 'ProjectSelect',
          },
          {
            link: '/patterns/success-state/success-state',
            activeMatch: '/patterns/success-state/',
            text: 'Success state',
          },
          {
            link: '/patterns/summary/summary',
            activeMatch: '/patterns/summary/',
            text: 'Summary',
          },
          {
            link: '/patterns/validation-form/validation-form',
            activeMatch: '/patterns/validation-form/',
            text: 'Validation',
          },
          {
            link: '/patterns/web-performance/web-performance',
            text: 'Web-performance',
          },
        ],
      },
      {
        text: 'Utils',
        collapsed: true,
        items: [
          {
            link: '/utils/neighbor-location/neighbor-location',
            activeMatch: '/utils/neighbor-location/',
            text: 'NeighborLocation',
          },
          {
            link: '/utils/popper/popper',
            activeMatch: '/utils/popper/',
            text: 'Popper',
          },
          {
            link: '/utils/portal/portal',
            activeMatch: '/utils/portal/',
            text: 'Portal',
          },
          {
            link: '/utils/i18n/i18n',
            text: 'i18n',
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        link: '/bug-reporting/report-bug/report-bug',
        text: 'Bug reporting',
      },
      {
        link: '/terms/terms-of-use/terms-of-use',
        text: 'Terms of Use',
      },
    ],
  },
];
