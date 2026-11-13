import type { Meta, StoryObj } from '@storybook/react-vite';

import LimitsDemoReportNoticeExample, { defaultProps as defaultLimitsDemoReportNoticeExampleProps } from './examples/demo-report-notice';
import LimitsNoticeExample, { defaultProps as defaultLimitsNoticeExampleProps } from './examples/notice';
import TrustLineExample, { defaultProps as defaultTrustLineExampleProps } from './examples/trust-line';
import UsageMeterExample, { defaultProps as defaultUsageMeterExampleProps } from './examples/usage-meter';

const meta: Meta = {
  title: 'Components/Limits/Tests',
};

export default meta;

const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'vi', 'zh', 'pl', 'ru'];

export const UsageMeter: StoryObj<typeof defaultUsageMeterExampleProps> = {
  render: UsageMeterExample,
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'number' },
    },
    feature: {
      control: { type: 'text' },
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'invert'],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'warning'],
    },
  },
  args: defaultUsageMeterExampleProps,
};

export const TrustLine: StoryObj<typeof defaultTrustLineExampleProps> = {
  render: TrustLineExample,
  argTypes: {
    description: {
      control: { type: 'text' },
    },
    locale: {
      control: { type: 'select' },
      options: locales,
    },
  },
  args: defaultTrustLineExampleProps,
};

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
