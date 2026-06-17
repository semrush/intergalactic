import type { Intergalactic } from '@semcore/core';
import type { TooltipProps } from '@semcore/tooltip';
import type { FieldProps, FieldInputProps, FieldMetaState } from 'react-final-form';

import type { NSFeedbackForm } from '../../FeedbackForm.type';

declare namespace NSFeedbackFormFeedbackItem {
  type Props = Intergalactic.InternalTypings.RemoveIndexSignature<FieldProps<any, any>> & TooltipProps & {
    /**
     * Allows to override which passed props will be passed to the Tooltip component.
     */
    tooltipProps?: string[];
    validateOnBlur?: NSFeedbackForm.Props['validateOnBlur'];
  };
  type Ctx = {
    input: FieldInputProps<any> & { state: 'normal' | 'invalid' };
    meta: FieldMetaState<any>;
  };

  type Component = Intergalactic.Component<'div', Props, Ctx>;
}

export type { NSFeedbackFormFeedbackItem };
