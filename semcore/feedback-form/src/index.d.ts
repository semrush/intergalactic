import { FormProps, FieldProps, FieldInputProps, FieldMetaState } from 'react-final-form';

import { Intergalactic } from '@semcore/core';
import Button from '@semcore/button';
import { NoticeSmart } from '@semcore/notice';
import { Box } from '@semcore/flex-box';

import { default as FeedbackRating } from './component/feedback-rating/FeedbackRating';

/** @deprecated */
export type IFeedbackForm = FeedbackFormProps;
export type FeedbackFormProps = FormProps & {
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
};

declare const FeedbackForm: Intergalactic.Component<'form', FeedbackFormProps> & {
  Item: Intergalactic.Component<
    'div',
    FieldProps<any, any>,
    { input: FieldInputProps<any> & { state: 'normal' | 'invalid' }; meta: FieldMetaState<any> }
  >;
  Success: typeof Box;
  Submit: typeof Button;
  Cancel: typeof Button;
  Notice: typeof NoticeSmart;
};

export default FeedbackForm;

export { FeedbackRating };
