import type { NSCheckbox } from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';
import type { IllustrationProps } from '@semcore/illustration';
import type Notice from '@semcore/notice';
import type React from 'react';
import type { FieldProps } from 'react-final-form';

import type { FeedbackFormProps } from '../../index';
import type { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

export type FormConfigItem = {
  key: string;
  label: React.ReactNode;
  type: 'input' | 'checkbox' | 'textarea' | 'email';
  description?: React.ReactNode;
  validate?: (value: any) => Error | string | undefined;
};

export type FeedbackRatingProps = Intergalactic.InternalTypings.EfficientOmit<
  FeedbackFormProps,
  'initialValues' | 'loading'
> & {
  /** Status of form */
  status: 'default' | 'success' | 'error' | 'loading';

  /** Flag for show/hide notification */
  notificationVisible: boolean;
  /** Notification close callback */
  onNotificationClose: () => void;
  /** Text in notification panel */
  notificationText: string;
  /** Title in notification panel */
  notificationTitle?: string;
  /** Optional link in notification panel */
  learnMoreLink?: string;
  /** Rating value */
  rating: number;
  /** Visible modal form flag */
  visible: boolean;
  /** Visibility changes callback */
  onVisibleChange: (visible: boolean, rating: number) => void;

  /** Width for modal with form */
  modalWidth?: number | string;

  /** Header of modal with form */
  header: React.ReactNode;
  /** Text for submit button of form */
  submitText?: string;
  /** Config for form fields */
  formConfig: FormConfigItem[];

  /** Initial form values including rating */
  initialValues: Record<string, any> & { rating: number };
  /** Email address shown in error messages */
  errorFeedbackEmail: string;
  /** Specifies the locale for i18n support */
  locale?: string;
  /** Illustration element */
  Illustration?: Intergalactic.Component<'svg', IllustrationProps>;
  /** Notice component */
  Notice?: typeof Notice;
};

export type FeedbackRatingItemProps = FieldProps<any, any> & {
  /**
   * Allows to override which passed props will be passed to the Tooltip component.
   */
  tooltipProps?: string[];
};

export type FeedbackRatingCheckboxProps = Omit<NSCheckbox.Props, 'label'> & {
  focused: boolean;
  label: React.ReactNode;
};

export type FeedbackRatingDefaultProps = {
  onSubmit: () => void;
  i18n: typeof localizedMessages;
  locale: 'en';
  Illustration: Intergalactic.Component<'svg', IllustrationProps>;
  Notice: typeof Notice;
};
