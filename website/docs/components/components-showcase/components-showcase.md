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

import { Box } from '@semcore/base-components';

const group = {
  accordion: {
    title: 'Accordion',
    route: '../../components/accordion/accordion',
    disabled: false,
    type: 'components',
  },
  badge: {
    title: 'Badge',
    route: '../../components/badge/badge',
    disabled: false,
    type: 'components',
  },
  baseTrigger: {
    title: 'BaseTrigger',
    route: '../../components/base-trigger/base-trigger',
    disabled: false,
    type: 'components',
  },
  breadcrumbs: {
    title: 'Breadcrumbs',
    route: '../../components/breadcrumbs/breadcrumbs',
    type: 'components',
  },
    bulkTextarea: {
    title: 'BulkTextarea',
    route: '../../components/bulk-textarea/bulk-textarea',
    disabled: false,
    type: 'components',
  },
  button: {
    title: 'Button',
    route: '../../components/button/button',
    disabled: false,
    type: 'components',
  },
  card: {
    title: 'Card',
    route: '../../components/card/card',
    disabled: false,
    type: 'components',
  },
  carousel: {
    title: 'Carousel',
    route: '../../components/carousel/carousel',
    disabled: false,
    type: 'components',
  },
  checkbox: {
    title: 'Checkbox',
    route: '../../components/checkbox/checkbox',
    disabled: false,
    type: 'components',
  },
  colorPicker: {
    title: 'ColorPicker',
    route: '../../components/color-picker/color-picker',
    disabled: false,
    type: 'components',
  },
  counter: {
    title: 'Counter',
    route: '../../components/counter/counter',
    disabled: false,
    type: 'components',
  },
  datePicker: {
    title: 'DatePicker',
    route: '../../components/date-picker/date-picker',
    disabled: false,
    type: 'components',
  },
  divider: {
    title: 'Divider',
    route: '../../components/divider/divider',
    disabled: false,
    type: 'components',
  },
  dot: {
    title: 'Dot',
    route: '../../components/dot/dot',
    disabled: false,
    type: 'components',
  },
  dragAndDrop: {
    title: 'Drag and drop',
    route: '../../components/drag-and-drop/drag-and-drop',
    disabled: false,
    type: 'components',
  },
  dropdown: {
    title: 'Dropdown',
    route: '../../components/dropdown/dropdown',
    disabled: false,
    type: 'components',
  },
  dropdownMenu: {
    title: 'DropdownMenu',
    route: '../../components/dropdown-menu/dropdown-menu',
    disabled: false,
    type: 'components',
  },
  ellipsis: {
    title: 'Ellipsis',
    route: '../../components/ellipsis/ellipsis',
    disabled: false,
    type: 'components',
  },
  featurePopover: {
    title: 'FeaturePopover',
    route: '../../components/feature-popover/feature-popover',
    disabled: false,
    type: 'components',
  },
  feedback: {
    title: 'Feedback',
    route: '../../components/feedback-form/feedback-form',
    disabled: false,
    type: 'components',
  },
  filterTrigger: {
    title: 'FilterTrigger',
    route: '../../components/filter-trigger/filter-trigger',
    disabled: false,
    type: 'components',
  },
  flags: {
    title: 'Flags',
    route: '../../components/flags/flags',
    disabled: false,
    type: 'components',
  },
  fullscreenModal: {
    title: 'FullscreenModal',
    route: '../../components/fullscreen-modal/fullscreen-modal',
    disabled: false,
    type: 'components',
  },
  inlineEdit: {
    title: 'InlineEdit',
    route: '../../components/inline-edit/inline-edit',
    disabled: false,
    type: 'components',
  },
  inlineInput: {
    title: 'InlineInput',
    route: '../../components/inline-input/inline-input',
    disabled: false,
    type: 'components',
  },
  input: {
    title: 'Input',
    route: '../../components/input/input',
    disabled: false,
    type: 'components',
  },
  inputMask: {
    title: 'InputMask [deprecated]',
    route: '../../components/input-mask/input-mask',
    disabled: false,
    type: 'components',
  },
  inputNumber: {
    title: 'InputNumber',
    route: '../../components/input-number/input-number',
    disabled: false,
    type: 'components',
  },
  inputPhone: {
    title: 'InputPhone',
    route: '../../components/input-phone/input-phone',
    disabled: false,
    type: 'components',
  },
  inputTags: {
    title: 'InputTags',
    route: '../../components/input-tags/input-tags',
    disabled: false,
    type: 'components',
  },
  link: {
    title: 'Link',
    route: '../../components/link/link',
    disabled: false,
    type: 'components',
  },
  modal: {
    title: 'Modal',
    route: '../../components/modal/modal',
    disabled: false,
    type: 'components',
  },
  notice: {
    title: 'Notice',
    route: '../../components/notice/notice',
    disabled: false,
    type: 'components',
  },
  noticeBubble: {
    title: 'NoticeBubble',
    route: '../../components/notice-bubble/notice-bubble',
    disabled: false,
    type: 'components',
  },
  pagination: {
    title: 'Pagination',
    route: '../../components/pagination/pagination',
    disabled: false,
    type: 'components',
  },
  pills: {
    title: 'Pills',
    route: '../../components/pills/pills',
    disabled: false,
    type: 'components',
  },
  productHead: {
    title: 'ProductHead',
    route: '../../components/product-head/product-head',
    disabled: false,
    type: 'components',
  },
  progressBar: {
    title: 'ProgressBar',
    route: '../../components/progress-bar/progress-bar',
    disabled: false,
    type: 'components',
  },
  radio: {
    title: 'Radio',
    route: '../../components/radio/radio',
    disabled: false,
    type: 'components',
  },
  radioCards: {
    title: 'RadioCards',
    route: '../../components/radio-cards/radio-cards',
    disabled: false,
    type: 'components',
  },
  scrollArea: {
    title: 'ScrollArea',
    route: '../../components/scroll-area/scroll-area',
    disabled: false,
    type: 'components',
  },
  select: {
    title: 'Select',
    route: '../../components/select/select',
    disabled: false,
    type: 'components',
  },
  sidePanel: {
    title: 'SidePanel',
    route: '../../components/side-panel/side-panel',
    disabled: false,
    type: 'components',
  },
  skeleton: {
    title: 'Skeleton',
    route: '../../components/skeleton/skeleton',
    disabled: false,
    type: 'components',
  },
  slider: {
    title: 'Slider',
    route: '../../components/slider/slider',
    disabled: false,
    type: 'components',
  },
  spin: {
    title: 'Spin',
    route: '../../components/spin/spin',
    disabled: false,
    type: 'components',
  },
  spinContainer: {
    title: 'SpinContainer',
    route: '../../components/spin-container/spin-container',
    disabled: false,
    type: 'components',
  },
  switch: {
    title: 'Switch',
    route: '../../components/switch/switch',
    disabled: false,
    type: 'components',
  },
  tabLine: {
    title: 'TabLine',
    route: '../../components/tab-line/tab-line',
    disabled: false,
    type: 'components',
  },
  tabPanel: {
    title: 'TabPanel',
    route: '../../components/tab-panel/tab-panel',
    disabled: false,
    type: 'components',
  },
  tag: {
    title: 'Tag',
    route: '../../components/tag/tag',
    disabled: false,
    type: 'components',
  },
  textarea: {
    title: 'Textarea',
    route: '../../components/textarea/textarea',
    disabled: false,
    type: 'components',
  },
  timePicker: {
    title: 'TimePicker',
    route: '../../components/time-picker/time-picker',
    disabled: false,
    type: 'components',
  },
  tooltip: {
    title: 'Tooltip',
    route: '../../components/tooltip/tooltip',
    disabled: false,
    type: 'components',
  },
  widgetEmpty: {
    title: 'WidgetEmpty',
    route: '../../components/widget-empty/widget-empty',
    disabled: false,
    type: 'components',
  },
  wizard: {
    title: 'Wizard',
    route: '../../components/wizard/wizard',
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
