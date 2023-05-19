import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Intergalactic',
  description: 'Design system',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          {
            text: 'Get started',
            collapsed: true,
            items: [
              {
                link: 'get-started-guide/dev-starter-guide/dev-starter-guide',
                text: 'For developers',
              },
              {
                link: 'get-started-guide/dis-starter-guide/dis-starter-guide',
                text: 'For designers',
              },
              {
                link: 'get-started-guide/work-figma/work-figma',
                text: 'Figma libraries',
              },
            ],
          },
          {
            text: 'Principles',
            collapsed: true,
            items: [
              {
                link: 'core-principles/a11y/a11y',
                text: 'Accessibility',
                collapsed: true,
                items: [
                  {
                    link: 'core-principles/a11y/a11y-general',
                    text: 'Development requirements',
                  },
                  {
                    link: 'core-principles/a11y/a11y-keyboard',
                    text: 'Keyboard support',
                  },
                  {
                    link: 'core-principles/a11y/a11y-design',
                    text: 'Design requirements',
                  },
                ],
              },
              {
                link: 'core-principles/principles/principles',
                text: 'Design principles',
              },
              {
                link: 'core-principles/motion-principles-guide/motion-principles-guide',
                text: 'Motion',
              },
              {
                link: 'core-principles/visual-loudness-scale/visual-loudness-scale',
                text: 'Visual loudness scale',
              },
            ],
          },
          {
            text: 'Style',
            collapsed: true,
            items: [
              {
                link: 'style/design-tokens/design-tokens',
                text: 'Design tokens',
                collapsed: true,
                items: [
                  {
                    link: 'style/design-tokens/design-tokens-usage',
                    text: 'Usage in design',
                  },
                  {
                    link: 'style/design-tokens/design-tokens-usage-development',
                    text: 'Usage in development',
                  },
                  {
                    link: 'style/design-tokens/design-tokens-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'style/icon/icon',
                text: 'Icon',
                collapsed: true,
                items: [
                  {
                    link: 'style/icon/icon-old',
                    text: 'Old icons',
                  },
                  {
                    link: 'style/icon/icon-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'style/icon/icon-api',
                    text: 'API',
                  },
                  {
                    link: 'style/icon/icon-code',
                    text: 'Example',
                  },
                  {
                    link: 'style/icon/icon-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'style/illustration/illustration',
                text: 'Illustration',
                collapsed: true,
                items: [
                  {
                    link: 'style/illustration/illustration-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'style/illustration/illustration-code',
                    text: 'Example',
                  },
                  {
                    link: 'style/illustration/illustration-api',
                    text: 'API',
                  },
                  {
                    link: 'style/illustration/illustration-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'style/typography/typography',
                text: 'Typography',
                collapsed: true,
                items: [
                  {
                    link: 'style/typography/typography-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'style/typography/typography-api',
                    text: 'API',
                  },
                  {
                    link: 'style/typography/typography-code',
                    text: 'Example',
                  },
                  {
                    link: 'style/typography/typography-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'style/css-injection/css-injection',
                text: 'CSS Injection',
                collapsed: true,
                items: [
                  {
                    link: 'style/css-injection/css-injection-local',
                    text: 'Local CSS Injection',
                  },
                  {
                    link: 'style/css-injection/css-injection-global',
                    text: 'Global CSS Injection',
                  },
                ],
              },
            ],
          },
          {
            text: 'Layout',
            collapsed: true,
            items: [
              {
                link: 'layout/breakpoints/breakpoints',
                text: 'Breakpoints',
                collapsed: true,
                items: [
                  {
                    link: 'layout/breakpoints/breakpoints-api',
                    text: 'API',
                  },
                  {
                    link: 'layout/breakpoints/breakpoints-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'layout/grid-system/grid-system',
                text: 'Grid and page layout',
                collapsed: true,
                items: [
                  {
                    link: 'layout/grid-system/grid-api',
                    text: 'API',
                  },
                  {
                    link: 'layout/grid-system/grid-code',
                    text: 'Grid system',
                  },
                  {
                    link: 'layout/grid-system/grid-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'layout/box-system/box-system',
                text: 'Flex-box and spacing system',
                collapsed: true,
                items: [
                  {
                    link: 'layout/box-system/box-api',
                    text: 'API',
                  },
                  {
                    link: 'layout/box-system/box-changelog',
                    text: 'Changelog',
                  },
                ],
              },
            ],
          },
          {
            text: 'Components',
            collapsed: true,
            items: [
              {
                link: 'components/accordion/accordion',
                text: 'Accordion',
                collapsed: true,
                items: [
                  {
                    link: 'components/accordion/accordion-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/accordion/accordion-api',
                    text: 'API',
                  },
                  {
                    link: 'components/accordion/accordion-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/accordion/accordion-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/auto-suggest/auto-suggest',
                text: 'AutoSuggest',
                collapsed: true,
                items: [
                  {
                    link: 'components/auto-suggest/auto-suggest-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/auto-suggest/auto-suggest-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'components/badge/badge',
                text: 'Badge',
                collapsed: true,
                items: [
                  {
                    link: 'components/badge/badge-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/badge/badge-api',
                    text: 'API',
                  },
                  {
                    link: 'components/badge/badge-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/badge/badge-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/breadcrumbs/breadcrumbs',
                text: 'Breadcrumbs',
                collapsed: true,
                items: [
                  {
                    link: 'components/breadcrumbs/breadcrumbs-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/breadcrumbs/breadcrumbs-api',
                    text: 'API',
                  },
                  {
                    link: 'components/breadcrumbs/breadcrumbs-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/breadcrumbs/breadcrumbs-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/button/button',
                text: 'Button',
                collapsed: true,
                items: [
                  {
                    link: 'components/button/button-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/button/button-api',
                    text: 'API',
                  },
                  {
                    link: 'components/button/button-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/button/button-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/card/card',
                text: 'Card',
                collapsed: true,
                items: [
                  {
                    link: 'components/card/card-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/card/card-api',
                    text: 'API',
                  },
                  {
                    link: 'components/card/card-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/card/card-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/carousel/carousel',
                text: 'Carousel',
                collapsed: true,
                items: [
                  {
                    link: 'components/carousel/carousel-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/carousel/carousel-api',
                    text: 'API',
                  },
                  {
                    link: 'components/carousel/carousel-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/carousel/carousel-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/checkbox/checkbox',
                text: 'Checkbox',
                collapsed: true,
                items: [
                  {
                    link: 'components/checkbox/checkbox-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/checkbox/checkbox-api',
                    text: 'API',
                  },
                  {
                    link: 'components/checkbox/checkbox-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/checkbox/checkbox-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/color-picker/color-picker',
                text: 'ColorPicker',
                collapsed: true,
                items: [
                  {
                    link: 'components/color-picker/color-picker-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/color-picker/color-picker-api',
                    text: 'API',
                  },
                  {
                    link: 'components/color-picker/color-picker-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/color-picker/color-picker-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/counter/counter',
                text: 'Counter',
                collapsed: true,
                items: [
                  {
                    link: 'components/counter/counter-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/counter/counter-api',
                    text: 'API',
                  },
                  {
                    link: 'components/counter/counter-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/counter/counter-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/date-picker/date-picker',
                text: 'DatePicker',
                collapsed: true,
                items: [
                  {
                    link: 'components/date-picker/date-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/date-picker/date-api',
                    text: 'API',
                  },
                  {
                    link: 'components/date-picker/date-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/date-picker/date-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/divider/divider',
                text: 'Divider',
                collapsed: true,
                items: [
                  {
                    link: 'components/divider/divider-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/divider/divider-api',
                    text: 'API',
                  },
                  {
                    link: 'components/divider/divider-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/dot/dot',
                text: 'Dot',
                collapsed: true,
                items: [
                  {
                    link: 'components/dot/dot-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/dot/dot-api',
                    text: 'API',
                  },
                  {
                    link: 'components/dot/dot-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/dot/dot-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/drag-and-drop/drag-and-drop',
                text: 'Drag and drop',
                collapsed: true,
                items: [
                  {
                    link: 'components/drag-and-drop/drag-and-drop-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/drag-and-drop/drag-and-drop-api',
                    text: 'API',
                  },
                  {
                    link: 'components/drag-and-drop/drag-and-drop-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/drag-and-drop/drag-and-drop-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/dropdown/dropdown',
                text: 'Dropdown',
                collapsed: true,
                items: [
                  {
                    link: 'components/dropdown/dropdown-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/dropdown/dropdown-api',
                    text: 'API',
                  },
                  {
                    link: 'components/dropdown/dropdown-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/dropdown/dropdown-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/dropdown-menu/dropdown-menu',
                text: 'DropdownMenu',
                collapsed: true,
                items: [
                  {
                    link: 'components/dropdown-menu/dropdown-menu-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/dropdown-menu/dropdown-menu-api',
                    text: 'API',
                  },
                  {
                    link: 'components/dropdown-menu/dropdown-menu-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/dropdown-menu/dropdown-menu-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/ellipsis/ellipsis',
                text: 'Ellipsis',
                collapsed: true,
                items: [
                  {
                    link: 'components/ellipsis/ellipsis-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/ellipsis/ellipsis-api',
                    text: 'API',
                  },
                  {
                    link: 'components/ellipsis/ellipsis-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/ellipsis/ellipsis-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/feature-popover/feature-popover',
                text: 'FeaturePopover',
                collapsed: true,
                items: [
                  {
                    link: 'components/feature-popover/feature-popover-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/feature-popover/feature-popover-api',
                    text: 'API',
                  },
                  {
                    link: 'components/feature-popover/feature-popover-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/feature-popover/feature-popover-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/feedback/feedback',
                text: 'Feedback',
                collapsed: true,
                items: [
                  {
                    link: 'components/feedback/feedback-form-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/feedback/feedback-form-api',
                    text: 'API',
                  },
                  {
                    link: 'components/feedback/feedback-form-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/feedback/feedback-form-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/flags/flags',
                text: 'Flags',
                collapsed: true,
                items: [
                  {
                    link: 'components/flags/flags-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/flags/flags-api',
                    text: 'API',
                  },
                  {
                    link: 'components/flags/flags-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/filter-trigger/filter-trigger',
                text: 'FilterTrigger',
                collapsed: true,
                items: [
                  {
                    link: 'components/filter-trigger/filter-trigger-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/filter-trigger/filter-trigger-api',
                    text: 'API',
                  },
                  {
                    link: 'components/filter-trigger/filter-trigger-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/filter-trigger/filter-trigger-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/fullscreen-modal/fullscreen-modal',
                text: 'FullscreenModal',
                collapsed: true,
                items: [
                  {
                    link: 'components/fullscreen-modal/fullscreen-modal-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/fullscreen-modal/fullscreen-modal-api',
                    text: 'API',
                  },
                  {
                    link: 'components/fullscreen-modal/fullscreen-modal-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/fullscreen-modal/fullscreen-modal-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/inline-edit/inline-edit',
                text: 'InlineEdit',
                collapsed: true,
                items: [
                  {
                    link: 'components/inline-edit/inline-edit-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/inline-edit/inline-edit-api',
                    text: 'API',
                  },
                  {
                    link: 'components/inline-edit/inline-edit-example',
                    text: 'Example',
                  },
                  {
                    link: 'components/inline-edit/inline-edit-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/inline-input/inline-input',
                text: 'InlineInput',
                collapsed: true,
                items: [
                  {
                    link: 'components/inline-input/inline-input-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/inline-input/inline-input-api',
                    text: 'API',
                  },
                  {
                    link: 'components/inline-input/inline-input-example',
                    text: 'Example',
                  },
                  {
                    link: 'components/inline-input/inline-input-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/input/input',
                text: 'Input',
                collapsed: true,
                items: [
                  {
                    link: 'components/input/input-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/input/input-api',
                    text: 'API',
                  },
                  {
                    link: 'components/input/input-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/input/input-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/input-mask/input-mask',
                text: 'InputMask',
                collapsed: true,
                items: [
                  {
                    link: 'components/input-mask/input-mask-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/input-mask/input-mask-api',
                    text: 'API',
                  },
                  {
                    link: 'components/input-mask/input-mask-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/input-mask/input-mask-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/input-number/input-number',
                text: 'InputNumber & InputRange',
                collapsed: true,
                items: [
                  {
                    link: 'components/input-number/input-number-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/input-number/input-number-api',
                    text: 'API',
                  },
                  {
                    link: 'components/input-number/input-number-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/input-number/input-number-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/input-phone/input-phone',
                text: 'InputPhone',
                collapsed: true,
                items: [
                  {
                    link: 'components/input-phone/input-phone-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/input-phone/input-phone-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'components/input-tags/input-tags',
                text: 'InputTags',
                collapsed: true,
                items: [
                  {
                    link: 'components/input-tags/input-tags-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/input-tags/input-tags-api',
                    text: 'API',
                  },
                  {
                    link: 'components/input-tags/input-tags-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/input-tags/input-tags-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/link/link',
                text: 'Link',
                collapsed: true,
                items: [
                  {
                    link: 'components/link/link-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/link/link-api',
                    text: 'API',
                  },
                  {
                    link: 'components/link/link-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/link/link-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/modal/modal',
                text: 'Modal',
                collapsed: true,
                items: [
                  {
                    link: 'components/modal/modal-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/modal/modal-api',
                    text: 'API',
                  },
                  {
                    link: 'components/modal/modal-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/modal/modal-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/notice/notice',
                text: 'Notice',
                collapsed: true,
                items: [
                  {
                    link: 'components/notice/notice-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/notice/notice-api',
                    text: 'API',
                  },
                  {
                    link: 'components/notice/notice-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/notice/notice-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/notice-bubble/notice-bubble',
                text: 'NoticeBubble',
                collapsed: true,
                items: [
                  {
                    link: 'components/notice-bubble/notice-bubble-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/notice-bubble/notice-bubble-api',
                    text: 'API',
                  },
                  {
                    link: 'components/notice-bubble/notice-bubble-example',
                    text: 'Example',
                  },
                  {
                    link: 'components/notice-bubble/notice-bubble-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/notice-global/notice-global',
                text: 'NoticeGlobal',
                collapsed: true,
                items: [
                  {
                    link: 'components/notice-global/notice-global-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/notice-global/notice-global-api',
                    text: 'API',
                  },
                  {
                    link: 'components/notice-global/notice-global-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/notice-global/notice-global-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/pagination/pagination',
                text: 'Pagination',
                collapsed: true,
                items: [
                  {
                    link: 'components/pagination/pagination-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/pagination/pagination-api',
                    text: 'API',
                  },
                  {
                    link: 'components/pagination/pagination-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/pagination/pagination-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/pills/pills',
                text: 'Pills',
                collapsed: true,
                items: [
                  {
                    link: 'components/pills/pills-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/pills/pills-api',
                    text: 'API',
                  },
                  {
                    link: 'components/pills/pills-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/pills/pills-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/product-head/product-head',
                text: 'ProductHead',
                collapsed: true,
                items: [
                  {
                    link: 'components/product-head/product-head-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/product-head/product-head-api',
                    text: 'API',
                  },
                  {
                    link: 'components/product-head/product-head-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/product-head/product-head-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/progress-bar/progress-bar',
                text: 'ProgressBar',
                collapsed: true,
                items: [
                  {
                    link: 'components/progress-bar/progress-bar-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/progress-bar/progress-bar-api',
                    text: 'API',
                  },
                  {
                    link: 'components/progress-bar/progress-bar-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/progress-bar/progress-bar-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/radio/radio',
                text: 'Radio',
                collapsed: true,
                items: [
                  {
                    link: 'components/radio/radio-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/radio/radio-api',
                    text: 'API',
                  },
                  {
                    link: 'components/radio/radio-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/radio/radio-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/select/select',
                text: 'Select / Multiselect',
                collapsed: true,
                items: [
                  {
                    link: 'components/select/select-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/select/select-api',
                    text: 'API',
                  },
                  {
                    link: 'components/select/select-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/select/select-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/scroll-area/scroll-area',
                text: 'ScrollArea',
                collapsed: true,
                items: [
                  {
                    link: 'components/scroll-area/scroll-area-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/scroll-area/scroll-area-api',
                    text: 'API',
                  },
                  {
                    link: 'components/scroll-area/scroll-area-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/scroll-area/scroll-area-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/side-panel/side-panel',
                text: 'SidePanel',
                collapsed: true,
                items: [
                  {
                    link: 'components/side-panel/side-panel-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/side-panel/side-panel-api',
                    text: 'API',
                  },
                  {
                    link: 'components/side-panel/side-panel-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/side-panel/side-panel-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/skeleton/skeleton',
                text: 'Skeleton',
                collapsed: true,
                items: [
                  {
                    link: 'components/skeleton/skeleton-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/skeleton/skeleton-api',
                    text: 'API',
                  },
                  {
                    link: 'components/skeleton/skeleton-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/skeleton/skeleton-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/slider/slider',
                text: 'Slider',
                collapsed: true,
                items: [
                  {
                    link: 'components/slider/slider-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/slider/slider-api',
                    text: 'API',
                  },
                  {
                    link: 'components/slider/slider-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/slider/slider-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/spin/spin',
                text: 'Spin',
                collapsed: true,
                items: [
                  {
                    link: 'components/spin/spin-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/spin/spin-api',
                    text: 'API',
                  },
                  {
                    link: 'components/spin/spin-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/spin-container/spin-container',
                text: 'SpinContainer',
                collapsed: true,
                items: [
                  {
                    link: 'components/spin-container/spin-container-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/spin-container/spin-container-api',
                    text: 'API',
                  },
                  {
                    link: 'components/spin-container/spin-container-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/spin-container/spin-container-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/sticky/sticky',
                text: 'Sticky',
                collapsed: true,
                items: [
                  {
                    link: 'components/sticky/sticky-api',
                    text: 'API',
                  },
                  {
                    link: 'components/sticky/sticky-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/switch/switch',
                text: 'Switch',
                collapsed: true,
                items: [
                  {
                    link: 'components/switch/switch-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/switch/switch-api',
                    text: 'API',
                  },
                  {
                    link: 'components/switch/switch-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/switch/switch-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/tab-line/tab-line',
                text: 'TabLine',
                collapsed: true,
                items: [
                  {
                    link: 'components/tab-line/tab-line-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/tab-line/tab-line-api',
                    text: 'API',
                  },
                  {
                    link: 'components/tab-line/tab-line-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/tab-line/tab-line-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/tab-panel/tab-panel',
                text: 'TabPanel',
                collapsed: true,
                items: [
                  {
                    link: 'components/tab-panel/tab-panel-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/tab-panel/tab-panel-api',
                    text: 'API',
                  },
                  {
                    link: 'components/tab-panel/tab-panel-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/tab-panel/tab-panel-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/tag/tag',
                text: 'Tag',
                collapsed: true,
                items: [
                  {
                    link: 'components/tag/tag-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/tag/tag-api',
                    text: 'API',
                  },
                  {
                    link: 'components/tag/tag-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/tag/tag-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/textarea/textarea',
                text: 'Textarea',
                collapsed: true,
                items: [
                  {
                    link: 'components/textarea/textarea-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/textarea/textarea-api',
                    text: 'API',
                  },
                  {
                    link: 'components/textarea/textarea-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/textarea/textarea-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/time-picker/time-picker',
                text: 'TimePicker',
                collapsed: true,
                items: [
                  {
                    link: 'components/time-picker/time-picker-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/time-picker/time-picker-api',
                    text: 'API',
                  },
                  {
                    link: 'components/time-picker/time-picker-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/time-picker/time-picker-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/tooltip/tooltip',
                text: 'Tooltip',
                collapsed: true,
                items: [
                  {
                    link: 'components/tooltip/tooltip-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/tooltip/tooltip-api',
                    text: 'API',
                  },
                  {
                    link: 'components/tooltip/tooltip-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/tooltip/tooltip-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/widget-empty/widget-empty',
                text: 'Widget empty state',
                collapsed: true,
                items: [
                  {
                    link: 'components/widget-empty/widget-empty-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/widget-empty/widget-empty-api',
                    text: 'API',
                  },
                  {
                    link: 'components/widget-empty/widget-empty-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/widget-empty/widget-empty-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'components/wizard/wizard',
                text: 'Wizard',
                collapsed: true,
                items: [
                  {
                    link: 'components/wizard/wizard-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'components/wizard/wizard-api',
                    text: 'API',
                  },
                  {
                    link: 'components/wizard/wizard-code',
                    text: 'Example',
                  },
                  {
                    link: 'components/wizard/wizard-changelog',
                    text: 'Changelog',
                  },
                ],
              },
            ],
          },
          {
            text: 'Charts',
            collapsed: true,
            items: [
              {
                link: 'data-display/chart-showcase/chart-showcase',
                text: 'Charts showcase',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/chart-showcase/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/d3-chart/d3-chart',
                text: 'D3 chart principles',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/d3-chart/d3-chart-code',
                    text: 'Concept and code',
                    collapsed: true,
                    items: [
                      {
                        link: 'data-display/d3-chart/d3-chart-api',
                        text: 'API',
                      },
                      {
                        link: 'data-display/d3-chart/d3-chart-a11y',
                        text: 'A11y',
                      },
                      {
                        link: 'data-display/d3-chart/d3-chart-changelog',
                        text: 'Changelog',
                      },
                    ],
                  },
                  {
                    link: 'data-display/d3-chart/d3-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/d3-chart/d3-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/d3-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/color-palette/color-palette',
                text: 'Color palette',
              },
              {
                link: 'data-display/chart-controls/chart-controls',
                text: 'Chart controls',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/chart-controls/chart-control-code',
                    text: 'Example',
                  },
                  {
                    link: 'data-display/chart-controls/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/chart-legend/chart-legend',
                text: 'Chart legend',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/chart-legend/chart-legend-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/chart-legend/chart-legend-code',
                    text: 'Example',
                  },
                  {
                    link: 'data-display/chart-legend/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/notes/notes',
                text: 'Notes module',
              },
              {
                link: 'data-display/area-chart/area-chart',
                text: 'Area chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/area-chart/area-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/area-chart/area-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/area-chart/area-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/area-chart/area-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/area-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/stacked-area-chart/stacked-area-chart',
                text: 'Stacked area chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/stacked-area-chart/stacked-area-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/stacked-area-chart/stacked-area-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/stacked-area-chart/stacked-area-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/stacked-area-chart/stacked-area-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/stacked-area-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/bar-chart/bar-chart',
                text: 'Bar chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/bar-chart/bar-chart-vertical',
                    text: 'Vertical bar chart',
                  },
                  {
                    link: 'data-display/bar-chart/bar-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/bar-chart/bar-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/bar-chart/bar-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/bar-chart/bar-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/bar-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/stacked-bar-chart/stacked-bar-chart',
                text: 'Stacked bar chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/stacked-bar-chart/stacked-bar-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/stacked-bar-chart/stacked-bar-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/stacked-bar-chart/stacked-bar-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/stacked-bar-chart/stacked-bar-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/stacked-bar-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/bar-horizontal/bar-horizontal',
                text: 'Horizontal bar chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/bar-horizontal/bar-horizontal-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/bar-horizontal/bar-horizontal-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/bar-horizontal/bar-horizontal-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/bar-horizontal/bar-horizontal-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/bar-horizontal/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/stacked-horizontal-bar/stacked-horizontal-bar',
                text: 'Stacked horizontal bar chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/stacked-horizontal-bar/stacked-horizontal-bar-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/stacked-horizontal-bar/stacked-horizontal-bar-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/stacked-horizontal-bar/stacked-horizontal-bar-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/stacked-horizontal-bar/stacked-horizontal-bar-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/stacked-horizontal-bar/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/bubble-chart/bubble-chart',
                text: 'Bubble chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/bubble-chart/bubble-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/bubble-chart/bubble-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/bubble-chart/bubble-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/bubble-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/donut-chart/donut-chart',
                text: 'Donut / Pie chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/donut-chart/donut-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/donut-chart/donut-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/donut-chart/donut-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/donut-chart/donut-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/donut-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/histogram-chart/histogram-chart',
                text: 'Histogram chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/histogram-chart/histogram-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/histogram-chart/histogram-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/histogram-chart/histogram-chart-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/histogram-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/line-chart/line-chart',
                text: 'Line chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/line-chart/line-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/line-chart/line-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/line-chart/line-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/line-chart/line-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/line-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/radar-chart/radar-chart',
                text: 'Radar chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/radar-chart/radar-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/radar-chart/radar-chart-code',
                    text: 'Examples',
                  },
                ],
              },
              {
                link: 'data-display/radial-tree-chart/radial-tree-chart',
                text: 'Radial Tree chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/radial-tree-chart/radial-tree-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/radial-tree-chart/radial-tree-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/radial-tree-chart/radial-tree-chart-d3-examples',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/radial-tree-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/scatterplot-chart/scatterplot-chart',
                text: 'Scatterplot chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/scatterplot-chart/scatterplot-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/scatterplot-chart/scatterplot-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/scatterplot-chart/scatterplot-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/scatterplot-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/venn-chart/venn-chart',
                text: 'Venn chart',
                collapsed: true,
                items: [
                  {
                    link: 'data-display/venn-chart/venn-chart-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'data-display/venn-chart/venn-chart-api',
                    text: 'API',
                  },
                  {
                    link: 'data-display/venn-chart/venn-chart-d3-code',
                    text: 'Examples',
                  },
                  {
                    link: 'data-display/venn-chart/venn-chart-recharts-code',
                    text: 'Legacy examples',
                  },
                  {
                    link: 'data-display/venn-chart/d3-chart-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'data-display/alluvial-chart/alluvial-chart',
                text: 'Alluvial chart',
              },
              {
                link: 'data-display/choropleth-map/choropleth-map',
                text: 'Choropleth map',
              },
              {
                link: 'data-display/funnel-chart/funnel-chart',
                text: 'Funnel chart',
              },
              {
                link: 'data-display/heatmap/heatmap',
                text: 'Heatmap',
              },
              {
                link: 'data-display/kagi-chart/kagi-chart',
                text: 'Kagi chart',
              },
              {
                link: 'data-display/lollipop-chart/lollipop-chart',
                text: 'Lollipop chart',
              },
              {
                link: 'data-display/polar-chart/polar-chart',
                text: 'Polar chart',
              },
              {
                link: 'data-display/quadrant-chart/quadrant-chart',
                text: 'Quadrant chart',
              },
            ],
          },
          {
            text: 'Table',
            collapsed: true,
            items: [
              {
                link: 'table-group/table-showcase/table-showcase',
                text: 'Table showcase',
              },
              {
                link: 'table-group/table/table',
                text: 'Table principles',
                collapsed: true,
                items: [
                  {
                    link: 'table-group/table/table-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'table-group/table/table-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'table-group/data-table/data-table',
                text: 'DataTable code and API',
                collapsed: true,
                items: [
                  {
                    link: 'table-group/data-table/data-table-api',
                    text: 'API',
                  },
                  {
                    link: 'table-group/data-table/data-table-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'table-group/table-old/table-old',
                text: 'Table code and API',
                collapsed: true,
                items: [
                  {
                    link: 'table-group/table-old/table-old-api',
                    text: 'API',
                  },
                  {
                    link: 'table-group/table-old/table-old-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'table-group/table-primary/table-primary',
                text: 'Primary table',
                collapsed: true,
                items: [
                  {
                    link: 'table-group/table-primary/table-primary-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'table-group/table-secondary/table-secondary',
                text: 'Secondary table',
                collapsed: true,
                items: [
                  {
                    link: 'table-group/table-secondary/table-secondary-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'table-group/table-controls/table-controls',
                text: 'Table controls',
              },
              {
                link: 'table-group/table-states/table-states',
                text: 'Table states',
              },
            ],
          },
          {
            text: 'Filters',
            collapsed: true,
            items: [
              {
                link: 'filter-group/filter-rules/filter-rules',
                text: 'Filter common rules',
              },
              {
                link: 'filter-group/advanced-filters/advanced-filters',
                text: 'Advanced filters',
                collapsed: true,
                items: [
                  {
                    link: 'filter-group/advanced-filters/advanced-filters-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'filter-group/filter-category/filter-category',
                text: 'Category',
              },
              {
                link: 'filter-group/filter-cp-cd-cpc/filter-cp-cd-cpc',
                text: 'Click Potential, Competitive Density, CPC',
                collapsed: true,
                items: [
                  {
                    link: 'filter-group/filter-cp-cd-cpc/filter-cp-cd-cpc-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'filter-group/filter-include-exclude/filter-include-exclude',
                text: 'Include/Exclude keywords',
                collapsed: true,
                items: [
                  {
                    link: 'filter-group/filter-include-exclude/filter-include-exclude-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'filter-group/filter-kd-positions-volume/filter-kd-positions-volume',
                text: 'Keyword Difficulty, Positions, Volume',
                collapsed: true,
                items: [
                  {
                    link: 'filter-group/filter-kd-positions-volume/filter-kd-position-volume-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'filter-group/filter-search/filter-search',
                text: 'Filter Search',
                collapsed: true,
                items: [
                  {
                    link: 'filter-group/filter-search/filter-search-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'filter-group/filter-serp-features/filter-serp-features',
                text: 'SERP Features',
              },
              {
                link: 'filter-group/filter-tags/filter-tags',
                text: 'Tags',
              },
            ],
          },
          {
            text: 'UX patterns',
            collapsed: true,
            items: [
              {
                link: 'patterns/modal-content/modal-content',
                text: 'Content in modal window',
              },
              {
                link: 'patterns/confirm-dialog/confirm-dialog',
                text: 'Confirmation modal dialog',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/confirm-dialog/confirm-dialog-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/empty-page/empty-page',
                text: 'Empty page',
              },
              {
                link: 'patterns/global-errors/global-errors',
                text: 'Error message',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/global-errors/global-errors-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'patterns/global-errors/global-errors-api',
                    text: 'API',
                  },
                  {
                    link: 'patterns/global-errors/global-errors-code',
                    text: 'Example',
                  },
                  {
                    link: 'patterns/global-errors/global-errors-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'patterns/export/export',
                text: 'Export',
              },
              {
                link: 'patterns/feedback-yes-no/feedback-yes-no',
                text: 'FeedbackYesNo',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/feedback-yes-no/feedback-yes-no-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'patterns/feedback-yes-no/feedback-yes-no-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/form/form',
                text: 'Form',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/form/form-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'patterns/form/form-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/informer/informer',
                text: 'Informer',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/informer/informer-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/links-order/links-order',
                text: 'Links order in ProductHead',
              },
              {
                link: 'patterns/loading-states/loading-states',
                text: 'Loading states',
              },
              {
                link: 'patterns/project-create/project-create',
                text: 'ProjectCreate',
              },
              {
                link: 'patterns/project-select/project-select',
                text: 'ProjectSelect',
              },
              {
                link: 'patterns/success-state/success-state',
                text: 'Success state',
              },
              {
                link: 'patterns/summary/summary',
                text: 'Summary',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/summary/summary-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/validation-form/validation-form',
                text: 'Validation',
                collapsed: true,
                items: [
                  {
                    link: 'patterns/validation-form/validation-form-a11y',
                    text: 'A11y',
                  },
                  {
                    link: 'patterns/validation-form/validation-form-code',
                    text: 'Example',
                  },
                ],
              },
              {
                link: 'patterns/web-performance/web-performance',
                text: 'Web-performance',
              },
            ],
          },
          {
            text: 'Product emails',
            collapsed: true,
            items: [
              {
                link: 'product-emails/grid-email/grid-email',
                text: 'Email templates & grid',
                collapsed: true,
                items: [
                  {
                    link: 'product-emails/grid-email/grid-email-code',
                    text: 'Email grid',
                  },
                  {
                    link: 'product-emails/grid-email/grid-email-readme',
                    text: 'Readme',
                  },
                  {
                    link: 'product-emails/grid-email/grid-email-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'product-emails/core-email/core-email',
                text: 'Core email colors',
              },
              {
                link: 'product-emails/button-email/button-email',
                text: 'Email button',
              },
              {
                link: 'product-emails/badge-email/badge-email',
                text: 'Email badge and tag',
              },
              {
                link: 'product-emails/divider-email/divider-email',
                text: 'Divider for emails',
              },
              {
                link: 'product-emails/typography-email/typography-email',
                text: 'Email typography',
              },
              {
                link: 'product-emails/table-email/table-email',
                text: 'Email table',
              },
              {
                link: 'product-emails/notice-email/notice-email',
                text: 'Email notice',
              },
              {
                link: 'product-emails/summary-email/summary-email',
                text: 'Email summary',
              },
            ],
          },
          {
            text: 'Utils 🛠',
            collapsed: true,
            items: [
              {
                link: 'utils/code-mod/code-mod',
                text: 'Codemod',
                collapsed: true,
                items: [
                  {
                    link: 'utils/code-mod/code-mod-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'utils/neighbor-location/neighbor-location',
                text: 'NeighborLocation',
                collapsed: true,
                items: [
                  {
                    link: 'utils/neighbor-location/neighbor-location-api',
                    text: 'API',
                  },
                  {
                    link: 'utils/neighbor-location/neighbor-location-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'utils/popper/popper',
                text: 'Popper',
                collapsed: true,
                items: [
                  {
                    link: 'utils/popper/popper-api',
                    text: 'API',
                  },
                  {
                    link: 'utils/popper/popper-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'utils/portal/portal',
                text: 'Portal',
                collapsed: true,
                items: [
                  {
                    link: 'utils/portal/portal-api',
                    text: 'API',
                  },
                  {
                    link: 'utils/portal/portal-changelog',
                    text: 'Changelog',
                  },
                ],
              },
              {
                link: 'utils/i18n/i18n',
                text: 'i18n',
              },
            ],
          },
          {
            text: 'Docs',
            collapsed: true,
            items: [
              {
                link: 'internal/production',
                text: 'For production',
              },
              {
                link: 'internal/release/release',
                text: 'Changelogs',
                collapsed: true,
                items: [
                  {
                    link: 'internal/release/release-about',
                    text: 'About',
                  },
                ],
              },
              {
                link: 'internal/migration-guide',
                text: 'Migration guide (RU)',
              },
              {
                link: 'internal/roadmap/roadmap',
                text: 'Roadmap',
              },
              {
                link: 'internal/extension/extension',
                text: 'Chrome extension',
              },
            ],
          },
          {
            text: 'Bugs and requests',
            collapsed: true,
            items: [
              {
                link: 'bug-reporting/report-bug/report-bug',
                text: 'Bug reporting',
              },
            ],
          },
          {
            text: 'Terms',
            collapsed: true,
            items: [
              {
                link: 'terms/privacy/privacy',
                text: 'Privacy Policy',
              },
              {
                link: 'terms/terms-of-use/terms-of-use',
                text: 'Terms of Use',
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
