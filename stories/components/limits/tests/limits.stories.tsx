import type { Meta, StoryObj } from '@storybook/react-vite';

import LimitsDemoReportNoticeExample, { defaultProps as defaultLimitsDemoReportNoticeExampleProps } from './examples/demo-report-notice';
import LimitsDropdownContentExample, { defaultProps as defaultLimitsDropdownContentExampleProps } from './examples/dropdown-content';
import LimitsDropdownNoticeExample, { defaultProps as defaultLimitsDropdownNoticeExampleProps } from './examples/dropdown-notice';
import LimitsNoticeExample, { defaultProps as defaultLimitsNoticeExampleProps } from './examples/notice';

const meta: Meta = {
  title: 'Components/Limits/Tests',
};

export default meta;

const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'vi', 'zh', 'pl', 'ru'];

const sharedArgTypes = {
  title: {
    control: { type: 'text' },
    table: { category: 'Notice props' },
  },
  text: {
    control: { type: 'text' },
    table: { category: 'Notice props' },
  },
  locale: {
    control: { type: 'select' },
    options: locales,
    table: { category: 'Notice props' },
  },
  secondaryCta: {
    control: { type: 'select' },
    options: ['none', 'link', 'button'],
    table: { category: 'Actions' },
  },
  showTrustLine: {
    control: { type: 'boolean' },
    table: { category: 'Actions' },
  },
  trustLineDescription: {
    control: { type: 'text' },
    if: { arg: 'showTrustLine' },
    table: { category: 'Actions' },
  },
  w: {
    control: { type: 'number' },
    description: 'Container width',
    table: { category: 'Layout' },
  },
} as const;

export const LimitsNotice: StoryObj<typeof defaultLimitsNoticeExampleProps> = {
  render: LimitsNoticeExample,
  argTypes: {
    ...sharedArgTypes,
    theme: {
      control: { type: 'select' },
      options: ['default', 'accent'],
      table: { category: 'Notice props' },
    },
    closable: {
      control: { type: 'boolean' },
      table: { category: 'Notice props' },
    },
    showUsage: {
      control: { type: 'boolean' },
      table: { category: 'Usage meter' },
    },
    usageMin: {
      control: { type: 'number' },
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageMax: {
      control: { type: 'number' },
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageValue: {
      control: { type: 'number' },
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageFeature: {
      control: { type: 'text' },
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageState: {
      control: { type: 'select' },
      options: ['normal', 'warning'],
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageTheme: {
      control: { type: 'select' },
      options: ['default', 'invert'],
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
    usageLocale: {
      control: { type: 'select' },
      options: locales,
      if: { arg: 'showUsage' },
      table: { category: 'Usage meter' },
    },
  },
  args: defaultLimitsNoticeExampleProps,
};

export const LimitsDemoReportNotice: StoryObj<typeof defaultLimitsDemoReportNoticeExampleProps> = {
  render: LimitsDemoReportNoticeExample,
  argTypes: {
    ...sharedArgTypes,
    backLabel: {
      control: { type: 'text' },
      table: { category: 'Notice props' },
    },
    showBeforeActions: {
      control: { type: 'boolean' },
      table: { category: 'Actions' },
    },
  },
  args: defaultLimitsDemoReportNoticeExampleProps,
};

export const LimitsDropdownContent: StoryObj<typeof defaultLimitsDropdownContentExampleProps> = {
  render: LimitsDropdownContentExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    locale: {
      control: { type: 'select' },
      options: locales,
    },
    showSecondaryCta: {
      control: { type: 'boolean' },
    },
    showTrustLine: {
      control: { type: 'boolean' },
    },
    trustLineDescription: {
      control: { type: 'text' },
      if: { arg: 'showTrustLine' },
    },
    usageVariant: {
      control: { type: 'select' },
      options: ['none', 'header', 'list'],
    },
    usageFeature: {
      control: { type: 'text' },
      if: { arg: 'usageVariant', eq: 'header' },
    },
    usageState: {
      control: { type: 'select' },
      options: ['normal', 'warning'],
      if: { arg: 'usageVariant', eq: 'header' },
    },
  },
  args: defaultLimitsDropdownContentExampleProps,
};

export const LimitsDropdownNotice: StoryObj<typeof defaultLimitsDropdownNoticeExampleProps> = {
  render: LimitsDropdownNoticeExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    locale: {
      control: { type: 'select' },
      options: locales,
    },
    showSecondaryCta: {
      control: { type: 'boolean' },
    },
    showTrustLine: {
      control: { type: 'boolean' },
    },
    trustLineDescription: {
      control: { type: 'text' },
      if: { arg: 'showTrustLine' },
    },
  },
  args: defaultLimitsDropdownNoticeExampleProps,
};
