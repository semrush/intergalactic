import { ComponentProps } from 'react';
import { FormProps, FieldProps } from 'react-final-form';

import { ReturnEl, CProps } from '@semcore/core';
import Button from '@semcore/button';
import { NoticeSmart } from '@semcore/notice';
import { Box } from '@semcore/flex-box';

export interface IFeedbackForm extends FormProps {
  /* The event is called when the form is submitted */
  onSubmit: (values: any, form: any, callback?: (errors?: {}) => void) => {} | Promise<{}> | void;
  /**
   * The property is in charge of the spinner showing
   * */
  loading?: boolean;
  /**
   * Color of container spinner; you can use your own color
   */
  background?: string;
  /** Spinner theme. There are several default themes or you can use your own color
   * @default dark
   **/
  theme?: 'dark' | 'invert' | string;
}

declare const FeedbackForm: (<T>(props: CProps<IFeedbackForm> & T) => ReturnEl) & {
  Item: <T>(props: FieldProps<any, any> & T) => ReturnEl;
  Success: <T>(props: CProps<ComponentProps<typeof Box>> & T) => ReturnEl;
  Submit: <T>(props: ComponentProps<typeof Button> & T) => ReturnEl;
  Cancel: <T>(props: ComponentProps<typeof Button> & T) => ReturnEl;
  Notice: <T>(props: ComponentProps<typeof NoticeSmart> & T) => ReturnEl;
};

export default FeedbackForm;
