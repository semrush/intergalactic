import type { Meta, StoryObj } from '@storybook/react-vite';

import LimitsDemoReportNoticeExample, { defaultProps as defaultLimitsDemoReportNoticeExampleProps } from './examples/demo-report-notice';
import LimitsNoticeExample, { defaultProps as defaultLimitsNoticeExampleProps } from './examples/notice';
import LimitsOverlayExample, { defaultProps as defaultLimitsOverlayExampleProps } from './examples/overlay';

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

export const LimitsOverlay: StoryObj<typeof defaultLimitsOverlayExampleProps> = {
  render: LimitsOverlayExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    headingLevel: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
    },
    locale: {
      control: { type: 'select' },
      options: locales,
    },
    content: {
      control: { type: 'select' },
      options: ['tiers', 'features', 'none'],
    },
    promoLabel: {
      control: { type: 'text' },
      if: { arg: 'content', eq: 'tiers' },
    },
    showTrustLine: {
      control: { type: 'boolean' },
    },
    trustLineDescription: {
      control: { type: 'text' },
      if: { arg: 'showTrustLine' },
    },
    showUsage: {
      control: { type: 'boolean' },
    },
    usageValue: {
      control: { type: 'number' },
      if: { arg: 'showUsage' },
    },
    usageFeature: {
      control: { type: 'text' },
      if: { arg: 'showUsage' },
    },
    usageState: {
      control: { type: 'select' },
      options: ['normal', 'warning'],
      if: { arg: 'showUsage' },
    },
  },
  args: defaultLimitsOverlayExampleProps,
};
