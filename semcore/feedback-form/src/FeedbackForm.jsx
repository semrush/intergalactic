import React from 'react';
import { Field, Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Button from '@semcore/button';
import SpinContainer from '@semcore/spin-container';
import Tooltip from '@semcore/tooltip';
import { NoticeSmart } from '@semcore/notice';
import { Box } from '@semcore/flex-box';
import pick from '@semcore/utils/lib/pick';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

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
    description:
      (error) =>
      (value = '') => {
        const words = value.split(/\s+/);
        const symbols = words.join(' ');
        if (symbols.length < 10 || words.length < 3) {
          return error;
        }
      },
    email:
      (error) =>
      (value = '') => {
        if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
          return error;
        }
      },
  };

  focusDecorator = createFocusDecorator();

  render() {
    const SFeedbackForm = Box;
    const { Children, styles, forwardRef, loading, background, theme, ...other } = this.asProps;

    return (
      <Form decorators={[this.focusDecorator]} {...other}>
        {(api) =>
          sstyled(styles)(
            <SpinContainer background={background} theme={theme} size="xl" loading={loading === undefined ? api.submitting : loading}>
              <SFeedbackForm
                tag="form"
                noValidate
                method="POST"
                ref={forwardRef}
                {...other}
                onSubmit={api.handleSubmit}
                title="This is feedback"
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

const TooltipProps = [
  'title',
  'theme',
  'strategy',
  'modifiers',
  'placement',
  'interaction',
  'timeout',
  'visible',
  'defaultVisible',
  'onVisibleChange',
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
  'onFirstUpdate',
];

function Item({ Children, tag, uid, ...props }) {
  const tooltipProps = pick(props, TooltipProps);
  const ItemRoot = Root;

  return (
    <Field {...props}>
      {({ input, meta, ...other }) => {
        const invalid = meta.invalid && meta.touched;
        const inputProps = {
          ...input,
          state: invalid ? 'invalid' : 'normal',
          'aria-invalid': invalid ? true : false,
          'aria-errormessage': uid,
        };
        return (
          <Tooltip
            visible={invalid && meta.active}
            theme="warning"
            placement="left"
            flip={{
              fallbackPlacements: ['right', 'bottom'],
            }}
            {...tooltipProps}
          >
            <Tooltip.Trigger inline={false}>
              {tag && <ItemRoot render={tag} {...inputProps} />}
              {typeof Children.origin === 'function' &&
                Children.origin({
                  input: inputProps,
                  meta,
                  ...other,
                })}
            </Tooltip.Trigger>
            <Tooltip.Popper id={uid}>
              {meta.error}
            </Tooltip.Popper>
          </Tooltip>
        );
      }}
    </Field>
  );
}
Item.enhance = [uniqueIDEnhancement()]

function Success(props) {
  const { Children, styles } = props;
  const SSuccess = Root;
  const SEmail = 'div';

  return sstyled(styles)(
    <SSuccess render={Box}>
      <SEmail aria-hidden={true} />
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
  theme: 'gray96',
  use: 'secondary',
};

export default createComponent(FeedbackForm, {
  Item,
  Success,
  Submit,
  Cancel,
  Notice,
});
