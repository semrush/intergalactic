import React from 'react';
import { Field, Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Button from '@semcore/button';
import SpinContainer from '@semcore/spin-container';
import Tooltip from '@semcore/tooltip';
import { NoticeSmart } from '@semcore/notice';
import { Box } from '@semcore/flex-box';

import style from './style/feedback-form.shadow.css';

class FeedbackForm extends Component {
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
    const { Children, styles, loading, forwardRef, ...other } = this.asProps;

    return (
      <Form decorators={[this.focusDecorator]} {...other}>
        {(api) =>
          sstyled(styles)(
            <SpinContainer size="xl" loading={loading === undefined ? api.submitting : loading}>
              <SFeedbackForm
                tag="form"
                noValidate
                method="POST"
                ref={forwardRef}
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
  const { Children, tag } = props;

  return (
    <Root render={Field}>
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
            flip={{
              fallbackPlacements: ['right', 'bottom'],
            }}
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
    </Root>
  );
}

function Success(props) {
  const { Children, styles } = props;
  const SSuccess = Root;
  const SEmail = 'div';

  return sstyled(styles)(
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

function Submit(props) {
  const { styles } = props;
  const SSubmit = Root;
  return sstyled(styles)(<SSubmit render={Button} type="submit" use="primary" theme="success" />);
}

function Cancel(props) {
  const { styles } = props;
  const SCancel = Root;
  return sstyled(styles)(<SCancel render={Button} type="reset" use="secondary" theme="muted" />);
}

function Notice(props) {
  const { styles } = props;
  const SNotice = Root;
  return sstyled(styles)(<SNotice render={NoticeSmart} />);
}

Notice.defaultProps = {
  theme: 'gray94',
  use: 'secondary',
};

export default createComponent(FeedbackForm, {
  Item,
  Success,
  Submit,
  Cancel,
  Notice,
});
