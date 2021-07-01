import React, { ComponentProps } from 'react';
import { FormProps, FieldProps } from 'react-final-form';

import { ReturnEl, CProps } from '@semcore/core';
import Button, { IButtonProps } from '@semcore/button';
import SpinContainer from '@semcore/spin-container';
import Tooltip from '@semcore/tooltip';
import { INoticeSmartProps, NoticeSmart } from '@semcore/notice';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface IFeedbackForm extends FormProps {
  /* The event is called when the form is submitted */
  onSubmit: (values: any, form: any, callback?: (errors?: {}) => void) => {} | Promise<{}> | void;
  /**
   * The property is in charge of the spinner showing
   * */
  loading?: boolean;
}

declare const FeedbackForm: (<T>(props: CProps<IFeedbackForm> & T) => ReturnEl) & {
  Item: <T>(props: FieldProps & T) => ReturnEl;
  Success: <T>(props: CProps<ComponentProps<typeof Box>> & T) => ReturnEl;
  Submit: <T>(props: ComponentProps<typeof Button> & T) => ReturnEl;
  Cancel: <T>(props: ComponentProps<typeof Button> & T) => ReturnEl;
  Notice: <T>(props: ComponentProps<typeof NoticeSmart> & T) => ReturnEl;
};

export default FeedbackForm;
