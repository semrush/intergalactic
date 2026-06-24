import { Box, InvalidStateBox } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import { createComponent, Component, sstyled, Root, lastInteraction } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import InputNumber, { type InputNumberValueProps } from '@semcore/input-number';
import Spin from '@semcore/spin';
import type { TooltipProps } from '@semcore/tooltip';
import React from 'react';

import type { InlineInputComponent } from './index.type';
import style from './style/inline-input.shadow.css';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

type OnConfirm = (
  value: string,
  event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
) => void;
type OnCancel = (
  prevValue: string,
  event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
) => void;
type RootAsProps = {
  state?: 'normal' | 'valid' | 'invalid';
  loading?: boolean;
  disabled?: boolean;
  onConfirm?: OnConfirm;
  onCancel?: OnCancel;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlurBehavior?: 'cancel' | 'confirm';
  styles?: React.CSSProperties;
  Children: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
  locale?: string;
};

type AddonAsProps = {
  styles?: React.CSSProperties;
  Children: React.FC;
};

type ControlAsProps = {
  Children: React.FC;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  title?: string;
  $tooltipsProps?: TooltipProps;
  loading?: boolean;
  disabled?: boolean;
  onCancel?: OnCancel;
  value?: string;
  icon?: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};
type ConfirmControlAsProps = ControlAsProps & {
  onConfirm?: OnConfirm;
  onCancel?: OnCancel;
  inputRef?: React.RefObject<HTMLInputElement>;
};
type CancelControlAsProps = ControlAsProps & {
  onCancel?: OnCancel;
};
type NumberValueAsProps = InputNumberValueProps & {
  increment?: (event: WheelEvent) => void;
  decrement?: (event: WheelEvent) => void;
};
type NumberControlsAsProps = ControlAsProps & {
  increment?: (event: React.SyntheticEvent) => void;
  decrement?: (event: React.SyntheticEvent) => void;
};
type DefaultProps = {
  state: 'normal';
  onBlurBehavior: 'confirm';
  i18n: LocalizedMessages;
  locale: 'en';
};

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
  RootAsProps,
  [],
  {},
  WithI18nEnhanceProps,
  {},
  DefaultProps
> {
  static displayName = 'InlineInput';

  static enhance = [i18nEnhance(localizedMessages)];
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

  componentDidUpdate(prevProps: Readonly<RootAsProps>): void {
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
    if (!onBlurBehavior || lastInteraction.isKeyboard()) return;
    if (Date.now() - this.lastHandledKeyboardEvent < 250) return;
    if (hasParent(event.relatedTarget, this.rootRef.current!)) return;

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

class Value extends Component<RootAsProps, [], { value: any }> {
  static defaultProps = {
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

function Addon(props: AddonAsProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
}

function ConfirmControl(props: ConfirmControlAsProps) {
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
    ) as React.ReactElement;
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
              addonLeft={(props.icon as any) ?? CheckM}
              use='secondary'
              onClick={handleConfirm}
              className={sConfirmIconStyles.className}
              style={sConfirmIconStyles.style}
              aria-label={title}
            />
          )}
    </SAddon>,
  ) as React.ReactElement;
}

function CancelControl(props: CancelControlAsProps) {
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
    ) as React.ReactElement;
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
              addonLeft={(props.icon as any) ?? CloseM}
              onClick={handleCancel}
              className={sCancelIconStyles.className}
              style={sCancelIconStyles.style}
              aria-label={title}
            />
          )}
    </SAddon>,
  ) as React.ReactElement;
}

function NumberValue(props: NumberValueAsProps) {
  const SValue = Root;

  return sstyled(props.styles)(<SValue render={InputNumber.Value} />) as React.ReactElement;
};

function NumberControls(props: NumberControlsAsProps) {
  const SControls = Root;

  return sstyled(props.styles)(
    <SControls render={InputNumber.Controls} tag={InlineInput.Addon} />,
  ) as React.ReactElement;
}

/**
 * InlineInput
 *
 * {@link https://developer.semrush.com/intergalactic/components/inline-input/inline-input-api/|API} | {@link https://developer.semrush.com/intergalactic/components/inline-input/inline-input-code/|Examples}
 */
const InlineInput = createComponent<
  InlineInputComponent,
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
