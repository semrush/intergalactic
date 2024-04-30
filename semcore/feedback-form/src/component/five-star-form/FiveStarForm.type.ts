import React from 'react';
import { FeedbackFormProps } from '../../index';
import { FieldProps } from 'react-final-form';

import { Intergalactic } from '@semcore/core';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import Checkbox from '@semcore/checkbox';

export type FormConfigItem = {
  key: string;
  label: React.ReactNode;
  type: 'input' | 'checkbox' | 'textarea';
  description?: React.ReactNode;
  validate?: (value: any) => Error | string | undefined;
};

export type FiveStarFormProps = Intergalactic.InternalTypings.EfficientOmit<
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

  /** header of modal with form */
  Header: React.ReactNode;
  /** text for submit button of form */
  submitText?: string;
  /** config for form fields */
  formConfig: FormConfigItem[];

  initialValues: Record<string, any> & { rating: number };
};

declare const FiveStarFormType: Intergalactic.Component<'form', FiveStarFormProps> & {
  Item: Intergalactic.Component<'div', FieldProps<any, any>>;
  Submit: typeof Button;
  Checkbox: typeof Checkbox;
  Header: typeof Text;
};

export { FiveStarFormType };
