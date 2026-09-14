import type { Intergalactic } from '@semcore/core';
import type { IllustrationProps } from '@semcore/illustration';
import type { NSNotice } from '@semcore/notice';
import type { Text } from '@semcore/typography';
import type React from 'react';

import type { NSCheckboxButton } from './component/checkbox-button/CheckboxButton.type';
import type { NSFeedbackItem } from './component/feedback-item/FeedbackItem.type';
import type { NSSubmitButton } from './component/submit-button/SubmitButton.type';
import type { NSFeedbackForm } from './FeedbackForm.type';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';
declare namespace NSFeedbackRating {
  type Props = Intergalactic.InternalTypings.EfficientOmit<NSFeedbackForm.Props, 'initialValues' | 'loading'> & {
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
    formConfig: NSFeedbackRating.FormConfigItem[];

    /** Initial form values including rating */
    initialValues: Record<string, any> & { rating: number };
    /** Email address shown in error messages */
    errorFeedbackEmail: string;
    /** Specifies the locale for i18n support */
    locale?: string;
    /** Illustration element */
    Illustration?: Intergalactic.Component<'svg', IllustrationProps>;
    /** Notice component */
    Notice?: NSNotice.Component;
  };
  type DefaultProps = {
    onSubmit: () => void;
    i18n: LocalizedMessages;
    locale: 'en';
    Illustration: Props['Illustration'];
    Notice: Props['Notice'];
  };
  type State = {
    error: boolean;
  };
  type FormConfigItem = {
    key: string;
    label: React.ReactNode;
    type: 'input' | 'checkbox' | 'textarea' | 'email';
    description?: React.ReactNode;
    validate?: (value: any) => Error | string | undefined;
  };

  namespace Item {
    type Component = NSFeedbackItem.Component;
  }

  namespace Submit {
    type Component = NSSubmitButton.Component;
  }

  namespace Checkbox {
    type Component = NSCheckboxButton.Component;
  }

  namespace Header {
    type Component = typeof Text;
  }

  type Validate = {
    description: (error: string | Error) => (value?: string) => string | Error | undefined;
    email: (error: string | Error) => (value?: string) => string | Error | undefined;
  };

  type Component = Intergalactic.Component<'form', Props> & {
    validate: Validate;
    Item: Item.Component;
    Submit: Submit.Component;
    Checkbox: Checkbox.Component;
    Header: Header.Component;
  };
}

export type { NSFeedbackRating };
