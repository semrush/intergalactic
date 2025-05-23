---
title: Components showcase
---

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  accordion: {
    title: 'Accordion',
    route: '/intergalactic/components/accordion/accordion',
    disabled: false,
    type: 'components',
  },
  autoSuggest: {
    title: 'AutoSuggest',
    route: '/intergalactic/components/auto-suggest/auto-suggest',
    disabled: false,
    type: 'components',
  },
  badge: {
    title: 'Badge',
    route: '/intergalactic/components/badge/badge',
    disabled: false,
    type: 'components',
  },
  baseTrigger: {
    title: 'BaseTrigger',
    route: '/intergalactic/components/base-trigger/base-trigger',
    disabled: false,
    type: 'components',
  },
  breadcrumbs: {
    title: 'Breadcrumbs',
    route: '/intergalactic/components/breadcrumbs/breadcrumbs',
    type: 'components',
  },
    bulkTextarea: {
    title: 'BulkTextarea',
    route: '/intergalactic/components/bulk-textarea/bulk-textarea',
    disabled: false,
    type: 'components',
  },
  button: {
    title: 'Button',
    route: '/intergalactic/components/button/button',
    disabled: false,
    type: 'components',
  },
  card: {
    title: 'Card',
    route: '/intergalactic/components/card/card',
    disabled: false,
    type: 'components',
  },
  carousel: {
    title: 'Carousel',
    route: '/intergalactic/components/carousel/carousel',
    disabled: false,
    type: 'components',
  },
  checkbox: {
    title: 'Checkbox',
    route: '/intergalactic/components/checkbox/checkbox',
    disabled: false,
    type: 'components',
  },
  colorPicker: {
    title: 'ColorPicker',
    route: '/intergalactic/components/color-picker/color-picker',
    disabled: false,
    type: 'components',
  },
  counter: {
    title: 'Counter',
    route: '/intergalactic/components/counter/counter',
    disabled: false,
    type: 'components',
  },
  datePicker: {
    title: 'DatePicker',
    route: '/intergalactic/components/date-picker/date-picker',
    disabled: false,
    type: 'components',
  },
  divider: {
    title: 'Divider',
    route: '/intergalactic/components/divider/divider',
    disabled: false,
    type: 'components',
  },
  dot: {
    title: 'Dot',
    route: '/intergalactic/components/dot/dot',
    disabled: false,
    type: 'components',
  },
  dragAndDrop: {
    title: 'Drag and drop',
    route: '/intergalactic/components/drag-and-drop/drag-and-drop',
    disabled: false,
    type: 'components',
  },
  dropdown: {
    title: 'Dropdown',
    route: '/intergalactic/components/dropdown/dropdown',
    disabled: false,
    type: 'components',
  },
  dropdownMenu: {
    title: 'DropdownMenu',
    route: '/intergalactic/components/dropdown-menu/dropdown-menu',
    disabled: false,
    type: 'components',
  },
  ellipsis: {
    title: 'Ellipsis',
    route: '/intergalactic/components/ellipsis/ellipsis',
    disabled: false,
    type: 'components',
  },
  featurePopover: {
    title: 'FeaturePopover',
    route: '/intergalactic/components/feature-popover/feature-popover',
    disabled: false,
    type: 'components',
  },
  feedback: {
    title: 'Feedback',
    route: '/intergalactic/components/feedback/feedback',
    disabled: false,
    type: 'components',
  },
  filterTrigger: {
    title: 'FilterTrigger',
    route: '/intergalactic/components/filter-trigger/filter-trigger',
    disabled: false,
    type: 'components',
  },
  flags: {
    title: 'Flags',
    route: '/intergalactic/components/flags/flags',
    disabled: false,
    type: 'components',
  },
  fullscreenModal: {
    title: 'FullscreenModal',
    route: '/intergalactic/components/fullscreen-modal/fullscreen-modal',
    disabled: false,
    type: 'components',
  },
  inlineEdit: {
    title: 'InlineEdit',
    route: '/intergalactic/components/inline-edit/inline-edit',
    disabled: false,
    type: 'components',
  },
  inlineInput: {
    title: 'InlineInput',
    route: '/intergalactic/components/inline-input/inline-input',
    disabled: false,
    type: 'components',
  },
  input: {
    title: 'Input',
    route: '/intergalactic/components/input/input',
    disabled: false,
    type: 'components',
  },
  inputMask: {
    title: 'InputMask [deprecated]',
    route: '/intergalactic/components/input-mask/input-mask',
    disabled: false,
    type: 'components',
  },
  inputNumber: {
    title: 'InputNumber',
    route: '/intergalactic/components/input-number/input-number',
    disabled: false,
    type: 'components',
  },
  inputPhone: {
    title: 'InputPhone',
    route: '/intergalactic/components/input-phone/input-phone',
    disabled: false,
    type: 'components',
  },
  inputTags: {
    title: 'InputTags',
    route: '/intergalactic/components/input-tags/input-tags',
    disabled: false,
    type: 'components',
  },
  link: {
    title: 'Link',
    route: '/intergalactic/components/link/link',
    disabled: false,
    type: 'components',
  },
  modal: {
    title: 'Modal',
    route: '/intergalactic/components/modal/modal',
    disabled: false,
    type: 'components',
  },
  notice: {
    title: 'Notice',
    route: '/intergalactic/components/notice/notice',
    disabled: false,
    type: 'components',
  },
  noticeBubble: {
    title: 'NoticeBubble',
    route: '/intergalactic/components/notice-bubble/notice-bubble',
    disabled: false,
    type: 'components',
  },
  noticeGlobal: {
    title: 'NoticeGlobal',
    route: '/intergalactic/components/notice-global/notice-global',
    disabled: false,
    type: 'components',
  },
  pagination: {
    title: 'Pagination',
    route: '/intergalactic/components/pagination/pagination',
    disabled: false,
    type: 'components',
  },
  pills: {
    title: 'Pills',
    route: '/intergalactic/components/pills/pills',
    disabled: false,
    type: 'components',
  },
  productHead: {
    title: 'ProductHead',
    route: '/intergalactic/components/product-head/product-head',
    disabled: false,
    type: 'components',
  },
  progressBar: {
    title: 'ProgressBar',
    route: '/intergalactic/components/progress-bar/progress-bar',
    disabled: false,
    type: 'components',
  },
  radio: {
    title: 'Radio',
    route: '/intergalactic/components/radio/radio',
    disabled: false,
    type: 'components',
  },
  scrollArea: {
    title: 'ScrollArea',
    route: '/intergalactic/components/scroll-area/scroll-area',
    disabled: false,
    type: 'components',
  },
  select: {
    title: 'Select',
    route: '/intergalactic/components/select/select',
    disabled: false,
    type: 'components',
  },
  sidePanel: {
    title: 'SidePanel',
    route: '/intergalactic/components/side-panel/side-panel',
    disabled: false,
    type: 'components',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/intergalactic/components/skeleton/skeleton',
    disabled: false,
    type: 'components',
  },
  slider: {
    title: 'Slider',
    route: '/intergalactic/components/slider/slider',
    disabled: false,
    type: 'components',
  },
  spin: {
    title: 'Spin',
    route: '/intergalactic/components/spin/spin',
    disabled: false,
    type: 'components',
  },
  spinContainer: {
    title: 'SpinContainer',
    route: '/intergalactic/components/spin-container/spin-container',
    disabled: false,
    type: 'components',
  },
  switch: {
    title: 'Switch',
    route: '/intergalactic/components/switch/switch',
    disabled: false,
    type: 'components',
  },
  tabLine: {
    title: 'TabLine',
    route: '/intergalactic/components/tab-line/tab-line',
    disabled: false,
    type: 'components',
  },
  tabPanel: {
    title: 'TabPanel',
    route: '/intergalactic/components/tab-panel/tab-panel',
    disabled: false,
    type: 'components',
  },
  tag: {
    title: 'Tag',
    route: '/intergalactic/components/tag/tag',
    disabled: false,
    type: 'components',
  },
  textarea: {
    title: 'Textarea',
    route: '/intergalactic/components/textarea/textarea',
    disabled: false,
    type: 'components',
  },
  timePicker: {
    title: 'TimePicker',
    route: '/intergalactic/components/time-picker/time-picker',
    disabled: false,
    type: 'components',
  },
  tooltip: {
    title: 'Tooltip',
    route: '/intergalactic/components/tooltip/tooltip',
    disabled: false,
    type: 'components',
  },
  widgetEmpty: {
    title: 'WidgetEmpty',
    route: '/intergalactic/components/widget-empty/widget-empty',
    disabled: false,
    type: 'components',
  },
  wizard: {
    title: 'Wizard',
    route: '/intergalactic/components/wizard/wizard',
    disabled: false,
    type: 'components',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 160px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = Object.keys(group).map((el) => group[el]);

  return (
    <Box tag="ul" style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::
