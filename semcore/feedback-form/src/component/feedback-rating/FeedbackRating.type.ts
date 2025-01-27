import React from 'react';
import type { FeedbackFormProps } from '../../index';
import type { FieldProps } from 'react-final-form';

import type { Intergalactic } from '@semcore/core';
import type Button from '@semcore/button';
import type { Text } from '@semcore/typography';
import type Checkbox from '@semcore/checkbox';
import type { CheckboxProps } from '@semcore/checkbox';

export type FormConfigItem = {
  key: string;
  label: React.ReactNode;
  type: 'input' | 'checkbox' | 'textarea';
  description?: React.ReactNode;
  validate?: (value: any) => Error | string | undefined;
};

export type FeedbackRatingProps = Intergalactic.InternalTypings.EfficientOmit<
  FeedbackFormProps,
  'initialValues' | 'loading'
> & {
  /** status of form */
  status: 'default' | 'success' | 'error' | 'loading';

  /** flag for show/hide notification */
  notificationVisible: boolean;
  /** */
  onNotificationClose: () => void;
  /** text in notification panel */
  notificationText: string;
  /** optional link in notification panel */
  learnMoreLink?: string;
  /** rating value */
  rating: number;
  /** visible modal form flag */
  visible: boolean;

  onVisibleChange: (visible: boolean, rating: number) => void;

  /** width for modal with form */
  modalWidth?: number | string;

  /** header of modal with form */
  header: React.ReactNode;
  /** text for submit button of form */
  submitText?: string;
  /** config for form fields */
  formConfig: FormConfigItem[];

  initialValues: Record<string, any> & { rating: number };

  errorFeedbackEmail: string;

  locale?: string;
};

export type FeedbackRatingItemProps = FieldProps<any, any> & {
  /**
   * Allows to override which passed props will be passed to the Tooltip component.
   */
  tooltipProps?: string[];
};

export type FeedbackRatingCheckboxProps = Omit<CheckboxProps, 'label'> & {
  focused: boolean;
  label: React.ReactNode;
};

declare const FeedbackRatingType: Intergalactic.Component<'form', FeedbackRatingProps> & {
  Item: Intergalactic.Component<'div', FeedbackRatingItemProps>;
  Submit: typeof Button;
  Checkbox: Intergalactic.Component<typeof Checkbox, FeedbackRatingCheckboxProps>;
  Header: typeof Text;
};

export { FeedbackRatingType };
