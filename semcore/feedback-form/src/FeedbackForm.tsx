import { Box } from '@semcore/base-components';
import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { NoticeSmart } from '@semcore/notice';
import SpinContainer from '@semcore/spin-container';
import createFocusDecorator from 'final-form-focus';
import React from 'react';
import { Field, Form } from 'react-final-form';

import { FeedbackItem } from './component/feedback-item/FeedbackItem';
import { SubmitButton } from './component/submit-button/SubmitButton';
import type { NSFeedbackForm } from './FeedbackForm.type';
import style from './style/feedback-form.shadow.css';

class FeedbackForm extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSFeedbackForm.Component>,
  [],
  {},
  {},
  {},
  NSFeedbackForm.DefaultProps
> {
  static displayName = 'FeedbackForm';
  static style = style;
  static FinalForm = {
    Field,
    Form,
  };

  static defaultProps = {
    onSubmit: () => {},
  };

  static validate = {
    description: (error: string) => (value = '') => {
      const words = value.split(/\s+/);
      const symbols = words.join(' ');
      if (symbols.length < 10 || words.length < 3) {
        return error;
      }
    },
    email: (error: string) => (value = '') => {
      if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
        return error;
      }
    },
  };

  focusDecorator = createFocusDecorator();

  getItemProps() {
    const { validateOnBlur } = this.asProps;

    return {
      validateOnBlur,
    };
  }

  render() {
    const SFeedbackForm = Box;
    const { Children, styles, forwardRef, loading, background, theme, ...other } = this.asProps;

    return (
      <Form decorators={[this.focusDecorator]} {...other}>
        {(api) =>
          sstyled(styles)(
            <SpinContainer
              background={background}
              theme={theme}
              size='xl'
              loading={loading === undefined ? api.submitting : loading}
            >
              <SFeedbackForm
                tag='form'
                noValidate
                method='POST'
                ref={forwardRef}
                {...other}
                onSubmit={api.handleSubmit}
              >
                {typeof Children.origin === 'function' ? Children.origin(api) : <Children />}
              </SFeedbackForm>
            </SpinContainer>,
          )}
      </Form>
    );
  }
}

function Success(props: Intergalactic.InternalTypings.InferComponentProps<NSFeedbackForm.Success.Component>) {
  const { Children, styles } = props;
  const SSuccess = Root;
  const SEmail = 'div';

  return sstyled(styles)(
    <SSuccess render={Box} tabIndex={-1}>
      <SEmail aria-hidden={true} />
      <span>
        <Children />
      </span>
    </SSuccess>,
  );
}
// because it is used without a wrapper
Success.style = style;

function Cancel(props: Intergalactic.InternalTypings.InferComponentProps<NSFeedbackForm.Cancel.Component>) {
  const { styles } = props;
  const SCancel = Root;
  return sstyled(styles)(<SCancel render={Button} type='reset' use='secondary' theme='muted' />);
}

function Notice(props: Intergalactic.InternalTypings.InferComponentProps<NSFeedbackForm.Notice.Component>) {
  const { styles, theme = 'muted' } = props;
  const SNotice = Root;
  return sstyled(styles)(<SNotice render={NoticeSmart} use:theme={theme} />);
}

/**
 * FeedbackForm
 *
 * {@link https://developer.semrush.com/intergalactic/components/feedback-form/feedback-form-api/|API} | {@link https://developer.semrush.com/intergalactic/components/feedback-form/feedback-form-code/|Examples}
 */
export default createComponent<
  NSFeedbackForm.Component,
  typeof FeedbackForm
>(FeedbackForm, {
  Item: FeedbackItem,
  Success,
  Submit: SubmitButton,
  Cancel,
  Notice,
});
