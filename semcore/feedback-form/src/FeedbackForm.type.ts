import type { Box } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { NoticeSmart } from '@semcore/notice';
import type { FormProps } from 'react-final-form';

import type { NSFeedbackItem } from './component/feedback-item/FeedbackItem.type';
import type { NSSubmitButton } from './component/submit-button/SubmitButton.type';

declare namespace NSFeedbackForm {
  type Props = Intergalactic.InternalTypings.RemoveIndexSignature<FormProps> & {
    /** The event is called when the form is submitted */
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
  type DefaultProps = {
    onSubmit: () => void;
  };

  namespace Item {
    type Component = NSFeedbackItem.Component;
  }

  namespace Success {
    type Component = typeof Box;
  }

  namespace Submit {
    type Component = NSSubmitButton.Component;
  }

  namespace Cancel {
    type Component = NSButton.Component;
  }

  namespace Notice {
    type Component = typeof NoticeSmart;
  }

  type Component = Intergalactic.Component<'form', Props> & {
    Item: Item.Component;
    Success: Success.Component;
    Submit: Submit.Component;
    Cancel: Cancel.Component;
    Notice: Notice.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type FeedbackFormProps = NSFeedbackForm.Props;

export type { NSFeedbackForm };
