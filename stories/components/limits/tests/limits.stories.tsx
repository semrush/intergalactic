import type { Meta, StoryObj } from '@storybook/react-vite';

import LimitsDemoReportNoticeExample, { defaultProps as defaultLimitsDemoReportNoticeExampleProps } from './examples/demo-report-notice';
import LimitsDropdownNoticeExample, { defaultProps as defaultLimitsDropdownNoticeExampleProps } from './examples/dropdown-notice';
import LimitsNoticeExample, { defaultProps as defaultLimitsNoticeExampleProps } from './examples/notice';
import LimitsPopperContentExample, { defaultProps as defaultLimitsPopperContentExampleProps } from './examples/popper-content';

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

export const LimitsPopperContent: StoryObj<typeof defaultLimitsPopperContentExampleProps> = {
  render: LimitsPopperContentExample,
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
  args: defaultLimitsPopperContentExampleProps,
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
