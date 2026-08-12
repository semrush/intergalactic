import { Box, InvalidStateBox } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root, lastInteraction } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import InputNumber from '@semcore/input-number';
import Spin from '@semcore/spin';
import React from 'react';

import type { NSInlineInput } from './InlineInput.type';
import style from './style/inline-input.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

const pointInsideOfRect = ({
  x,
  y,
  rect,
}: {
  x: number;
  y: number;
  rect: { x: number; y: number; width: number; height: number };
}) => {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
};

class InlineInputBase extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInlineInput.Component>,
  typeof InlineInputBase.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSInlineInput.DefaultProps
> {
  static displayName = 'InlineInput';

  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    state: 'normal',
    onBlurBehavior: 'confirm',
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  static style = style;

  rootRef = React.createRef<HTMLElement>();
  inputRef = React.createRef<HTMLInputElement>();
  initValue = '';
  lastMouseDownPosition: { x: number; y: number } | null = null;
  lastHandledKeyboardEvent = -1;

  handleDocumentMouseDown = (event: { clientX: number; clientY: number }) => {
    this.lastMouseDownPosition = { x: event.clientX, y: event.clientY };
    this.lastHandledKeyboardEvent = -1;
  };

  handleDocumentKeyDown = () => {
    this.lastMouseDownPosition = null;
  };

  componentDidMount() {
    this.updateInert();

    if (!this.asProps.onBlurBehavior) return;
    document.body.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.body.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentDidUpdate(prevProps: typeof this.asProps): void {
    if (prevProps.disabled !== this.asProps.disabled) {
      this.updateInert();
    }
  }

  componentWillUnmount() {
    if (!this.asProps.onBlurBehavior) return;
    document.body.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.body.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  getAddonProps() {
    return {
      onMouseDown: this.handleMouseDownAddon,
    };
  }

  getConfirmControlProps() {
    const { loading, getI18nText } = this.asProps;
    return {
      inputRef: this.inputRef,
      loading,
      onConfirm: this.handleConfirm,
      onCancel: this.handleCancel,
      getI18nText,
    };
  }

  getCancelControlProps() {
    const { loading, disabled, getI18nText } = this.asProps;
    return {
      value: this.initValue,
      // because double disabled(root disabled and addon disabled)
      disabled: loading && !disabled,
      onCancel: this.handleCancel,
      getI18nText,
    };
  }

  getValueProps() {
    const { state } = this.asProps;
    return {
      ref: this.inputRef,
      state,
      onKeyDown: this.handleKeyDown,
    };
  }

  increment = (event: React.SyntheticEvent | WheelEvent) => {
    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.min || '0';
    this.inputRef.current?.stepUp?.(event as any);
  };

  decrement = (event: React.SyntheticEvent | WheelEvent) => {
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.max || '0';
    this.inputRef.current?.stepDown?.(event as any);
  };

  getNumberValueProps() {
    const numberFormatter = new Intl.NumberFormat(this.asProps.locale, { style: 'decimal' });

    return {
      numberFormatter,
      inputRef: this.inputRef,
      increment: this.increment,
      decrement: this.decrement,
    };
  }

  getNumberControlsProps() {
    const { getI18nText } = this.asProps;
    return {
      increment: this.increment,
      decrement: this.decrement,
      getI18nText,
    };
  }

  handleMouseDownAddon = (event: React.MouseEvent) => {
    event.preventDefault();
    this.inputRef.current?.focus();
  };

  handleConfirm = (
    text: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.asProps.onConfirm?.(text, event);
  };

  handleCancel = (
    prevText: string,
    event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    this.asProps.onCancel?.(prevText, event);
  };

  handleBlur = (event: React.FocusEvent) => {
    const { onConfirm, onCancel, onBlurBehavior } = this.asProps;
    if (!onBlurBehavior) return;
    if (Date.now() - this.lastHandledKeyboardEvent < 250) return;
    if (hasParent(event.relatedTarget, this.rootRef.current!)) return;

    if (lastInteraction.isKeyboard()) {
      if (lastInteraction.isTab) {
        onCancel?.(this.initValue, event);
      }
      return;
    }

    if (this.lastMouseDownPosition && this.rootRef.current) {
      const { x, y } = this.lastMouseDownPosition;
      const rect = this.rootRef.current.getBoundingClientRect();

      if (pointInsideOfRect({ x, y, rect })) {
        return;
      }
    }

    if (onBlurBehavior === 'confirm') onConfirm?.(this.inputRef.current?.value ?? '', event);
    if (onBlurBehavior === 'cancel') onCancel?.(this.initValue, event);
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { onConfirm, onCancel } = this.asProps;
    if (event.key === 'Enter') {
      onConfirm?.(this.inputRef.current?.value ?? '', event);
      this.lastHandledKeyboardEvent = Date.now();
    }
    if (event.key === 'Escape') {
      onCancel?.(this.initValue, event);
      this.lastHandledKeyboardEvent = Date.now();
    }
  };

  private updateInert() {
    const { disabled } = this.asProps;

    if (!this.rootRef.current) return;

    if (disabled) {
      this.rootRef.current.setAttribute('inert', '');
    } else {
      this.rootRef.current.removeAttribute('inert');
    }
  }

  render() {
    const SInlineInput = Root;
    const SUnderline = 'div';
    const SInvalidPattern = InvalidStateBox;
    const { Children, styles, state } = this.asProps;

    return sstyled(styles)(
      <SInlineInput render={Box} ref={this.rootRef} onBlur={this.handleBlur}>
        <SUnderline>
          {state === 'invalid' && <SInvalidPattern />}
          <Children />
        </SUnderline>
      </SInlineInput>,
    );
  }
}

class Value extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.Value.Component, typeof InlineInputBase, 'Value'>,
  [],
  NSInlineInput.Value.Handlers
> {
  static defaultProps: NSInlineInput.Value.DefaultProps = {
    defaultValue: '',
  };

  uncontrolledProps() {
    return {
      value: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
    };
  }

  render() {
    const SValue = Root;

    return sstyled(this.asProps.styles)(<SValue render={Box} tag='input' type='text' />);
  }
}

function Addon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.Addon.Component, typeof InlineInputBase, 'Addon'>,
) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />);
}

function ConfirmControl(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.ConfirmControl.Component, typeof InlineInputBase, 'ConfirmControl'>,
) {
  const SAddon = Root;
  const { Children, children: hasChildren, inputRef, onCancel } = props;
  const title = props.title ?? props.getI18nText('confirm');

  const handleConfirm = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onConfirm?.(inputRef?.current?.value ?? '', event);
    },
    [props.onConfirm, inputRef?.current],
  );

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        handleConfirm(event);
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCancel?.(inputRef?.current?.value ?? '', event);
      }
    },
    [handleConfirm],
  );

  if (props.loading) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <Spin size='xs' />}</SAddon>,
    );
  }

  const sstyles = sstyled(props.styles);
  const sConfirmIconStyles = sstyles.cn('SConfirmIcon', {});

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren
        ? (
            <Children />
          )
        : (
            <ButtonLink
              addonLeft={props.icon ?? CheckM}
              use='secondary'
              onClick={handleConfirm}
              className={sConfirmIconStyles.className}
              style={sConfirmIconStyles.style}
              aria-label={title}
            />
          )}
    </SAddon>,
  );
}

function CancelControl(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.CancelControl.Component, typeof InlineInputBase, 'CancelControl'>,
) {
  const SAddon = Root;
  const { Children, children: hasChildren } = props;
  const title = props.title ?? props.getI18nText('discard');

  const handleCancel = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onCancel?.(props.value ?? '', event);
    },
    [props.onCancel, props.value],
  );

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        handleCancel(event);
      }
    },
    [handleCancel],
  );

  if (props.disabled) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <CloseM />}</SAddon>,
    );
  }

  const sstyles = sstyled(props.styles);
  const sCancelIconStyles = sstyles.cn('SCancelIcon', {});

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren
        ? (
            <Children />
          )
        : (
            <ButtonLink
              use='secondary'
              addonLeft={props.icon ?? CloseM}
              onClick={handleCancel}
              className={sCancelIconStyles.className}
              style={sCancelIconStyles.style}
              aria-label={title}
            />
          )}
    </SAddon>,
  );
}

function NumberValue(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.NumberValue.Component, typeof InlineInputBase, 'NumberValue'>,
) {
  const SValue = Root;

  return sstyled(props.styles)(<SValue render={InputNumber.Value} />);
};

function NumberControls(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInlineInput.NumberControls.Component, typeof InlineInputBase, 'NumberControls'>,
) {
  const SControls = Root;

  return sstyled(props.styles)(
    <SControls render={InputNumber.Controls} tag={InlineInput.Addon} />,
  );
}

/**
 * InlineInput
 *
 * {@link https://developer.semrush.com/intergalactic/components/inline-input/inline-input-api/|API} | {@link https://developer.semrush.com/intergalactic/components/inline-input/inline-input-code/|Examples}
 */
const InlineInput = createComponent<
  NSInlineInput.Component,
  typeof InlineInputBase
>(InlineInputBase, {
  Addon,
  Value,
  ConfirmControl,
  CancelControl,
  NumberValue,
  NumberControls,
});

export default InlineInput;
