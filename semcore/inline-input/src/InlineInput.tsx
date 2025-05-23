import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box, InvalidStateBox } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/core/lib/utils/enhances/autoFocusEnhance';
import { ITooltipProps } from '@semcore/tooltip';
import style from './style/inline-input.shadow.css';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';
import { ButtonLink } from '@semcore/button';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import InputNumber, { InputNumberValueProps } from '@semcore/input-number';
import { IRootComponentHandlers } from '@semcore/core';
import { hasParent } from '@semcore/core/lib/utils/hasParent';

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
    };
  }

  increment = (event: React.SyntheticEvent | WheelEvent) => {
    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.min || '0';
    this.inputRef.current?.stepUp?.(event as any);
    this.inputHandlersRef.current?.value(this.inputRef.current?.value, event);
  };

  decrement = (event: React.SyntheticEvent | WheelEvent) => {
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.max || '0';
    this.inputRef.current?.stepDown?.(event as any);
    this.inputHandlersRef.current?.value(this.inputRef.current?.value, event);
  };
  getNumberValueProps() {
    const numberFormatter = new Intl.NumberFormat(this.asProps.locale, { style: 'decimal' });

    return {
      numberFormatter,
      inputRef: this.inputRef,
      inputHandlerRefs: this.inputHandlersRef,
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
      if (event.key === 'Enter' || event.key === ' ') {
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
        <ButtonLink
          addonLeft={(props.icon as any) ?? CheckM}
          use={'secondary'}
          onClick={handleConfirm}
          className={sConfirmIconStyles.className}
          style={sConfirmIconStyles.style}
          aria-label={title}
        />
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
      if (event.key === 'Enter' || event.key === ' ') {
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
      {hasChildren ? (
        <Children />
      ) : (
        <ButtonLink
          use={'secondary'}
          addonLeft={(props.icon as any) ?? CloseM}
          onClick={handleCancel}
          className={sCancelIconStyles.className}
          style={sCancelIconStyles.style}
          aria-label={title}
        />
      )}
    </SAddon>,
  ) as React.ReactElement;
};

const NumberValue: React.FC<NumberValueAsProps> = (props) => {
  const SValue = Root;

  return sstyled(props.styles)(<SValue render={InputNumber.Value} />) as React.ReactElement;
};

function NumberControls(props: NumberControlsAsProps) {
  const SControls = Root;

  return sstyled(props.styles)(
    <SControls render={InputNumber.Controls} tag={InlineInput.Addon} />,
  ) as React.ReactElement;
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
