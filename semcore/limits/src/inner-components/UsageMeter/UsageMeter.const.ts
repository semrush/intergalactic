import type { NSLimitsUsageMeter } from './UsageMeter.type';

export const Min = 0;
export const Max = 100;
export const Theme: { [key in NSLimitsUsageMeter.Theme]: NSLimitsUsageMeter.Theme } = {
  default: 'default',
  invert: 'invert',
};
export const State: { [key in NSLimitsUsageMeter.State]: NSLimitsUsageMeter.State } = {
  normal: 'normal',
  warning: 'warning',
};
