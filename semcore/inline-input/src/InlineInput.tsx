import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/utils/lib/enhances/autoFocusEnhance';
import Tooltip, { ITooltipProps } from '@semcore/tooltip';
import style from './style/inline-input.shadow.css';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import Input from '@semcore/input';
import {
  IncrementIcon,
  DecrementIcon,
  parseValueWithMinMax,
  InputNumberValueProps,
} from '@semcore/input-number';
import { IRootComponentHandlers } from '@semcore/core';
import InvalidPattern from '@semcore/utils/lib/components/invalid-state-pattern/InvalidStatePattern';

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
  $tooltipsProps?: ITooltipProps;
  loading?: boolean;
  disabled?: boolean;
  onCancel?: OnCancel;
  value?: string;
  icon?: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};
type ConfirmControlAsProps = ControlAsProps & {
  onConfirm?: OnConfirm;
};
type CancelControlAsProps = ControlAsProps & {
  onCancel?: OnCancel;
};
type NumberValueAsProps = InputNumberValueProps & {
  inputHandlerRefs?: React.RefObject<IRootComponentHandlers>;
  increment?: (event: WheelEvent) => void;
  decrement?: (event: WheelEvent) => void;
};
type NumberControlsAsProps = ControlAsProps & {
  increment?: (event: React.SyntheticEvent) => void;
  decrement?: (event: React.SyntheticEvent) => void;
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

class InlineInputBase extends Component<RootAsProps> {
  static displayName = 'InlineInput';

  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    state: 'normal',
    onBlurBehavior: 'confirm',
    i18n: localizedMessages,
    locale: 'en',
  };
  static style = style;

  state = {
    focused: false,
  };

  rootRef = React.createRef<HTMLElement>();
  inputRef = React.createRef<HTMLInputElement>();
  inputHandlersRef = React.createRef<IRootComponentHandlers>();
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
    if (!this.asProps.onBlurBehavior) return;
    document.body.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.body.addEventListener('keydown', this.handleDocumentKeyDown);
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
      value: this.inputRef.current?.value,
      loading,
      onConfirm: this.handleConfirm,
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
      onFocus: this.bindHandlerValueFocused(true),
      onBlur: this.bindHandlerValueFocused(false),
    };
  }

  increment = (event: React.SyntheticEvent | WheelEvent) => {
    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.min || '0';
    this.inputRef.current?.stepUp?.();
    this.inputHandlersRef.current?.value(this.inputRef.current?.value, event);
  };

  decrement = (event: React.SyntheticEvent | WheelEvent) => {
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.max || '0';
    this.inputRef.current?.stepDown?.();
    this.inputHandlersRef.current?.value(this.inputRef.current?.value, event);
  };
  getNumberValueProps() {
    return {
      ref: this.inputRef,
      inputHandlerRefs: this.inputHandlersRef,
      increment: this.increment,
      decrement: this.decrement,
      onFocus: this.bindHandlerValueFocused(true),
      onBlur: this.bindHandlerValueFocused(false),
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

  bindHandlerValueFocused = (focused: boolean) => () => {
    this.setState({ focused });
  };

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

  render() {
    const SInlineInput = Root;
    const SUnderline = 'div';
    const SInvalidPattern = InvalidPattern;
    const { Children, styles, getI18nText, state } = this.asProps;
    const { focused } = this.state;

    return sstyled(styles)(
      <SInlineInput
        render={Box}
        ref={this.rootRef}
        focused={focused}
        onBlur={this.handleBlur}
        aria-label={getI18nText('keyboardHint')}
      >
        <SUnderline>
          {state === 'invalid' && <SInvalidPattern />}
          <Children />
        </SUnderline>
      </SInlineInput>,
    );
  }
}

class Value extends Component<RootAsProps> {
  static defaultProps = {
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];
  static hoistProps = ['disabled'];

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

const Addon: React.FC<AddonAsProps> = (props) => {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />) as React.ReactElement;
};

const ConfirmControl: React.FC<ConfirmControlAsProps> = (props) => {
  const SAddon = Root;
  const { Children, children: hasChildren } = props;
  const title = props.title ?? props.getI18nText('confirm');

  const handleConfirm = React.useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      props.onConfirm?.(props.value ?? '', event);
    },
    [props.onConfirm, props.value],
  );

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleConfirm(event);
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
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={(props.icon as any) ?? CheckM}
            aria-hidden='true'
            role='button'
            onClick={handleConfirm}
            className={sConfirmIconStyles.className}
            style={sConfirmIconStyles.style}
          />
          <Tooltip.Popper p={3}>{title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};
const CancelControl: React.FC<CancelControlAsProps> = (props) => {
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
      if (event.key === 'Enter' || event.key === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        handleCancel(event);
      }
    },
    [handleCancel],
  );

  if (props.disabled) {
    return sstyled(props.styles)(
      <SAddon render={Box}>{hasChildren ? <Children /> : <CloseM disabled />}</SAddon>,
    ) as React.ReactElement;
  }

  const sstyles = sstyled(props.styles);
  const sCancelIconStyles = sstyles.cn('SCancelIcon', {});

  return sstyled(props.styles)(
    <SAddon render={Box} onKeyDown={handleKeydown}>
      {hasChildren ? (
        <Children />
      ) : (
        <Tooltip {...props.$tooltipsProps}>
          <Tooltip.Trigger
            tag={(props.icon as any) ?? CloseM}
            aria-hidden='true'
            role='button'
            onClick={handleCancel}
            className={sCancelIconStyles.className}
            style={sCancelIconStyles.style}
          />
          <Tooltip.Popper p={3}>{title}</Tooltip.Popper>
        </Tooltip>
      )}
    </SAddon>,
  ) as React.ReactElement;
};

class NumberValue extends Component<NumberValueAsProps> {
  static defaultProps = {
    defaultValue: '',
    step: 1,
  };

  inputRef = React.createRef<HTMLInputElement>();

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  round(value: number, step: number): number {
    const countDecimals = Math.floor(step) === step ? 0 : step.toString().split('.')[1].length || 0;
    return countDecimals === 0 ? value : Number.parseFloat(value.toPrecision(countDecimals));
  }

  handleValidation = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { value, min, max, step = 1 } = this.asProps;
    const roundCoefficient = step < 1 ? step.toString().split('.')[1].length : 1;
    if (Number.isNaN(event.currentTarget.valueAsNumber)) {
      event.currentTarget.value = '';
      this.handlers.value('', event);
    } else if (value !== undefined) {
      let numberValue = parseValueWithMinMax(Number.parseFloat(value), min, max);
      const rounded = this.round(numberValue % step, step);
      if (rounded !== 0) {
        if (rounded >= step / 2) {
          numberValue += step - rounded;
        } else if (Math.abs(rounded) < step) {
          numberValue -= rounded;
        }
      }
      const numberValueRounded = Number(numberValue.toFixed(roundCoefficient));
      this.handlers.value(String(numberValueRounded), event);
    }
  };

  // https://stackoverflow.com/questions/57358640/cancel-wheel-event-with-e-preventdefault-in-react-event-bubbling
  componentDidMount() {
    this.inputRef.current?.addEventListener('wheel', this.handleWheel);
  }
  componentWillUnmount() {
    this.inputRef.current?.removeEventListener('wheel', this.handleWheel);
  }

  handleWheel = (event: WheelEvent) => {
    if (event.target !== this.inputRef.current) return;
    if (document.activeElement !== this.inputRef.current) return;
    event.preventDefault();
    if (event.deltaY < 0 && this.asProps.increment) {
      this.asProps.increment(event);
    } else if (event.deltaY > 0 && this.asProps.decrement) {
      this.asProps.decrement(event);
    }
  };

  render() {
    const SValue = Root;
    const SValueHidden = 'div';
    const { styles, inputHandlerRefs, value, min, max } = this.asProps;

    if (inputHandlerRefs) {
      // @ts-ignore
      inputHandlerRefs.current = this.handlers;
    }

    return sstyled(styles)(
      <>
        <SValue
          render={Input.Value}
          type='number'
          autoComplete='off'
          onBlur={this.handleValidation}
          onInvalid={this.handleValidation}
          ref={this.inputRef}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
        {/* the next hidden div is necessary for the screen reader to report the value
        in the input, because after validation the value can change to the `min` or `max`
        if entered less than `min` or more than `max` */}
        <SValueHidden aria-live='polite' aria-atomic={true}>
          {value}
        </SValueHidden>
      </>,
    );
  }
}

function NumberControls(props: NumberControlsAsProps) {
  const { Children, increment, decrement, styles, getI18nText } = props;
  const SControls = Root;
  const SUp = 'button';
  const SDown = 'button';

  return sstyled(styles)(
    <SControls render={InlineInput.Addon} aria-hidden='true'>
      <SUp onClick={increment} tabIndex={-1} type='button' aria-label={getI18nText('increment')}>
        <IncrementIcon />
      </SUp>
      <SDown onClick={decrement} tabIndex={-1} type='button' aria-label={getI18nText('decrement')}>
        <DecrementIcon />
      </SDown>
      <Children />
    </SControls>,
  );
}

/** `createComponent` currently exposes unrelated junk instead of typings, that the reason of to any cast  */
const InlineInput = createComponent(InlineInputBase, {
  Addon,
  Value,
  ConfirmControl,
  CancelControl,
  NumberValue,
  NumberControls,
}) as any;

export default InlineInput;
