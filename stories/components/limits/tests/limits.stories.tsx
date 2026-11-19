import type { Meta, StoryObj } from '@storybook/react-vite';

import LimitsDemoReportNoticeExample, { defaultProps as defaultLimitsDemoReportNoticeExampleProps } from './examples/demo-report-notice';
import LimitsNoticeExample, { defaultProps as defaultLimitsNoticeExampleProps } from './examples/notice';
import LimitsOverlayExample, { defaultProps as defaultLimitsOverlayExampleProps } from './examples/overlay';

const meta: Meta = {
  title: 'Components/Limits/Tests',
};

export default meta;

const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'vi', 'zh', 'pl', 'ru'];

export const LimitsNotice: StoryObj<typeof defaultLimitsNoticeExampleProps> = {
  render: LimitsNoticeExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'accent'],
    },
    closable: {
      control: { type: 'boolean' },
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
  args: defaultLimitsNoticeExampleProps,
};

export const LimitsDemoReportNotice: StoryObj<typeof defaultLimitsDemoReportNoticeExampleProps> = {
  render: LimitsDemoReportNoticeExample,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    backLabel: {
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
    showBeforeActions: {
      control: { type: 'boolean' },
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
