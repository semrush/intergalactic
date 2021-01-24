import React, { ComponentProps, HTMLAttributes } from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';

import createComponent, { Component, IFunctionProps, Merge, styled } from '@semcore/core';
import Button, { IButtonProps } from '@semcore/button';
import SpinContainer from '@semcore/spin-container';
import Tooltip from '@semcore/tooltip';
import { INoticeSmartProps, NoticeSmart } from '@semcore/notice';
import { Box, IBoxProps } from '@semcore/flex-box';
import MailSentL from '@semcore/icon/lib/MailSent/l';

import style from './style/feedback-form.shadow.css';

export interface IFeedbackForm extends FormProps {
  /* The event is called when the form is submitted */
  onSubmit: (values: any, form: any, callback?: (errors?: {}) => void) => {} | Promise<{}> | void;
  /**
   * The property is in charge of the spinner showing
   * */
  loading?: boolean;
}

class FeedbackForm extends Component<IFeedbackForm> {
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
    description: (error) => (value = '') => {
      const words = value.split(/\s+/);
      const symbols = words.join(' ');
      if (symbols.length < 10 || words.length < 3) {
        return error;
      }
    },
    email: (error) => (value = '') => {
      if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
        return error;
      }
    },
  };

  focusDecorator = createFocusDecorator();

  render() {
    const SFeedbackForm = Box;
    const { Children, styles, loading, ...other } = this.asProps;

    return (
      <Form decorators={[this.focusDecorator]} {...other}>
        {(api) =>
          styled(styles)(
            <SpinContainer size="xl" loading={loading === undefined ? api.submitting : loading}>
              <SFeedbackForm
                render={Box}
                tag="form"
                noValidate
                method="POST"
                {...other}
                onSubmit={api.handleSubmit}
              >
                {typeof Children.origin === 'function' ? Children.origin(api) : <Children />}
              </SFeedbackForm>
            </SpinContainer>,
          )
        }
      </Form>
    );
  }
}

function Item(props) {
  const { Root, Children, tag, ...other } = props;

  return (
    <Field {...other}>
      {({ input, meta, ...other }) => {
        const invalid = meta.invalid && meta.touched;
        const inputProps = {
          ...input,
          state: invalid ? 'invalid' : 'normal',
        };
        return (
          <Tooltip
            title={meta.error}
            visible={invalid && meta.active}
            inline={false}
            theme="warning"
            placement="left"
          >
            {tag && <Root render={tag} {...inputProps} />}
            {typeof Children.origin === 'function' &&
              Children.origin({
                input: inputProps,
                meta,
                ...other,
              })}
          </Tooltip>
        );
      }}
    </Field>
  );
}

function Success(props: IFunctionProps<IBoxProps>) {
  const { Root: SSuccess, Children, styles } = props;
  const SEmail = MailSentL;

  return styled(styles)(
    <SSuccess render={Box}>
      <SEmail />
      <span>
        <Children />
      </span>
    </SSuccess>,
  );
}
// because it is used without a wrapper
Success.style = style;

function Submit(props: IFunctionProps<IButtonProps>) {
  const { Root: SSubmit, styles } = props;
  return styled(styles)(<SSubmit render={Button} type="submit" use="primary" theme="success" />);
}

function Cancel(props: IFunctionProps<IButtonProps>) {
  const { Root: SCancel, styles } = props;
  return styled(styles)(<SCancel render={Button} type="reset" use="secondary" theme="muted" />);
}

function Notice(props: IFunctionProps<INoticeSmartProps>) {
  const { Root: SNotice, styles, theme = 'custom' } = props;
  return styled(styles)(<SNotice render={NoticeSmart} theme={theme} />);
}

export default createComponent<
  Merge<IFeedbackForm, HTMLAttributes<HTMLFormElement>>,
  {
    Item: HTMLAttributes<HTMLElement>;
    Success: ComponentProps<typeof Box>;
    Submit: ComponentProps<typeof Button>;
    Cancel: ComponentProps<typeof Button>;
    Notice: ComponentProps<typeof NoticeSmart>;
  }
>(FeedbackForm, {
  Item,
  Success,
  Submit,
  Cancel,
  Notice,
});
